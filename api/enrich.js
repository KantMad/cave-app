// api/enrich.js — Vercel Serverless Function
// First checks reference wine DB, then falls back to Claude AI

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let wineDB = null;

function loadWineDB() {
  if (wineDB) return wineDB;
  try {
    wineDB = require('./wines.json');
  } catch (e) { wineDB = []; }
  return wineDB;
}

function normalize(str) {
  return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function findInReference(name, cuvee) {
  const wines = loadWineDB();
  const nName = normalize(name);
  const nCuvee = normalize(cuvee);
  let match = wines.find(w => normalize(w.name) === nName && (!nCuvee || normalize(w.cuvee) === nCuvee));
  if (!match) match = wines.find(w => normalize(w.name).includes(nName) || nName.includes(normalize(w.name)));
  return match;
}

function flattenAromas(aromas) {
  if (!aromas) return [];
  if (Array.isArray(aromas)) return aromas;
  return Object.values(aromas).flat();
}

function refToEnriched(ref) {
  return {
    estate: ref.estate || {},
    cepages: (ref.cepages || []).map(c => ({ n: c.name, p: c.pct })),
    aromas: flattenAromas(ref.aromas),
    aroma_wheel: ref.aromaWheel || {},
    pairings: ref.pairings || [],
    service: ref.service || {},
    peak_from: ref.guard ? new Date().getFullYear() + ref.guard.from : null,
    peak_to: ref.guard ? new Date().getFullYear() + ref.guard.to : null,
    alcohol: ref.alcoholRange ? parseFloat(ref.alcoholRange.split('-')[0]) : null,
    robe: ref.robe || '#6B1E2C',
    typical_price: ref.priceRange ? parseFloat(ref.priceRange.split('-')[0]) : null,
    vinification: '',
    score_avg: ref.vintages ? Math.round(Object.values(ref.vintages).reduce((s, v) => s + v.score, 0) / Object.keys(ref.vintages).length) : null,
    summary: ref.estate?.description || '',
    source: 'reference_db',
    classification: ref.classification || '',
    subRegion: ref.subRegion || '',
    labels: ref.labels || [],
    tags: ref.tags || [],
    vintages: ref.vintages || {},
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, cuvee, vintage, region, appellation, color } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  // 1. Check reference database first (free, instant, authoritative)
  const ref = findInReference(name, cuvee);
  if (ref) {
    return res.status(200).json(refToEnriched(ref));
  }

  // 2. Fall back to AI enrichment
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

  const wineName = `${name}${cuvee ? ' ' + cuvee : ''}${vintage ? ' ' + vintage : ''}`;
  const wineContext = `${region || ''}${appellation ? ' — ' + appellation : ''}, ${color || 'rouge'}`;

  const prompt = `Tu es un sommelier expert et encyclopédiste du vin. Pour le vin suivant, génère des informations détaillées et sourcées.

Vin : ${wineName}
Contexte : ${wineContext}

Réponds UNIQUEMENT en JSON valide (pas de markdown, pas de backticks), avec cette structure exacte :
{
  "estate": {
    "founded": 1855,
    "owner": "Nom du propriétaire actuel",
    "surface": "80 ha",
    "terroir": "Description du terroir (sol, exposition, altitude)",
    "soil": ["Type de sol 1", "Type de sol 2"],
    "climate": "Type de climat",
    "desc": "Histoire du domaine en 2-3 phrases."
  },
  "cepages": [
    {"n": "Cabernet Sauvignon", "p": 60},
    {"n": "Merlot", "p": 30}
  ],
  "aromas": ["cassis", "mûre", "cèdre", "vanille", "graphite"],
  "aroma_wheel": {
    "Fruit": 85, "Floral": 55, "Épicé": 70,
    "Terreux": 60, "Boisé": 65, "Minéral": 50,
    "Végétal": 30, "Empyreumatique": 45
  },
  "pairings": ["Côte de bœuf grillée", "Agneau rôti aux herbes", "Fromages affinés"],
  "service": {
    "temp": "16-18°",
    "carafe": "Carafage 1h recommandé",
    "verre": "Bordeaux Grand Cru"
  },
  "peak_from": 2028,
  "peak_to": 2045,
  "alcohol": 13.5,
  "robe": "#5A1020",
  "typical_price": 85,
  "vinification": "Description de la vinification.",
  "score_avg": 92,
  "summary": "Description du vin en 2-3 phrases.",
  "classification": "Ex: 1er GCC 1855",
  "subRegion": "Ex: Médoc",
  "labels": [],
  "tags": []
}

Règles :
- Les cépages doivent totaliser 100%
- Les valeurs de aroma_wheel sont entre 0 et 100, 8 axes obligatoires
- peak_from et peak_to sont des années réalistes
- La robe est un code hex qui représente la couleur du vin
- Sois précis et factuel
- Les arômes en français, typiques de ce vin`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Claude API error', details: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json\s*|```\s*/g, '').trim();
    const enriched = JSON.parse(clean);
    enriched.source = 'ai_generated';

    return res.status(200).json(enriched);
  } catch (err) {
    return res.status(500).json({ error: 'Enrichment failed', message: err.message });
  }
}
