// ═══════════════════════════════════════════════════════════════════════════════
//  MODULE D'INTÉGRATION — OPEN FOOD FACTS + RECHERCHE LOCALE
//  
//  Ce module fournit :
//  1. Recherche dans la base locale WINE_DATABASE (prioritaire, données expert)
//  2. Lookup Open Food Facts par code-barres (scan) ou recherche texte
//  3. Fusion intelligente : données expert locales + données OFF
//  
//  Usage dans l'app :
//    const result = await WineSearchService.searchByBarcode('3760042140268');
//    const results = await WineSearchService.searchByName('Château Margaux 2015');
//    const results = WineSearchService.searchLocal('Margaux');
// ═══════════════════════════════════════════════════════════════════════════════

const WineSearchService = (() => {

  // ─── Config ───────────────────────────────────────────────────────────────
  const OFF_BASE = 'https://world.openfoodfacts.org';
  const OFF_SEARCH = `${OFF_BASE}/cgi/search.pl`;
  const OFF_PRODUCT = `${OFF_BASE}/api/v2/product`;
  const USER_AGENT = 'CaveApp/1.0 (contact@caveapp.fr)';
  const CACHE_TTL = 1000 * 60 * 60; // 1h cache

  const cache = new Map();

  // ─── Utilitaires ──────────────────────────────────────────────────────────

  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  }

  function getCached(key) {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
    cache.delete(key);
    return null;
  }

  function setCache(key, data) {
    cache.set(key, { data, ts: Date.now() });
    return data;
  }

  // ─── Mapping OFF → format app ─────────────────────────────────────────────

  function mapOFFProduct(product) {
    if (!product || !product.product_name) return null;

    const name = product.product_name || '';
    const brands = product.brands || '';
    const categories = (product.categories_tags || []).map(c => c.replace('en:', '').replace('fr:', ''));
    const labels = (product.labels_tags || []).map(l => l.replace('en:', '').replace('fr:', ''));
    const origins = (product.origins_tags || product.manufacturing_places_tags || []).map(o => o.replace('en:', '').replace('fr:', ''));
    const alcohol = product.nutriments ? parseFloat(product.nutriments.alcohol_100g || product.nutriments.alcohol) || null : null;
    const quantity = product.quantity || '';
    const imageUrl = product.image_front_url || product.image_url || '';
    const barcode = product.code || '';

    // Détection couleur depuis les catégories OFF
    let color = 'rouge';
    const catStr = categories.join(' ').toLowerCase();
    if (catStr.includes('white') || catStr.includes('blanc')) color = 'blanc';
    else if (catStr.includes('rose') || catStr.includes('rosé')) color = 'rosé';
    else if (catStr.includes('champagne') || catStr.includes('sparkling') || catStr.includes('effervescent') || catStr.includes('crémant') || catStr.includes('mousseux')) color = 'effervescent';
    else if (catStr.includes('sweet') || catStr.includes('liquoreux') || catStr.includes('moelleux') || catStr.includes('sauternes')) color = 'liquoreux';
    else if (catStr.includes('fortified') || catStr.includes('porto') || catStr.includes('port') || catStr.includes('muté')) color = 'muté';

    // Détection région depuis les catégories ou origines
    let region = '';
    const allText = (catStr + ' ' + origins.join(' ')).toLowerCase();
    const regionMap = {
      'bordeaux': 'Bordeaux', 'bourgogne': 'Bourgogne', 'burgundy': 'Bourgogne',
      'champagne': 'Champagne', 'alsace': 'Alsace', 'loire': 'Loire',
      'rhone': 'Rhône', 'rhône': 'Rhône', 'provence': 'Provence',
      'languedoc': 'Languedoc', 'roussillon': 'Languedoc',
      'beaujolais': 'Beaujolais', 'jura': 'Jura', 'savoie': 'Savoie',
      'corse': 'Corse', 'corsica': 'Corse',
      'toscana': 'Italie', 'piemonte': 'Italie', 'tuscany': 'Italie', 'piedmont': 'Italie',
      'rioja': 'Espagne', 'ribera': 'Espagne',
      'napa': 'USA', 'california': 'USA', 'sonoma': 'USA',
      'mendoza': 'Argentine', 'barossa': 'Australie', 'marlborough': 'Nouvelle-Zélande',
    };
    for (const [key, val] of Object.entries(regionMap)) {
      if (allText.includes(key)) { region = val; break; }
    }

    // Détection labels qualité
    const qualityLabels = [];
    const labelStr = labels.join(' ').toLowerCase();
    if (labelStr.includes('bio') || labelStr.includes('organic')) qualityLabels.push('Bio');
    if (labelStr.includes('biodynami')) qualityLabels.push('Biodynamie');
    if (labelStr.includes('hve') || labelStr.includes('haute-valeur')) qualityLabels.push('HVE');
    if (labelStr.includes('nature') || labelStr.includes('natural')) qualityLabels.push('Nature');
    if (labelStr.includes('vegan')) qualityLabels.push('Végan');

    return {
      source: 'openfoodfacts',
      barcode,
      name: brands || name.split(/\s+/).slice(0, 3).join(' '),
      cuvee: brands ? name : '',
      region,
      color,
      alcohol,
      quantity,
      labels: qualityLabels,
      categories,
      imageUrl,
      rawData: {
        origins,
        allLabels: labels,
        packaging: product.packaging || '',
        stores: product.stores || '',
        countries: (product.countries_tags || []).map(c => c.replace('en:', '')),
      },
    };
  }

  // ─── Recherche locale dans WINE_DATABASE ──────────────────────────────────

  function searchLocal(query, maxResults = 10) {
    if (!window.WINE_DATABASE) return [];
    const q = normalize(query);
    const words = q.split(/\s+/).filter(w => w.length > 1);
    if (words.length === 0) return [];

    const scored = window.WINE_DATABASE.map(wine => {
      const searchable = normalize(
        `${wine.name} ${wine.cuvee} ${wine.region} ${wine.appellation} ${wine.subRegion || ''} ` +
        `${(wine.cepages || []).map(c => c.name).join(' ')} ${(wine.tags || []).join(' ')}`
      );

      let score = 0;
      // Exact name match = highest priority
      if (normalize(wine.name).includes(q)) score += 100;
      if (normalize(wine.cuvee || '').includes(q)) score += 80;
      // Word-level matching
      for (const w of words) {
        if (searchable.includes(w)) score += 20;
        if (normalize(wine.name).includes(w)) score += 15;
        if (normalize(wine.region).includes(w)) score += 10;
        if (normalize(wine.appellation).includes(w)) score += 10;
      }
      return { wine, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

    return scored.map(s => ({ ...s.wine, source: 'local', matchScore: s.score }));
  }

  // ─── Recherche Open Food Facts par code-barres ────────────────────────────

  async function searchByBarcode(barcode) {
    const cacheKey = `barcode:${barcode}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const resp = await fetch(`${OFF_PRODUCT}/${barcode}.json`, {
        headers: { 'User-Agent': USER_AGENT },
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      if (data.status !== 1) return null;

      const offResult = mapOFFProduct(data.product);
      if (!offResult) return null;

      // Chercher un match dans la base locale pour enrichir
      const localMatches = searchLocal(offResult.name, 3);
      if (localMatches.length > 0) {
        return setCache(cacheKey, mergeResults(localMatches[0], offResult));
      }

      return setCache(cacheKey, offResult);
    } catch (err) {
      console.warn('[WineSearch] OFF barcode lookup failed:', err.message);
      return null;
    }
  }

  // ─── Recherche Open Food Facts par texte ──────────────────────────────────

  async function searchOFF(query, maxResults = 10) {
    const cacheKey = `off:${normalize(query)}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const params = new URLSearchParams({
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: maxResults,
        // Filtrer sur les boissons alcoolisées
        tagtype_0: 'categories',
        tag_contains_0: 'contains',
        tag_0: 'alcoholic-beverages',
        fields: 'product_name,brands,categories_tags,labels_tags,origins_tags,nutriments,quantity,code,image_front_url,image_url,packaging,stores,countries_tags,manufacturing_places_tags',
      });

      const resp = await fetch(`${OFF_SEARCH}?${params}`, {
        headers: { 'User-Agent': USER_AGENT },
      });
      if (!resp.ok) return [];
      const data = await resp.json();
      if (!data.products) return [];

      const results = data.products
        .map(mapOFFProduct)
        .filter(Boolean);

      return setCache(cacheKey, results);
    } catch (err) {
      console.warn('[WineSearch] OFF text search failed:', err.message);
      return [];
    }
  }

  // ─── Recherche combinée (local + OFF) ─────────────────────────────────────

  async function searchByName(query, maxResults = 15) {
    // 1. Recherche locale d'abord (instantanée, données riches)
    const localResults = searchLocal(query, maxResults);

    // 2. Si peu de résultats locaux, compléter avec OFF
    let offResults = [];
    if (localResults.length < 5) {
      try {
        offResults = await searchOFF(query, maxResults - localResults.length);
      } catch (e) {
        // Silently fail — local results are sufficient
      }
    }

    // 3. Fusionner et dédupliquer
    const merged = [...localResults];
    for (const offResult of offResults) {
      const isDupe = merged.some(m =>
        normalize(m.name) === normalize(offResult.name)
      );
      if (!isDupe) merged.push(offResult);
    }

    return merged.slice(0, maxResults);
  }

  // ─── Fusion résultats local + OFF ─────────────────────────────────────────

  function mergeResults(local, off) {
    return {
      ...local,
      source: 'merged',
      barcode: off.barcode || '',
      imageUrl: off.imageUrl || '',
      offData: off.rawData || {},
      // Enrichir les labels locaux avec ceux d'OFF
      labels: [...new Set([...(local.labels || []), ...(off.labels || [])])],
    };
  }

  // ─── Recherche spécifique boissons alcoolisées (bières, spiritueux) ───────

  async function searchAlcoholicBeverages(query, maxResults = 10) {
    const cacheKey = `alc:${normalize(query)}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const params = new URLSearchParams({
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: maxResults,
        tagtype_0: 'categories',
        tag_contains_0: 'contains',
        tag_0: 'alcoholic-beverages',
        fields: 'product_name,brands,categories_tags,labels_tags,origins_tags,nutriments,quantity,code,image_front_url,image_url,packaging,stores,countries_tags',
      });

      const resp = await fetch(`${OFF_SEARCH}?${params}`, {
        headers: { 'User-Agent': USER_AGENT },
      });
      if (!resp.ok) return [];
      const data = await resp.json();
      if (!data.products) return [];

      const results = data.products.map(product => {
        const categories = (product.categories_tags || []).map(c => c.replace('en:', '').replace('fr:', ''));
        const catStr = categories.join(' ').toLowerCase();

        let type = 'vin';
        if (catStr.includes('beer') || catStr.includes('bière')) type = 'bière';
        else if (catStr.includes('spirit') || catStr.includes('whisky') || catStr.includes('vodka') || catStr.includes('gin') || catStr.includes('rum') || catStr.includes('cognac') || catStr.includes('armagnac') || catStr.includes('calvados')) type = 'spiritueux';
        else if (catStr.includes('cider') || catStr.includes('cidre')) type = 'cidre';
        else if (catStr.includes('liqueur') || catStr.includes('liquor')) type = 'liqueur';

        return {
          source: 'openfoodfacts',
          type,
          barcode: product.code || '',
          name: product.brands || product.product_name || '',
          productName: product.product_name || '',
          categories,
          alcohol: product.nutriments ? parseFloat(product.nutriments.alcohol_100g || 0) : null,
          quantity: product.quantity || '',
          labels: (product.labels_tags || []).map(l => l.replace('en:', '').replace('fr:', '')),
          imageUrl: product.image_front_url || product.image_url || '',
          origins: (product.origins_tags || []).map(o => o.replace('en:', '').replace('fr:', '')),
        };
      }).filter(Boolean);

      return setCache(cacheKey, results);
    } catch (err) {
      console.warn('[WineSearch] OFF alcoholic beverage search failed:', err.message);
      return [];
    }
  }

  // ─── Statistiques de la base locale ───────────────────────────────────────

  function getLocalStats() {
    if (!window.WINE_DATABASE) return null;
    const db = window.WINE_DATABASE;

    const regions = {};
    const colors = {};
    const tags = {};
    let priceMin = Infinity, priceMax = 0;

    db.forEach(w => {
      regions[w.region] = (regions[w.region] || 0) + 1;
      colors[w.color] = (colors[w.color] || 0) + 1;
      (w.tags || []).forEach(t => tags[t] = (tags[t] || 0) + 1);
      const p = w.priceRange ? parseInt(w.priceRange.split('-')[0]) : 0;
      if (p > 0) { priceMin = Math.min(priceMin, p); priceMax = Math.max(priceMax, parseInt(w.priceRange.split('-')[1] || p)); }
    });

    return {
      totalWines: db.length,
      regions: Object.entries(regions).sort((a, b) => b[1] - a[1]),
      colors: Object.entries(colors).sort((a, b) => b[1] - a[1]),
      topTags: Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 20),
      priceRange: { min: priceMin === Infinity ? 0 : priceMin, max: priceMax },
    };
  }

  // ─── API publique ─────────────────────────────────────────────────────────

  return {
    searchLocal,
    searchByBarcode,
    searchByName,
    searchOFF,
    searchAlcoholicBeverages,
    getLocalStats,
    clearCache: () => cache.clear(),
  };

})();

// Export global
Object.assign(window, { WineSearchService });
