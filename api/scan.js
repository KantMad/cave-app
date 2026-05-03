// api/scan.js — Analyze wine label photo with Claude Vision
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

  const { image } = req.body;
  if (!image) return res.status(400).json({ error: 'image (base64) is required' });

  let mediaType = 'image/jpeg';
  let base64Data = image;
  if (image.startsWith('data:')) {
    const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (match) { mediaType = match[1]; base64Data = match[2]; }
  }

  // Prompt optimisé : LIRE uniquement, pas deviner
  const prompt = `Lis cette étiquette de vin et extrais UNIQUEMENT les informations visibles.

RÈGLES :
- Lis EXACTEMENT ce qui est écrit, ne corrige pas l'orthographe
- "name" = le PRODUCTEUR/DOMAINE/CHÂTEAU (souvent en haut ou en gros)
- "cuvee" = le nom de la CUVÉE si différent du producteur. null si absent
- "vintage" = l'ANNÉE en 4 chiffres. Cherche partout sur l'étiquette. null si introuvable
- "appellation" = l'AOC/AOP (cherche "Appellation ... Contrôlée/Protégée"). Copie exactement
- "alcohol" = le degré exact (cherche "% vol" ou "°"). Nombre décimal. null si pas trouvé
- "classification" = Grand Cru, Premier Cru, Cru Classé, Cru Bourgeois... null si absent
- "color" = déduis depuis la couleur visible de la bouteille/étiquette : rouge, blanc, rosé, effervescent, liquoreux
- "region" = déduis depuis l'appellation. UTILISE EXACTEMENT un de ces noms : Bordeaux, Bourgogne, Rhône, Loire, Alsace, Champagne, Languedoc, Provence, Sud-Ouest, Beaujolais, Jura, Savoie, Corse
- "notes" = autres infos visibles : bio, récoltant, mise en bouteille au château, contenance, etc.

Réponds UNIQUEMENT en JSON valide, sans markdown ni backticks :
{"name":"...","cuvee":null,"vintage":2020,"appellation":"...","alcohol":13.0,"classification":null,"color":"rouge","region":"...","notes":"..."}`;

  // Try up to 2 times (retry on JSON parse failure)
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64Data } },
              { type: 'text', text: prompt },
            ],
          }],
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        return res.status(500).json({ error: 'Claude API error', details: err });
      }

      const data = await response.json();
      const text = data.content?.[0]?.text || '';
      // Robust JSON extraction
      let clean = text.replace(/```json\s*|```\s*/g, '').trim();
      // Try to find JSON object in the response
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        if (attempt === 0) continue; // retry
        return res.status(500).json({ error: 'No JSON found in Vision response', raw: text.slice(0, 200) });
      }
      const result = JSON.parse(jsonMatch[0]);
      
      // Normalize region: "Vallée du Rhône" → "Rhône", "Languedoc-Roussillon" → "Languedoc"
      if (result.region) {
        const regionMap = {
          'vallée du rhône': 'Rhône', 'vallee du rhone': 'Rhône', 'côtes du rhône': 'Rhône',
          'languedoc-roussillon': 'Languedoc', 'languedoc roussillon': 'Languedoc',
          'val de loire': 'Loire', 'vallée de la loire': 'Loire',
        };
        const lower = result.region.toLowerCase();
        if (regionMap[lower]) result.region = regionMap[lower];
      }
      
      result.source = 'ai_vision';
      return res.status(200).json(result);
    } catch (err) {
      if (attempt === 0) continue; // retry on parse error
      return res.status(500).json({ error: 'Scan failed', message: err.message });
    }
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};
