// api/scan.js — Analyze wine label photo with Claude Haiku Vision (cheapest model)
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

  // Short, efficient prompt to minimize tokens
  const prompt = `Lis cette étiquette de vin. Réponds UNIQUEMENT en JSON valide, sans markdown :
{"name":"Domaine/Château","cuvee":"Cuvée ou null","vintage":2020,"region":"Bordeaux|Bourgogne|Rhône|Loire|Alsace|Champagne|Languedoc|Provence|Sud-Ouest|Beaujolais|Jura|Savoie|Corse ou pays","appellation":"AOC/AOP complète","color":"rouge|blanc|rosé|effervescent|liquoreux","alcohol":13.5,"classification":"GCC/1erCru/etc ou null","notes":"autres infos visibles"}
Ne mets que ce qui est lisible. null si absent.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        // Haiku = $1 input / $5 output per MTok (4x cheaper than Sonnet)
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
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
    const clean = text.replace(/```json\s*|```\s*/g, '').trim();
    const result = JSON.parse(clean);
    result.source = 'ai_vision';

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Scan failed', message: err.message });
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};
