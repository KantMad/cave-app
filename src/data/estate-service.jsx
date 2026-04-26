// ═══════════════════════════════════════════════════════════════════════════════
//  ESTATE SEARCH SERVICE — Recherche & Croisement Domaines ↔ Vins ↔ Régions
//
//  Fournit :
//  • Recherche textuelle dans ESTATES_DATABASE (instantanée)
//  • Résolution bidirectionnelle : bouteille → domaine, domaine → bouteilles
//  • Filtres croisés : par région, méthode (Bio/Biodynamie), prestige, type…
//  • Agrégations : stats par région, répartition des pratiques, prix moyens
//  • Enrichissement d'une bouteille avec sa fiche domaine complète
//
//  Dépend de ESTATES_DATABASE (estates_database.jsx) et WINE_DATABASE
//  (wine_reference_db.jsx) — les deux doivent être chargés au préalable.
//
//  Usage :
//    const estate = EstateService.getByName('Château Margaux');
//    const wines = EstateService.getWinesForEstate('est-017');
//    const estate = EstateService.getEstateForWine('ref-001');
//    const results = EstateService.search('biodynamie bourgogne');
//    const bioEstates = EstateService.filter({ method: 'Biodynamie' });
//    const stats = EstateService.statsByRegion();
// ═══════════════════════════════════════════════════════════════════════════════

const EstateService = (() => {

  // ─── Utilitaires ──────────────────────────────────────────────────────────

  const normalize = (s) => (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Indexation paresseuse — on la construit à la première requête
  let _indexByName = null;
  let _indexById = null;
  let _indexByWineRef = null;
  let _indexBySlug = null;

  function buildIndexes() {
    if (_indexByName) return;
    _indexByName = new Map();
    _indexById = new Map();
    _indexBySlug = new Map();
    _indexByWineRef = new Map();

    (window.ESTATES_DATABASE || []).forEach(e => {
      _indexByName.set(normalize(e.name), e);
      _indexById.set(e.id, e);
      _indexBySlug.set(e.slug, e);
      (e.wineRefs || []).forEach(ref => _indexByWineRef.set(ref, e));
    });
  }

  // ─── Accès direct ─────────────────────────────────────────────────────────

  function getById(id) {
    buildIndexes();
    return _indexById.get(id) || null;
  }

  function getBySlug(slug) {
    buildIndexes();
    return _indexBySlug.get(slug) || null;
  }

  function getByName(name) {
    buildIndexes();
    return _indexByName.get(normalize(name)) || null;
  }

  // Récupère le domaine associé à une référence de vin (ref-001 → est-017)
  function getEstateForWine(wineRefId) {
    buildIndexes();
    return _indexByWineRef.get(wineRefId) || null;
  }

  // Idem mais à partir d'un objet bouteille (de la CAVE utilisateur) :
  // on cherche par estateId si présent, sinon par nom du vin.
  function getEstateForBottle(bottle) {
    if (!bottle) return null;
    if (bottle.estateId) return getById(bottle.estateId);
    // Fallback : matcher par nom (le name dans la cave = nom du domaine dans WINE_DB)
    return getByName(bottle.name);
  }

  // ─── Résolution bidirectionnelle : domaine → cuvées ───────────────────────

  function getWinesForEstate(estateIdOrObj) {
    const estate = typeof estateIdOrObj === 'string' ? getById(estateIdOrObj) : estateIdOrObj;
    if (!estate || typeof window.WINE_DATABASE === "undefined") return [];
    const refs = new Set(estate.wineRefs || []);
    return window.WINE_DATABASE.filter(w => refs.has(w.id));
  }

  // ─── Recherche textuelle ──────────────────────────────────────────────────
  /**
   * Cherche dans name, appellations, region, subRegion, village, owner, tags.
   * Scoring simple : 3 pts nom exact, 2 pts nom partial, 1 pt autres champs.
   * @param {string} query — chaîne libre
   * @param {number} maxResults — défaut 20
   */
  function search(query, maxResults = 20) {
    const q = normalize(query);
    if (!q) return [];
    const tokens = q.split(' ').filter(Boolean);

    const scored = (window.ESTATES_DATABASE || []).map(e => {
      let score = 0;
      const fields = {
        name: normalize(e.name),
        slug: e.slug || '',
        appellations: normalize((e.appellations || []).join(' ')),
        region: normalize(e.region),
        sub: normalize(e.subRegion || ''),
        village: normalize(e.village || ''),
        owner: normalize(e.owner || ''),
        tags: normalize((e.tags || []).join(' ')),
        method: normalize(e.viticulture?.method || ''),
      };

      tokens.forEach(t => {
        if (fields.name === t) score += 10;
        else if (fields.name.startsWith(t)) score += 6;
        else if (fields.name.includes(t)) score += 4;
        if (fields.appellations.includes(t)) score += 3;
        if (fields.region.includes(t)) score += 2;
        if (fields.sub.includes(t)) score += 2;
        if (fields.village.includes(t)) score += 2;
        if (fields.owner.includes(t)) score += 2;
        if (fields.tags.includes(t)) score += 2;
        if (fields.method.includes(t)) score += 3; // "bio", "biodynamie", "hve"
      });
      return { estate: e, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score || (b.estate.prestigeScore || 0) - (a.estate.prestigeScore || 0));

    return scored.slice(0, maxResults).map(r => r.estate);
  }

  // ─── Filtres croisés ──────────────────────────────────────────────────────
  /**
   * Filtre combinable. Exemples :
   *   filter({ region: 'Bourgogne' })
   *   filter({ method: 'Biodynamie' })
   *   filter({ country: 'Italie', minPrestige: 95 })
   *   filter({ type: 'Château', region: 'Bordeaux' })
   *   filter({ priceMax: 100, openToPublic: true })
   */
  function filter(criteria = {}) {
    return (window.ESTATES_DATABASE || []).filter(e => {
      if (criteria.region && e.region !== criteria.region) return false;
      if (criteria.subRegion && e.subRegion !== criteria.subRegion) return false;
      if (criteria.country && e.country !== criteria.country) return false;
      if (criteria.type && e.type !== criteria.type) return false;
      if (criteria.method) {
        const m = e.viticulture?.method || '';
        // On accepte les variantes : "Bio" matche "Biologique", etc.
        const target = normalize(criteria.method);
        const actual = normalize(m);
        if (!actual.includes(target)) return false;
      }
      if (criteria.appellation) {
        const apps = (e.appellations || []).map(normalize);
        if (!apps.some(a => a.includes(normalize(criteria.appellation)))) return false;
      }
      if (criteria.minPrestige != null && (e.prestigeScore || 0) < criteria.minPrestige) return false;
      if (criteria.maxPrestige != null && (e.prestigeScore || 0) > criteria.maxPrestige) return false;
      if (criteria.priceMin != null && (e.valuation?.avgPriceFirst || 0) < criteria.priceMin) return false;
      if (criteria.priceMax != null && (e.valuation?.avgPriceFirst || Infinity) > criteria.priceMax) return false;
      if (criteria.foundedBefore != null && (e.founded || Infinity) >= criteria.foundedBefore) return false;
      if (criteria.foundedAfter != null && (e.founded || 0) <= criteria.foundedAfter) return false;
      if (criteria.openToPublic === true && e.visit?.openToPublic !== true) return false;
      if (criteria.tag) {
        const tags = (e.tags || []).map(normalize);
        if (!tags.some(t => t.includes(normalize(criteria.tag)))) return false;
      }
      return true;
    });
  }

  // ─── Agrégations / stats ──────────────────────────────────────────────────

  function statsByRegion() {
    const stats = {};
    (window.ESTATES_DATABASE || []).forEach(e => {
      const r = e.region || 'Autre';
      if (!stats[r]) {
        stats[r] = {
          region: r,
          count: 0,
          bioCount: 0,
          biodynamicCount: 0,
          avgPrestige: 0,
          avgPrice: 0,
          _prestigeSum: 0, _prestigeN: 0,
          _priceSum: 0, _priceN: 0,
        };
      }
      stats[r].count++;
      const method = (e.viticulture?.method || '').toLowerCase();
      if (method.includes('bio')) stats[r].bioCount++;
      if (method.includes('biodynam')) stats[r].biodynamicCount++;
      if (e.prestigeScore != null) {
        stats[r]._prestigeSum += e.prestigeScore;
        stats[r]._prestigeN++;
      }
      if (e.valuation?.avgPriceFirst != null) {
        stats[r]._priceSum += e.valuation.avgPriceFirst;
        stats[r]._priceN++;
      }
    });
    Object.values(stats).forEach(s => {
      s.avgPrestige = s._prestigeN ? Math.round(s._prestigeSum / s._prestigeN) : null;
      s.avgPrice = s._priceN ? Math.round(s._priceSum / s._priceN) : null;
      delete s._prestigeSum; delete s._prestigeN;
      delete s._priceSum; delete s._priceN;
    });
    return Object.values(stats).sort((a, b) => b.count - a.count);
  }

  function statsByViticulture() {
    const stats = { Conventionnelle: 0, Raisonnée: 0, HVE: 0, Bio: 0, Biodynamie: 0, Nature: 0, Autre: 0 };
    (window.ESTATES_DATABASE || []).forEach(e => {
      const m = normalize(e.viticulture?.method || '');
      if (m.includes('biodynam')) stats.Biodynamie++;
      else if (m.includes('bio')) stats.Bio++;
      else if (m.includes('hve')) stats.HVE++;
      else if (m.includes('raison')) stats['Raisonnée']++;
      else if (m.includes('nature')) stats.Nature++;
      else if (m.includes('convention')) stats.Conventionnelle++;
      else stats.Autre++;
    });
    return stats;
  }

  // Top N domaines par prestige
  function topByPrestige(n = 10) {
    return (window.ESTATES_DATABASE || [])
      .filter(e => e.prestigeScore != null)
      .sort((a, b) => b.prestigeScore - a.prestigeScore)
      .slice(0, n);
  }

  // Top N domaines par valeur / prix
  function topByValue(n = 10) {
    return (window.ESTATES_DATABASE || [])
      .filter(e => e.valuation?.avgPriceFirst != null)
      .sort((a, b) => (b.valuation.avgPriceFirst || 0) - (a.valuation.avgPriceFirst || 0))
      .slice(0, n);
  }

  // ─── Enrichissement d'une bouteille avec sa fiche domaine ────────────────

  /**
   * Renvoie la bouteille enrichie avec `fullEstate` (toutes les données
   * expertes du domaine depuis ESTATES_DATABASE). Utile pour l'écran détail.
   */
  function enrichBottleWithEstate(bottle) {
    if (!bottle) return bottle;
    const fullEstate = getEstateForBottle(bottle);
    return {
      ...bottle,
      fullEstate: fullEstate || null,
      estateId: fullEstate?.id || bottle.estateId || null,
    };
  }

  // ─── Groupements utiles pour UI ───────────────────────────────────────────

  // Regroupe les domaines par région, chaque région → tableau de domaines
  function groupedByRegion() {
    const groups = {};
    (window.ESTATES_DATABASE || []).forEach(e => {
      if (!groups[e.region]) groups[e.region] = [];
      groups[e.region].push(e);
    });
    // Tri interne par prestige puis par nom
    Object.values(groups).forEach(arr => {
      arr.sort((a, b) =>
        (b.prestigeScore || 0) - (a.prestigeScore || 0) ||
        a.name.localeCompare(b.name, 'fr')
      );
    });
    return groups;
  }

  // ─── API publique ─────────────────────────────────────────────────────────

  return {
    // Accès direct
    getById,
    getBySlug,
    getByName,
    getEstateForWine,
    getEstateForBottle,
    getWinesForEstate,

    // Recherche & filtres
    search,
    filter,

    // Stats
    statsByRegion,
    statsByViticulture,
    topByPrestige,
    topByValue,

    // UI helpers
    enrichBottleWithEstate,
    groupedByRegion,

    // Exposition partielle pour debug
    _all: () => window.ESTATES_DATABASE || [],
  };

})();

// Exposition globale (même convention que WINE_DATABASE / WineSearchService)
Object.assign(window, { EstateService });

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EstateService };
}
