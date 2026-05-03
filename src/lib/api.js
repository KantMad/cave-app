import { supabase } from './supabase';

// ═══════════════════════════════════════════════════════════════
// BOTTLES (per-user cellar)
// ═══════════════════════════════════════════════════════════════

export async function fetchBottles(userId) {
  const { data, error } = await supabase
    .from('bottles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function addBottle(userId, bottle) {
  const row = bottleToRow(userId, bottle);
  const { data, error } = await supabase
    .from('bottles')
    .insert(row)
    .select()
    .single();

  if (data) {
    // Log activity
    await supabase.from('activity').insert({
      user_id: userId, action: 'added', bottle_id: data.id,
      metadata: { name: data.name, vintage: data.vintage },
    });
    // Upsert into global catalog (shared with all users)
    await upsertToCatalog(userId, bottle);
  }

  return { data, error };
}

export async function updateBottle(bottleId, bottle) {
  const updates = {
    name: bottle.name,
    cuvee: bottle.cuvee || '',
    vintage: parseInt(bottle.vintage) || null,
    region: bottle.region || '',
    appellation: bottle.appellation || '',
    color: bottle.color || 'rouge',
    robe: bottle.robe || '#6B1E2C',
    cepages: bottle.cepages || [],
    alcohol: parseFloat(bottle.alcohol) || null,
    price: parseFloat(bottle.price) || 0,
    quantity: parseInt(bottle.quantity) || 1,
    score: parseInt(bottle.score) || null,
    peak_from: parseInt(bottle.peakFrom) || null,
    peak_to: parseInt(bottle.peakTo) || null,
    aromas: bottle.aromas || [],
    aroma_wheel: bottle.aromaW || {},
    pairings: bottle.pairings || [],
    service: bottle.service || {},
    estate: bottle.estate || {},
    notes: bottle.notes || '',
    tags: bottle.tags || [],
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from('bottles')
    .update(updates)
    .eq('id', bottleId)
    .select()
    .single();
  return { data, error };
}

export async function deleteBottle(bottleId) {
  const { error } = await supabase
    .from('bottles')
    .delete()
    .eq('id', bottleId);
  return { error };
}

// Helper: convert bottle form data to DB row
function bottleToRow(userId, b) {
  return {
    user_id: userId,
    name: b.name, cuvee: b.cuvee || '', vintage: parseInt(b.vintage) || null,
    region: b.region || '', appellation: b.appellation || '',
    color: b.color || 'rouge', robe: b.robe || '#6B1E2C',
    cepages: b.cepages || [], alcohol: parseFloat(b.alcohol) || null,
    price: parseFloat(b.price) || 0, quantity: parseInt(b.quantity) || 1,
    score: parseInt(b.score) || null,
    peak_from: parseInt(b.peakFrom) || null, peak_to: parseInt(b.peakTo) || null,
    aromas: b.aromas || [], aroma_wheel: b.aromaW || {},
    pairings: b.pairings || [], service: b.service || {},
    estate: b.estate || {}, notes: b.notes || '', tags: b.tags || [],
    location: b.location || '',
  };
}

// ═══════════════════════════════════════════════════════════════
// WINE ENRICHMENT (AI-powered + reference DB)
// ═══════════════════════════════════════════════════════════════

export async function enrichWine(bottle) {
  const res = await fetch('/api/enrich', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: bottle.name,
      cuvee: bottle.cuvee,
      vintage: bottle.vintage,
      region: bottle.region,
      appellation: bottle.appellation,
      color: bottle.color,
    }),
  });
  if (!res.ok) throw new Error('Enrichment failed');
  return res.json();
}

export async function enrichAndUpdate(bottleId, bottle) {
  const enriched = await enrichWine(bottle);

  // Flatten structured aromas to array
  const aromasList = enriched.aromas ?
    (Array.isArray(enriched.aromas) ? enriched.aromas :
    [].concat(enriched.aromas.fruit||[],enriched.aromas.floral||[],enriched.aromas.spicy||[],enriched.aromas.earthy||[],enriched.aromas.wood||[])) : [];

  // Merge estate with extra metadata
  const estate = {
    ...(enriched.estate || {}),
    classification: enriched.classification || '',
    subRegion: enriched.subRegion || '',
    vintages: enriched.vintages || {},
  };

  const updates = {
    estate,
    cepages: (enriched.cepages || []).map(c => ({n:c.n||c.name,p:c.p||c.pct})),
    aromas: aromasList,
    aroma_wheel: enriched.aroma_wheel || enriched.aromaWheel || {},
    pairings: enriched.pairings || [],
    service: enriched.service || {},
    robe: enriched.robe || bottle.robe,
    alcohol: enriched.alcohol || bottle.alcohol,
    peak_from: enriched.peak_from || bottle.peak_from,
    peak_to: enriched.peak_to || bottle.peak_to,
    score: enriched.score_avg || bottle.score,
    notes: bottle.notes || enriched.summary || '',
    tags: [...new Set([...(enriched.tags||[]),...(enriched.labels||[]),...(bottle.tags||[])])],
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase
    .from('bottles')
    .update(updates)
    .eq('id', bottleId)
    .select()
    .single();
  return { data, error, enriched };
}

// Seed reference wines into global catalog
export async function seedReferenceCatalog() {
  const res = await fetch('/api/seed-wines', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Seed failed');
  return res.json();
}


// ═══════════════════════════════════════════════════════════════
// WINE LABEL SCAN — AI Vision (Haiku) + Code-barres
// ═══════════════════════════════════════════════════════════════

// Resize image — keep high quality for AI readability
function resizeImage(file, maxSize = 1280) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          resolve(dataUrl);
        } catch(e) { reject(e); }
      };
      img.onerror = () => reject(new Error('Image decode failed'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

// Scan wine label using AI Vision (Haiku — ~0.2¢ per scan)
export async function scanLabel(file) {
  // 1. Resize to save bandwidth and tokens
  let base64;
  try {
    base64 = await resizeImage(file);
  } catch(e) {
    // Fallback: send raw file
    base64 = await new Promise((ok, ko) => {
      const r = new FileReader();
      r.onload = () => ok(r.result);
      r.onerror = ko;
      r.readAsDataURL(file);
    });
  }

  // 2. Call AI Vision API
  const res = await fetch('/api/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || err.details || `Erreur serveur ${res.status}`);
  }

  return res.json();
}

// Scan barcode via Open Food Facts (free)
export async function scanBarcode(barcode) {
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    const p = data.product;
    const name = p.product_name_fr || p.product_name || '';
    const brands = p.brands || '';
    let color = 'rouge';
    const cats = (p.categories || '').toLowerCase();
    if (cats.includes('blanc') || cats.includes('white')) color = 'blanc';
    else if (cats.includes('rosé') || cats.includes('rose')) color = 'rosé';
    else if (cats.includes('champagne') || cats.includes('mousseux')) color = 'effervescent';
    return {
      name: brands || name, cuvee: brands ? name : '',
      vintage: null, region: '', appellation: '', color,
      alcohol: p.alcohol_100g ? parseFloat(p.alcohol_100g) : null,
      barcode, source: 'openfoodfacts',
    };
  } catch { return null; }
}

// ═══════════════════════════════════════════════════════════════
// WINE CATALOG (global, shared — the heart of the app)
// ═══════════════════════════════════════════════════════════════

function norm(s){return(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();}
// Deep normalization: strip common wine prefixes for matching
function deepNorm(s){return norm(s).replace(/\b(chateau|château|domaine|clos|mas|maison|cave|vignoble|les|des|du|de|la|le|l)\b/gi,'').replace(/[-'']/g,' ').replace(/\s+/g,' ').trim();}

// Levenshtein distance for fuzzy matching
function lev(a,b){
  const m=a.length,n=b.length;if(!m)return n;if(!n)return m;
  const d=Array.from({length:m+1},(_,i)=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++)d[i][0]=i;
  for(let j=0;j<=n;j++)d[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)
    d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:1+Math.min(d[i-1][j],d[i][j-1],d[i-1][j-1]);
  return d[m][n];
}

// Search catalog — basic text search
export async function searchCatalog(query) {
  if (!query || query.length < 2) return [];
  const { data, error } = await supabase
    .rpc('search_wines_fuzzy', { search_query: query, max_results: 8 });
  if (error) {
    // Fallback ilike si la RPC n'existe pas encore
    const { data: fb } = await supabase.from('wine_catalog').select('*')
      .or(`name.ilike.%${query}%,cuvee.ilike.%${query}%,appellation.ilike.%${query}%`)
      .limit(8);
    return (fb || []).map(w => ({ ...w, source: 'catalog' }));
  }
  return (data || []).map(w => ({ ...w, source: 'catalog' }));
}

// Search by barcode (instant, free)
export async function searchByBarcode(barcode) {
  if (!barcode) return null;
  const { data } = await supabase
    .from('wine_catalog')
    .select('*')
    .eq('barcode', barcode)
    .limit(1)
    .single();
  return data ? { ...data, source: 'catalog' } : null;
}

// Fuzzy match from AI scan result — multi-strategy + cross-verification
export async function matchCatalogFromScan(aiResult) {
  if (!aiResult?.name) return [];

  // 1. Try exact barcode match first (instant, 100% accurate)
  if (aiResult.barcode) {
    const barcodeMatch = await searchByBarcode(aiResult.barcode);
    if (barcodeMatch) return [{ ...barcodeMatch, _matchScore: 100, _matchType: 'barcode' }];
  }

  // 2. Multi-strategy search: build multiple query variants
  const searchName = aiResult.name.trim();
  const searchCuvee = (aiResult.cuvee || '').trim();
  const stripped = deepNorm(searchName); // "Château Haut-Brion" → "haut brion"
  
  const queries = new Set([searchName]); // "Château Haut-Brion"
  if (stripped && stripped !== norm(searchName)) queries.add(stripped); // "haut brion"
  if (searchCuvee && searchCuvee.length > 2) {
    queries.add(`${searchName} ${searchCuvee}`); // "Château Haut-Brion Grand Vin"
  }
  // Split name into significant words for partial match
  const words = stripped.split(/\s+/).filter(w => w.length > 3);
  if (words.length >= 2) queries.add(words.join(' ')); // "haut brion"
  // If appellation is specific, try name + appellation
  if (aiResult.appellation && aiResult.appellation.length > 3) {
    queries.add(`${stripped} ${norm(aiResult.appellation)}`);
  }

  // 3. Fire all queries in parallel via search_wines_fuzzy
  const allResults = new Map();
  const queryArray = [...queries].slice(0, 5); // max 5 queries
  
  const results = await Promise.allSettled(
    queryArray.map(q => supabase.rpc('search_wines_fuzzy', { search_query: q, max_results: 10 }))
  );
  
  for (const r of results) {
    if (r.status === 'fulfilled' && !r.value.error && r.value.data) {
      for (const w of r.value.data) {
        const key = w.id || `${w.name}-${w.cuvee}-${w.region}`;
        if (!allResults.has(key)) allResults.set(key, w);
      }
    }
  }

  if (allResults.size === 0) {
    return matchCatalogFallback(aiResult);
  }

  // 4. Score each candidate with multi-criteria matching
  const normName = norm(searchName);
  const dName = deepNorm(searchName);
  const normCuvee = norm(searchCuvee);

  const scored = [...allResults.values()].map(w => {
    const wName = norm(w.name || '');
    const wDeep = deepNorm(w.name || '');
    let score = 30; // base score for being in fuzzy results

    // ── Name matching (max +45) ──
    if (wName === normName) score += 45; // exact match
    else if (wDeep === dName) score += 40; // "Château X" vs "Domaine X" normalized
    else if (wDeep.includes(dName) || dName.includes(wDeep)) score += 30; // contains
    else {
      // Word overlap scoring
      const nameWords = dName.split(/\s+/).filter(x => x.length > 2);
      const wWords = wDeep.split(/\s+/).filter(x => x.length > 2);
      let overlap = 0;
      for (const nw of nameWords) { if (wWords.some(ww => ww.includes(nw) || nw.includes(ww))) overlap++; }
      if (nameWords.length > 0) score += Math.round((overlap / nameWords.length) * 25);
    }

    // ── Cuvée matching (max +20) ──
    if (normCuvee && w.cuvee) {
      const wCuvee = norm(w.cuvee);
      if (wCuvee === normCuvee) score += 20;
      else if (wCuvee.includes(normCuvee) || normCuvee.includes(wCuvee)) score += 12;
    }

    // ── Cross-verification bonuses (max +16) ──
    // Appellation match
    if (aiResult.appellation && w.appellation) {
      if (norm(w.appellation).includes(norm(aiResult.appellation)) || norm(aiResult.appellation).includes(norm(w.appellation))) score += 8;
    }
    // Region match
    if (aiResult.region && w.region && norm(w.region) === norm(aiResult.region)) score += 5;
    // Color match
    if (aiResult.color && w.color && w.color === aiResult.color) score += 3;

    // ── Cross-verification penalties ──
    // Different appellation = probably wrong wine
    if (aiResult.appellation && w.appellation && norm(w.appellation).length > 3 && norm(aiResult.appellation).length > 3) {
      if (!norm(w.appellation).includes(norm(aiResult.appellation)) && !norm(aiResult.appellation).includes(norm(w.appellation))) {
        score -= 10;
      }
    }
    // Different color = definitely wrong
    if (aiResult.color && w.color && aiResult.color !== w.color) score -= 8;

    // Penalty: completely different root name
    const firstWord = dName.split(/\s+/)[0];
    const wFirstWord = wDeep.split(/\s+/)[0];
    if (firstWord && wFirstWord && firstWord.length > 3 && wFirstWord.length > 3) {
      if (!wDeep.includes(firstWord) && !dName.includes(wFirstWord)) score -= 15;
    }

    return { ...w, source: 'catalog', _matchScore: Math.max(0, score), _matchType: 'fuzzy' };
  });

  return scored
    .filter(w => w._matchScore > 25)
    .sort((a, b) => b._matchScore - a._matchScore)
    .slice(0, 5);
}

// Fallback if search_wines_fuzzy RPC is not available
async function matchCatalogFallback(aiResult) {
  const searchName = aiResult.name.trim();
  const { data } = await supabase
    .from('wine_catalog')
    .select('*')
    .or(`name.ilike.%${searchName}%,cuvee.ilike.%${searchName}%`)
    .limit(20);
  if (!data || data.length === 0) return [];
  
  const normName = norm(searchName);
  return data.map(w => {
    const wName = norm(w.name);
    let score = 0;
    if (wName === normName) score = 80;
    else if (wName.includes(normName) || normName.includes(wName)) score = 60;
    else score = 30;
    return { ...w, source: 'catalog', _matchScore: score, _matchType: 'fallback' };
  })
  .filter(w => w._matchScore > 20)
  .sort((a, b) => b._matchScore - a._matchScore)
  .slice(0, 5);
}

// Upsert wine to catalog — enriches the shared database
export async function upsertToCatalog(userId, wine, barcode = null) {
  try {
    const name = wine.name, cuvee = wine.cuvee || '', region = wine.region || '';
    const row = {
      name, cuvee, region,
      appellation: wine.appellation || '',
      color: wine.color || 'rouge',
      robe: wine.robe || '#6B1E2C',
      cepages: wine.cepages || [],
      typical_alcohol: parseFloat(wine.typical_alcohol || wine.alcohol) || null,
      typical_price: parseFloat(wine.typical_price || wine.price) || null,
      peak_from: parseInt(wine.peak_from || wine.peakFrom) || null,
      peak_to: parseInt(wine.peak_to || wine.peakTo) || null,
      aromas: wine.aromas || [],
      pairings: wine.pairings || [],
      service: wine.service || {},
      estate: wine.estate || {},
      added_by: userId,
    };
    if (barcode) row.barcode = barcode;

    // Check if an entry exists with same name+cuvee but empty region
    // If so, update it (add region) instead of creating a duplicate
    if (region) {
      const { data: existing } = await supabase
        .from('wine_catalog')
        .select('id, region')
        .eq('name', name)
        .eq('cuvee', cuvee)
        .limit(1)
        .single();
      if (existing && (!existing.region || existing.region === '')) {
        // Update existing entry with new region + enriched data
        const { id, ...updates } = row;
        await supabase.from('wine_catalog').update(row).eq('id', existing.id);
        return;
      }
    }
    // Normal upsert
    await supabase.from('wine_catalog').upsert(row, {
      onConflict: 'name,cuvee,region',
      ignoreDuplicates: false,
    });
  } catch (e) { console.warn('Catalog upsert failed:', e); }
}

// Increment scan count + link barcode
export async function catalogHit(catalogId, barcode = null) {
  try {
    const updates = {
      scan_count: supabase.rpc ? undefined : 1, // Fallback
      last_scanned_at: new Date().toISOString(),
    };
    if (barcode) updates.barcode = barcode;

    // Use raw SQL for atomic increment
    await supabase.rpc('increment_scan_count', { catalog_id: catalogId }).catch(() => {
      // Fallback if RPC not set up
      supabase.from('wine_catalog').update({ last_scanned_at: new Date().toISOString() }).eq('id', catalogId);
    });

    if (barcode) {
      await supabase.from('wine_catalog').update({ barcode }).eq('id', catalogId);
    }
  } catch (e) { /* silent */ }
}

// Check if catalog is seeded, seed if empty
export async function ensureCatalogSeeded() {
  try {
    const { count } = await supabase.from('wine_catalog').select('id', { count: 'exact', head: true });
    if (count === 0 || count === null) {
      // Catalog is empty — seed it
      const res = await fetch('/api/seed-wines', { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        console.log('Catalog auto-seeded:', result.message);
        return result;
      }
    }
    return { already_seeded: true, count };
  } catch (e) { console.warn('Catalog seed check failed:', e); return null; }
}

// Combined search: catalog first, then OFF
export async function searchWines(query) {
  if (!query || query.length < 2) return [];
  const { data, error } = await supabase
    .rpc('search_wines_fuzzy', { search_query: query, max_results: 12 });
  if (error) {
    const { data: fb } = await supabase.from('wine_catalog').select('*')
      .or(`name.ilike.%${query}%,cuvee.ilike.%${query}%,appellation.ilike.%${query}%`)
      .limit(12);
    return (fb || []).map(w => ({ ...w, source: 'catalog' }));
  }
  return (data || []).map(w => ({ ...w, source: 'catalog' }));
}

// ═══════════════════════════════════════════════════════════════
// OPEN FOOD FACTS (external wine search)
// ═══════════════════════════════════════════════════════════════

const OFF_SEARCH = 'https://world.openfoodfacts.org/cgi/search.pl';

export async function searchOFF(query) {
  if (!query || query.length < 3) return [];
  try {
    const params = new URLSearchParams({
      search_terms: query,
      search_simple: 1, action: 'process', json: 1, page_size: 5,
      tagtype_0: 'categories', tag_contains_0: 'contains', tag_0: 'wines',
      fields: 'product_name,brands,categories_tags,labels_tags,origins_tags,code,image_front_small_url',
    });
    const resp = await fetch(`${OFF_SEARCH}?${params}`, {
      headers: { 'User-Agent': 'CaveApp/1.0' },
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.products || [])
      .filter(p => p.product_name)
      .map(p => ({
        name: p.brands ? `${p.brands}` : p.product_name,
        cuvee: p.brands ? p.product_name : '',
        region: guessRegion(p.origins_tags || [], p.categories_tags || []),
        color: guessColor(p.categories_tags || []),
        barcode: p.code,
        imageUrl: p.image_front_small_url,
        source: 'openfoodfacts',
      }));
  } catch { return []; }
}

function guessRegion(origins, categories) {
  const all = [...origins, ...categories].join(' ').toLowerCase();
  const map = {
    'bordeaux':'Bordeaux','bourgogne':'Bourgogne','champagne':'Champagne',
    'rhone':'Rhône','rhône':'Rhône','loire':'Loire','alsace':'Alsace',
    'languedoc':'Languedoc','provence':'Provence','jura':'Jura',
    'savoie':'Savoie','sud-ouest':'Sud-Ouest','corse':'Corse','beaujolais':'Beaujolais',
  };
  for (const [k, v] of Object.entries(map)) {
    if (all.includes(k)) return v;
  }
  return '';
}

function guessColor(categories) {
  const c = categories.join(' ').toLowerCase();
  if (c.includes('rose') || c.includes('rosé')) return 'rosé';
  if (c.includes('blanc') || c.includes('white')) return 'blanc';
  if (c.includes('champagne') || c.includes('sparkling') || c.includes('effervescent')) return 'effervescent';
  if (c.includes('liquoreux') || c.includes('sweet') || c.includes('moelleux')) return 'liquoreux';
  return 'rouge';
}

// ═══════════════════════════════════════════════════════════════
// ESTATES (domaines viticoles)
// ═══════════════════════════════════════════════════════════════

export async function fetchEstate(name) {
  if (!name) return null;
  try {
    const res = await fetch(`/api/estate?name=${encodeURIComponent(name)}`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) { return null; }
}

export async function searchEstates(query) {
  if (!query || query.length < 2) return [];
  try {
    const res = await fetch(`/api/estate?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) { return []; }
}

// upsertCatalog is now upsertToCatalog (defined in catalog section above)

// ═══════════════════════════════════════════════════════════════
// SEED DEMO DATA
// ═══════════════════════════════════════════════════════════════

export async function seedDemoData(userId) {
  const demoBottles = [
    { name:'Château Margaux', cuvee:'Grand Vin', vintage:2015, region:'Bordeaux', appellation:'Margaux 1er Grand Cru Classé', color:'rouge', robe:'#5A0E1A', cepages:[{n:'Cabernet Sauvignon',p:87},{n:'Merlot',p:8},{n:'Petit Verdot',p:3},{n:'Cabernet Franc',p:2}], alcohol:13.5, price:780, quantity:2, score:98, peak_from:2030, peak_to:2055, aromas:['cassis','mûre','violette','cèdre','graphite','vanille','tabac','truffe'], aroma_wheel:{Fruit:85,Floral:60,Épicé:70,Terreux:65,Boisé:75,Minéral:55}, pairings:['Côte de bœuf','Agneau de Pauillac','Saint-nectaire affiné'], service:{temp:'17-18°',carafe:'Carafage 1h',verre:'Bordeaux XL'}, estate:{founded:1572,owner:'Famille Mentzelopoulos',surface:'262 ha',terroir:'Graves günziennes profondes',desc:'Premier Grand Cru Classé en 1855, Château Margaux incarne la quintessence du Médoc.'}, notes:'Grand millésime, structure magistrale, tanins soyeux.' },
    { name:'Dom Pérignon', cuvee:'Vintage', vintage:2012, region:'Champagne', appellation:'Champagne', color:'effervescent', robe:'#D4B896', cepages:[{n:'Chardonnay',p:52},{n:'Pinot Noir',p:48}], alcohol:12.5, price:210, quantity:3, score:97, peak_from:2022, peak_to:2040, aromas:['brioche','agrumes','amande','craie','noisette'], pairings:['Homard','Caviar','Risotto au parmesan'], service:{temp:'8-10°',carafe:'Non',verre:'Flûte évasée'}, notes:'Bulle d\'une finesse rare.' },
    { name:'E. Guigal La Mouline', cuvee:'', vintage:2016, region:'Rhône', appellation:'Côte-Rôtie', color:'rouge', robe:'#5A1020', cepages:[{n:'Syrah',p:89},{n:'Viognier',p:11}], alcohol:14.5, price:420, quantity:1, score:99, peak_from:2028, peak_to:2050, aromas:['olive noire','violette','lard fumé','poivre','cacao'], pairings:['Lièvre à la royale','Pigeon aux truffes'], service:{temp:'17-18°',carafe:'2h minimum',verre:'Bourgogne XL'}, notes:'Monumental. Syrah dans sa plus pure expression.' },
  ];

  const { data, error } = await supabase
    .from('bottles')
    .insert(demoBottles.map(b => ({ user_id: userId, ...b })))
    .select();

  return { data, error };
}

// ═══════════════════════════════════════════════════════════════
// TASTINGS (dégustation history)
// ═══════════════════════════════════════════════════════════════

export async function fetchTastings(userId) {
  const { data, error } = await supabase
    .from('tastings')
    .select('*')
    .eq('user_id', userId)
    .order('tasted_at', { ascending: false })
    .limit(100);
  return { data: data || [], error };
}

export async function addTasting(userId, tasting) {
  const { data, error } = await supabase
    .from('tastings')
    .insert({ user_id: userId, ...tasting })
    .select()
    .single();
  return { data, error };
}

// Open a bottle: create tasting + decrement quantity
export async function openBottle(userId, bottle) {
  // Decrement quantity
  const newQty = Math.max(0, (bottle.quantity || 1) - 1);
  await supabase.from('bottles').update({ quantity: newQty }).eq('id', bottle.id);
  
  // Create tasting entry
  const tasting = {
    user_id: userId,
    bottle_id: bottle.id,
    name: bottle.name,
    cuvee: bottle.cuvee || '',
    vintage: bottle.vintage,
    region: bottle.region,
    appellation: bottle.appellation,
    color: bottle.color,
  };
  const { data, error } = await supabase.from('tastings').insert(tasting).select().single();
  return { data, error, newQty };
}

export async function updateTasting(tastingId, updates) {
  const { data, error } = await supabase
    .from('tastings')
    .update(updates)
    .eq('id', tastingId)
    .select()
    .single();
  return { data, error };
}

export async function deleteTasting(tastingId) {
  return supabase.from('tastings').delete().eq('id', tastingId);
}

// ═══════════════════════════════════════════════════════════════
// WISHLIST
// ═══════════════════════════════════════════════════════════════

export async function fetchWishlist(userId) {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function addToWishlist(userId, wine) {
  const { data, error } = await supabase
    .from('wishlist')
    .insert({ user_id: userId, ...wine })
    .select()
    .single();
  return { data, error };
}

export async function removeFromWishlist(id) {
  return supabase.from('wishlist').delete().eq('id', id);
}

// Move from wishlist to cave
export async function wishlistToCave(userId, wish) {
  const bottle = {
    name: wish.name, cuvee: wish.cuvee || '', region: wish.region || '',
    appellation: wish.appellation || '', color: wish.color || 'rouge',
    price: wish.price_estimate || 0, quantity: 1,
  };
  const result = await addBottle(userId, bottle);
  if (!result.error) await removeFromWishlist(wish.id);
  return result;
}

// ═══════════════════════════════════════════════════════════════
// SOCIAL — Follows, profiles, feed
// ═══════════════════════════════════════════════════════════════

export async function searchUsers(query) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, username, avatar_url, city, bio, bottle_count, public_cave')
    .or(`username.ilike.%${query}%,name.ilike.%${query}%`)
    .limit(10);
  return { data: data || [], error };
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
}

export async function followUser(followerId, followedId) {
  const { data, error } = await supabase
    .from('follows')
    .insert({ follower_id: followerId, followed_id: followedId })
    .select()
    .single();
  return { data, error };
}

export async function unfollowUser(followerId, followedId) {
  return supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('followed_id', followedId);
}

export async function getFollowing(userId) {
  const { data: follows, error } = await supabase
    .from('follows')
    .select('followed_id')
    .eq('follower_id', userId);
  if (error || !follows || follows.length === 0) return { data: [], error };
  const ids = follows.map(f => f.followed_id);
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, username, avatar_url, bottle_count, public_cave')
    .in('id', ids);
  return { data: profiles || [], error: null };
}

export async function getFollowers(userId) {
  const { data: follows, error } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('followed_id', userId);
  if (error || !follows || follows.length === 0) return { data: [], error };
  const ids = follows.map(f => f.follower_id);
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, username, avatar_url, bottle_count')
    .in('id', ids);
  return { data: profiles || [], error: null };
}

export async function isFollowing(followerId, followedId) {
  const { data } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', followerId)
    .eq('followed_id', followedId)
    .maybeSingle();
  return !!data;
}

// Social feed: tastings from people I follow
export async function fetchSocialFeed(userId) {
  // Get who I follow
  const { data: following } = await supabase
    .from('follows')
    .select('followed_id')
    .eq('follower_id', userId);
  
  const followedIds = (following || []).map(f => f.followed_id);
  if (followedIds.length === 0) return { data: [] };
  
  const { data: tastingsRaw, error } = await supabase
    .from('tastings')
    .select('*')
    .in('user_id', followedIds)
    .order('tasted_at', { ascending: false })
    .limit(30);
  // Enrich with profile data
  const profileIds = [...new Set((tastingsRaw || []).map(t => t.user_id))];
  const { data: profs } = profileIds.length > 0
    ? await supabase.from('profiles').select('id, name, username, avatar_url').in('id', profileIds)
    : { data: [] };
  const profMap = {};
  (profs || []).forEach(p => profMap[p.id] = p);
  const data = (tastingsRaw || []).map(t => ({ ...t, profiles: profMap[t.user_id] || null }));
  
  return { data: data || [], error };
}

// Get public bottles of a user (for viewing their cave)
export async function getPublicBottles(userId) {
  const { data, error } = await supabase
    .from('bottles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data: (data || []).map(b => b), error };
}

// ═══════════════════════════════════════════════════════════════
// PLACES — Cavistes, bars à vin
// ═══════════════════════════════════════════════════════════════

export async function fetchNearbyPlaces(lat, lng, radiusKm = 20) {
  // Approximate bounding box
  const dLat = radiusKm / 111;
  const dLng = radiusKm / (111 * Math.cos(lat * Math.PI / 180));
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .gte('lat', lat - dLat).lte('lat', lat + dLat)
    .gte('lng', lng - dLng).lte('lng', lng + dLng)
    .order('name');
  return { data: data || [], error };
}

export async function fetchAllPlaces() {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('name');
  return { data: data || [], error };
}

export async function fetchPlace(placeId) {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('id', placeId)
    .single();
  return { data, error };
}

export async function addPlace(userId, place) {
  const { data, error } = await supabase
    .from('places')
    .insert({ created_by: userId, ...place })
    .select()
    .single();
  return { data, error };
}

export async function fetchPlaceReviews(placeId) {
  const { data, error } = await supabase
    .from('place_reviews')
    .select('*, profiles:user_id(name, username, avatar_url)')
    .eq('place_id', placeId)
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function addPlaceReview(userId, placeId, rating, comment) {
  const { data, error } = await supabase
    .from('place_reviews')
    .upsert({ user_id: userId, place_id: placeId, rating, comment }, { onConflict: 'place_id,user_id' })
    .select()
    .single();
  return { data, error };
}

export async function fetchPlacePicks(placeId) {
  const { data, error } = await supabase
    .from('place_picks')
    .select('*')
    .eq('place_id', placeId)
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function addPlacePick(userId, placeId, pick) {
  const { data, error } = await supabase
    .from('place_picks')
    .insert({ created_by: userId, place_id: placeId, ...pick })
    .select()
    .single();
  return { data, error };
}

export async function updatePlace(placeId, updates) {
  const { data, error } = await supabase
    .from('places')
    .update(updates)
    .eq('id', placeId)
    .select()
    .single();
  return { data, error };
}
