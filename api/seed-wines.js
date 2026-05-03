// api/seed-wines.js — Seed 109 reference wines into wine_catalog
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const supabaseUrl = process.env.SUPABASE_URL || 'https://mgekvgcshvhhqrzmouex.supabase.co';
  const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZWt2Z2NzaHZoaHFyem1vdWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NTY0NDgsImV4cCI6MjA5MjQzMjQ0OH0.E1t1wcG5kjG7wGyvAROhO8aT5o0CqX-cXMa07TVtQaM';

  if (!supabaseUrl) {
    return res.status(500).json({ error: 'Supabase config missing' });
  }

  try {
    // Load reference wines
    const wines = require('./wines.json');

    // Transform to wine_catalog format
    const rows = wines.map(w => ({
      name: w.name,
      cuvee: w.cuvee || '',
      region: w.region || '',
      appellation: w.appellation || '',
      color: w.color || 'rouge',
      robe: w.robe || '#6B1E2C',
      cepages: (w.cepages || []).map(c => ({ n: c.name, p: c.pct })),
      typical_alcohol: w.alcoholRange ? parseFloat(w.alcoholRange.split('-')[0]) : null,
      typical_price: w.priceRange ? parseFloat(w.priceRange.split('-')[0]) : null,
      peak_from: w.guard ? new Date().getFullYear() + w.guard.from : null,
      peak_to: w.guard ? new Date().getFullYear() + w.guard.to : null,
      aromas: flattenAromas(w.aromas),
      aroma_wheel: w.aromaWheel || {},
      pairings: w.pairings || [],
      service: w.service || {},
      estate: w.estate || {},
    }));

    // Upsert in batches of 20
    let inserted = 0;
    let skipped = 0;
    for (let i = 0; i < rows.length; i += 20) {
      const batch = rows.slice(i, i + 20);
      const response = await fetch(`${supabaseUrl}/rest/v1/wine_catalog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'resolution=ignore-duplicates,return=minimal',
        },
        body: JSON.stringify(batch),
      });

      if (response.ok) {
        inserted += batch.length;
      } else {
        const err = await response.text();
        // Count as skipped (likely duplicates)
        skipped += batch.length;
      }
    }

    return res.status(200).json({
      success: true,
      total: wines.length,
      inserted,
      skipped,
      message: `${inserted} vins ajoutés au catalogue, ${skipped} déjà présents`,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

function flattenAromas(aromas) {
  if (!aromas) return [];
  if (Array.isArray(aromas)) return aromas;
  // Flatten { fruit: [...], floral: [...], ... } → flat array
  return Object.values(aromas).flat();
}
