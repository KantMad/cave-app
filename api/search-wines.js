// api/search-wines.js — Search the 219 reference wines
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let wines = null;
function load() {
  if (wines) return wines;
  try { wines = require('./wines.json'); } catch(e) { wines = []; }
  return wines;
}

function normalize(str) {
  return (str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

function flattenAromas(aromas) {
  if (!aromas) return [];
  if (Array.isArray(aromas)) return aromas;
  return Object.values(aromas).flat();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { q } = req.query;
  if (!q || q.length < 2) return res.status(200).json([]);

  const db = load();
  const nq = normalize(q);
  const words = nq.split(/\s+/).filter(w => w.length > 1);

  const results = db
    .map(w => {
      const searchable = normalize(
        `${w.name} ${w.cuvee||''} ${w.region||''} ${w.appellation||''} ${w.subRegion||''} ${(w.cepages||[]).map(c=>c.name).join(' ')} ${(w.tags||[]).join(' ')}`
      );
      let score = 0;
      if (normalize(w.name).includes(nq)) score += 100;
      if (normalize(w.cuvee||'').includes(nq)) score += 80;
      if (normalize(w.appellation||'').includes(nq)) score += 60;
      for (const word of words) {
        if (searchable.includes(word)) score += 20;
        if (normalize(w.name).includes(word)) score += 15;
        if (normalize(w.region||'').includes(word)) score += 10;
      }
      return { wine: w, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(r => {
      const w = r.wine;
      return {
        id: w.id,
        name: w.name,
        cuvee: w.cuvee || '',
        region: w.region || '',
        subRegion: w.subRegion || '',
        appellation: w.appellation || '',
        classification: w.classification || '',
        color: w.color || 'rouge',
        robe: w.robe || '#6B1E2C',
        cepages: (w.cepages||[]).map(c => ({ n: c.name, p: c.pct })),
        alcoholRange: w.alcoholRange || '',
        priceRange: w.priceRange || '',
        aromas: flattenAromas(w.aromas),
        aromaWheel: w.aromaWheel || {},
        pairings: w.pairings || [],
        service: w.service || {},
        guard: w.guard || {},
        estate: w.estate || {},
        labels: w.labels || [],
        tags: w.tags || [],
        source: 'reference',
      };
    });

  return res.status(200).json(results);
}
