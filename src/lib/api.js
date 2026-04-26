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
    // Upsert into global catalog
    await upsertCatalog(userId, bottle);
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

// Resize image to reduce upload size (max 800px, JPEG quality 0.7)
function resizeImage(file, maxSize = 800) {
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
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
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
// WINE CATALOG (global, shared)
// ═══════════════════════════════════════════════════════════════

export async function searchCatalog(query) {
  if (!query || query.length < 2) return [];
  const { data } = await supabase
    .from('wine_catalog')
    .select('*')
    .or(`name.ilike.%${query}%,cuvee.ilike.%${query}%,appellation.ilike.%${query}%,region.ilike.%${query}%`)
    .limit(8);
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

// Search wines directly from Supabase wine_catalog (seeded with 219 reference wines)
export async function searchWines(query) {
  if (!query || query.length < 2) return [];
  const { data, error } = await supabase
    .from('wine_catalog')
    .select('*')
    .or(`name.ilike.%${query}%,cuvee.ilike.%${query}%,appellation.ilike.%${query}%,region.ilike.%${query}%`)
    .limit(12);
  if (error) { console.warn('searchWines error:', error); return []; }
  return (data || []).map(w => ({ ...w, source: 'catalog' }));
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

async function upsertCatalog(userId, bottle) {
  try {
    await supabase.from('wine_catalog').upsert({
      name: bottle.name,
      cuvee: bottle.cuvee || '',
      region: bottle.region || '',
      appellation: bottle.appellation || '',
      color: bottle.color || 'rouge',
      robe: bottle.robe || '#6B1E2C',
      cepages: bottle.cepages || [],
      typical_alcohol: parseFloat(bottle.alcohol) || null,
      typical_price: parseFloat(bottle.price) || null,
      peak_from: parseInt(bottle.peakFrom) || null,
      peak_to: parseInt(bottle.peakTo) || null,
      aromas: bottle.aromas || [],
      pairings: bottle.pairings || [],
      service: bottle.service || {},
      estate: bottle.estate || {},
      added_by: userId,
    }, { onConflict: 'name,cuvee,region', ignoreDuplicates: true });
  } catch (e) {
    // Silent fail — catalog is optional
  }
}

// ═══════════════════════════════════════════════════════════════
// TASTINGS & ACTIVITY
// ═══════════════════════════════════════════════════════════════

export async function addTasting(userId, bottleId, rating, comment) {
  const { data, error } = await supabase
    .from('tastings')
    .insert({ user_id: userId, bottle_id: bottleId, rating, comment: comment || '' })
    .select()
    .single();

  if (data) {
    await supabase.from('activity').insert({
      user_id: userId, action: 'tasted', bottle_id: bottleId,
      metadata: { rating, comment },
    });
  }
  return { data, error };
}

export async function fetchActivity(limit = 20) {
  const { data, error } = await supabase
    .from('activity')
    .select('*, profiles(name, avatar_url), bottles(name, vintage, region)')
    .order('created_at', { ascending: false })
    .limit(limit);
  return { data: data || [], error };
}

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
