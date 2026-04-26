// ═══════════════════════════════════════════════════════════════════════════════
//  MODULE DE RECHERCHE VINS — Open Food Facts + Catalogue Supabase
// ═══════════════════════════════════════════════════════════════════════════════

const OFF_BASE = 'https://world.openfoodfacts.org';
const OFF_SEARCH = `${OFF_BASE}/cgi/search.pl`;
const OFF_PRODUCT = `${OFF_BASE}/api/v2/product`;
const CACHE_TTL = 1000 * 60 * 60;
const cache = new Map();

function norm(str) {
  return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
}

function getCached(key) {
  const e = cache.get(key);
  if (e && Date.now() - e.ts < CACHE_TTL) return e.data;
  cache.delete(key);
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
  return data;
}

// Map OFF product → app format
function mapOFF(product) {
  if (!product?.product_name) return null;
  const cats = (product.categories_tags || []).map(c => c.replace(/^(en|fr):/, ''));
  const labels = (product.labels_tags || []).map(l => l.replace(/^(en|fr):/, ''));
  const origins = (product.origins_tags || []).map(o => o.replace(/^(en|fr):/, ''));
  const alcohol = product.nutriments ? parseFloat(product.nutriments.alcohol_100g || product.nutriments.alcohol) || null : null;
  const catStr = cats.join(' ').toLowerCase();

  let color = 'rouge';
  if (catStr.match(/white|blanc/)) color = 'blanc';
  else if (catStr.match(/rose|rosé/)) color = 'rosé';
  else if (catStr.match(/champagne|sparkling|effervescent|crémant|mousseux/)) color = 'effervescent';
  else if (catStr.match(/sweet|liquoreux|moelleux|sauternes/)) color = 'liquoreux';

  let region = '';
  const allText = (catStr + ' ' + origins.join(' ')).toLowerCase();
  const regionMap = {
    'bordeaux': 'Bordeaux', 'bourgogne': 'Bourgogne', 'burgundy': 'Bourgogne',
    'champagne': 'Champagne', 'alsace': 'Alsace', 'loire': 'Loire',
    'rhone': 'Rhône', 'rhône': 'Rhône', 'provence': 'Provence',
    'languedoc': 'Languedoc', 'beaujolais': 'Beaujolais', 'jura': 'Jura',
    'savoie': 'Savoie', 'corse': 'Corse',
  };
  for (const [k, v] of Object.entries(regionMap)) {
    if (allText.includes(k)) { region = v; break; }
  }

  const qualityLabels = [];
  const labelStr = labels.join(' ').toLowerCase();
  if (labelStr.includes('bio') || labelStr.includes('organic')) qualityLabels.push('Bio');
  if (labelStr.includes('biodynami')) qualityLabels.push('Biodynamie');
  if (labelStr.includes('nature') || labelStr.includes('natural')) qualityLabels.push('Nature');

  const brands = product.brands || '';
  return {
    source: 'openfoodfacts',
    barcode: product.code || '',
    name: brands || product.product_name.split(/\s+/).slice(0, 3).join(' '),
    cuvee: brands ? product.product_name : '',
    region, color, alcohol,
    labels: qualityLabels,
    imageUrl: product.image_front_url || product.image_url || '',
  };
}

// Search OFF by barcode
export async function searchByBarcode(barcode) {
  const key = `bc:${barcode}`;
  const c = getCached(key);
  if (c) return c;
  try {
    const r = await fetch(`${OFF_PRODUCT}/${barcode}.json`);
    if (!r.ok) return null;
    const d = await r.json();
    if (d.status !== 1) return null;
    const result = mapOFF(d.product);
    return result ? setCache(key, result) : null;
  } catch { return null; }
}

// Search OFF by text
export async function searchOFF(query, max = 5) {
  const key = `off:${norm(query)}`;
  const c = getCached(key);
  if (c) return c;
  try {
    const params = new URLSearchParams({
      search_terms: query, search_simple: 1, action: 'process', json: 1,
      page_size: max, tagtype_0: 'categories', tag_contains_0: 'contains', tag_0: 'wines',
      fields: 'product_name,brands,categories_tags,labels_tags,origins_tags,nutriments,quantity,code,image_front_url',
    });
    const r = await fetch(`${OFF_SEARCH}?${params}`);
    if (!r.ok) return [];
    const d = await r.json();
    const results = (d.products || []).map(mapOFF).filter(Boolean);
    return setCache(key, results);
  } catch { return []; }
}
