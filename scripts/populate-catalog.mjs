#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// CAVE — Populate wine_catalog from Vivino
// Usage:
//   export SUPABASE_SERVICE_KEY="eyJ..."
//   node scripts/populate-catalog.mjs --dry-run     # test sans insérer
//   node scripts/populate-catalog.mjs               # lancer le scraping
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://mgekvgcshvhhqrzmouex.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const DRY_RUN = process.argv.includes('--dry-run');

if (!SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_KEY environment variable');
  console.error('   → Supabase Dashboard → Settings → API → service_role key');
  console.error('   → export SUPABASE_SERVICE_KEY="eyJ..."');
  process.exit(1);
}

// ─── Vivino API ───
const VIVINO_API = 'https://www.vivino.com/api/explore/explore';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'application/json',
};

// Wine type mapping: Vivino ID → our color
const TYPE_MAP = {
  1: 'rouge',
  2: 'blanc',
  3: 'effervescent',
  4: 'rosé',
  7: 'liquoreux',
};

// French regions we care about
const REGION_QUERIES = [
  { name: 'Bordeaux', country: 'fr', region_id: 3 },
  { name: 'Bourgogne', country: 'fr', region_id: 5 },
  { name: 'Champagne', country: 'fr', region_id: 7 },
  { name: 'Rhône', country: 'fr', region_id: 11 },
  { name: 'Loire', country: 'fr', region_id: 9 },
  { name: 'Alsace', country: 'fr', region_id: 1 },
  { name: 'Languedoc-Roussillon', country: 'fr', region_id: 8 },
  { name: 'Provence', country: 'fr', region_id: 10 },
  { name: 'Sud-Ouest', country: 'fr', region_id: 12 },
  { name: 'Beaujolais', country: 'fr', region_id: 2 },
  { name: 'Jura', country: 'fr', region_id: 14 },
  { name: 'Savoie', country: 'fr', region_id: 15 },
  { name: 'Corse', country: 'fr', region_id: 6 },
];

// ─── Helpers ───
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchVivino(typeId, page = 1, regionId = null) {
  const params = new URLSearchParams({
    'country_code': 'fr',
    'country_codes[]': 'fr',
    'currency_code': 'EUR',
    'order_by': 'ratings_count',
    'order': 'desc',
    'page': page,
    'per_page': 25,
    'wine_type_ids[]': typeId,
    'min_rating': 1,
  });
  if (regionId) params.append('region_ids[]', regionId);

  try {
    const resp = await fetch(`${VIVINO_API}?${params}`, { headers: HEADERS });
    if (!resp.ok) {
      console.warn(`  ⚠ Vivino HTTP ${resp.status} on page ${page}`);
      return null;
    }
    const json = await resp.json();
    return json.explore_vintage?.matches || [];
  } catch (e) {
    console.warn(`  ⚠ Fetch error: ${e.message}`);
    return null;
  }
}

function mapVivinoToRow(match) {
  const wine = match.vintage?.wine;
  if (!wine?.name) return null;

  const winery = wine.winery?.name || '';
  const name = winery ? `${winery}` : wine.name;
  const cuvee = wine.name !== winery ? wine.name.replace(winery, '').trim() : '';
  const vintage = match.vintage?.year || null;
  const region = wine.region?.name || '';
  const country = wine.region?.country?.name || 'France';
  const appellation = wine.appellation?.name || '';

  // Color from wine type
  const typeId = wine.type_id || 1;
  const color = TYPE_MAP[typeId] || 'rouge';

  // Grapes
  const cepages = (wine.grapes || []).map(g => g.name).filter(Boolean);

  // Price
  const price = match.price?.amount || null;
  const alcohol = wine.alcohol || null;

  // Taste data
  const taste = wine.taste || {};
  const flavorGroups = (taste.flavor || []).map(f => f.group || f.primary_keywords?.[0]?.name).filter(Boolean);
  const aromas = [...new Set(flavorGroups)];

  // Food pairings
  const pairings = (taste.food || []).map(f => f.name).filter(Boolean);

  // Robe color
  const robeMap = { rouge: '#6B1E2C', blanc: '#D4A030', rosé: '#F8C8D4', effervescent: '#E8D44D', liquoreux: '#CD853F' };

  return {
    name: name.trim(),
    cuvee: cuvee.replace(/^[\s\-–]+|[\s\-–]+$/g, '').trim(),
    region: region || '',
    appellation: appellation || '',
    color,
    robe: robeMap[color] || '#6B1E2C',
    cepages: cepages.length > 0 ? cepages : [],
    typical_alcohol: alcohol ? parseFloat(alcohol) : null,
    typical_price: price ? parseFloat(price) : null,
    peak_from: null,
    peak_to: null,
    aromas: aromas.length > 0 ? aromas : [],
    pairings: pairings.length > 0 ? pairings : [],
    service: {},
    estate: {},
  };
}

async function upsertBatch(rows) {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/wine_catalog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify(rows),
  });
  if (!resp.ok) {
    const text = await resp.text();
    console.warn(`  ⚠ Supabase upsert error: ${resp.status} ${text.slice(0, 200)}`);
    return 0;
  }
  return rows.length;
}

// ─── Main ───
async function main() {
  console.log('');
  console.log('🍷 CAVE — Vivino → wine_catalog');
  console.log(`   Mode: ${DRY_RUN ? '🧪 DRY RUN (aucune insertion)' : '🚀 PRODUCTION (insertion réelle)'}`);
  console.log('');

  // Test Supabase connection
  const testResp = await fetch(`${SUPABASE_URL}/rest/v1/wine_catalog?select=count&limit=1`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Prefer': 'count=exact' },
  });
  const countHeader = testResp.headers.get('content-range');
  const currentCount = countHeader ? parseInt(countHeader.split('/')[1]) : '?';
  console.log(`   📊 Vins actuels dans le catalogue: ${currentCount}`);
  console.log('');

  let totalFetched = 0;
  let totalInserted = 0;
  let totalSkipped = 0;

  const typeIds = [1, 2, 3, 4, 7]; // rouge, blanc, effervescent, rosé, liquoreux

  for (const typeId of typeIds) {
    const typeName = TYPE_MAP[typeId];
    console.log(`━━━ ${typeName.toUpperCase()} ━━━`);

    for (const region of REGION_QUERIES) {
      let page = 1;
      let regionTotal = 0;
      const MAX_PAGES = 20; // 20 pages × 25 = 500 vins par région/type max

      while (page <= MAX_PAGES) {
        const matches = await fetchVivino(typeId, page, region.region_id);
        if (!matches || matches.length === 0) break;

        const rows = matches.map(mapVivinoToRow).filter(Boolean);
        // Deduplicate within batch
        const seen = new Set();
        const unique = rows.filter(r => {
          const key = `${r.name}|${r.cuvee}|${r.region}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        totalFetched += matches.length;
        regionTotal += unique.length;

        if (DRY_RUN) {
          // Show first few samples
          if (page === 1) {
            console.log(`  📍 ${region.name} (${typeName}): ${matches.length} résultats page 1`);
            unique.slice(0, 3).forEach(w =>
              console.log(`     → ${w.name}${w.cuvee ? ' — ' + w.cuvee : ''} | ${w.region} | ${w.appellation} | ${(w.cepages || []).join(',')} | ${w.typical_price || '?'}€`)
            );
          }
        } else {
          if (unique.length > 0) {
            const inserted = await upsertBatch(unique);
            totalInserted += inserted;
          }
          process.stdout.write(`  📍 ${region.name} (${typeName}) p${page}: +${unique.length}  \r`);
        }

        page++;
        // Rate limit: ~1 req/sec to be polite
        await sleep(1200);
      }

      if (!DRY_RUN && regionTotal > 0) {
        console.log(`  📍 ${region.name} (${typeName}): ${regionTotal} vins ajoutés`);
      }
    }
    console.log('');
  }

  // Final count
  if (!DRY_RUN) {
    const finalResp = await fetch(`${SUPABASE_URL}/rest/v1/wine_catalog?select=count&limit=1`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Prefer': 'count=exact' },
    });
    const finalHeader = finalResp.headers.get('content-range');
    const finalCount = finalHeader ? parseInt(finalHeader.split('/')[1]) : '?';

    console.log('═══════════════════════════════════════');
    console.log(`  📊 Avant: ${currentCount} vins`);
    console.log(`  📊 Après: ${finalCount} vins`);
    console.log(`  📊 Nouveaux: ${finalCount - currentCount}`);
    console.log(`  📊 Fetched: ${totalFetched}, Upserted: ${totalInserted}`);
    console.log('═══════════════════════════════════════');
  } else {
    console.log('═══════════════════════════════════════');
    console.log(`  🧪 DRY RUN terminé`);
    console.log(`  📊 ${totalFetched} vins récupérés depuis Vivino`);
    console.log(`  ℹ️  Relance sans --dry-run pour insérer`);
    console.log('═══════════════════════════════════════');
  }
}

main().catch(e => { console.error('💥 Fatal:', e); process.exit(1); });
