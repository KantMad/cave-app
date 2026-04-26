// api/estate.js — Estate lookup by wine name or search query
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let estates = null;
function load() {
  if (estates) return estates;
  try { estates = require('./estates.json'); } catch(e) { estates = []; }
  return estates;
}

function normalize(str) {
  return (str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = load();
  const { q, name, slug, id } = req.method === 'POST' ? req.body : req.query;

  // Lookup by id or slug
  if (id) {
    const e = db.find(e => e.id === id);
    return res.status(200).json(e || null);
  }
  if (slug) {
    const e = db.find(e => e.slug === slug);
    return res.status(200).json(e || null);
  }

  // Match by wine/estate name
  if (name) {
    const n = normalize(name);
    let match = db.find(e => normalize(e.name) === n);
    if (!match) match = db.find(e => n.includes(normalize(e.name)) || normalize(e.name).includes(n));
    return res.status(200).json(match || null);
  }

  // Search
  if (q && q.length >= 2) {
    const nq = normalize(q);
    const words = nq.split(/\s+/).filter(w => w.length > 1);
    const results = db
      .map(e => {
        const searchable = normalize(`${e.name} ${e.region} ${(e.appellations||[]).join(' ')} ${e.owner||''} ${e.type||''}`);
        let score = 0;
        if (normalize(e.name).includes(nq)) score += 100;
        for (const w of words) {
          if (searchable.includes(w)) score += 20;
          if (normalize(e.name).includes(w)) score += 15;
        }
        return { estate: e, score };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(r => r.estate);
    return res.status(200).json(results);
  }

  return res.status(400).json({ error: 'Provide q, name, slug, or id' });
}
