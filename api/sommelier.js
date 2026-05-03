// api/sommelier.js — AI sommelier conversationnel
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

  const { question, cave } = req.body;
  if (!question) return res.status(400).json({ error: 'question is required' });

  // Build cave context (compact)
  let caveContext = '';
  if (cave && cave.length > 0) {
    caveContext = `\n\nVoici la cave de l'utilisateur (${cave.length} vins) :\n` +
      cave.slice(0, 30).map(b =>
        `- ${b.name}${b.cuvee ? ' ' + b.cuvee : ''} ${b.vintage || ''} (${b.region || ''}, ${b.color || ''}) ×${b.quantity || 1}${b.peakFrom ? ' garde:' + b.peakFrom + '-' + b.peakTo : ''}`
      ).join('\n');
  }

  const systemPrompt = `Tu es un sommelier expert, chaleureux et pédagogue. Tu parles français.
Tu réponds de manière concise mais précise. Tu donnes des conseils pratiques.
Tu connais tous les vins, cépages, appellations, accords mets-vins, millésimes, terroirs.
Si l'utilisateur a des bouteilles dans sa cave, propose-lui des vins de SA cave quand c'est pertinent.
Sois conversationnel, pas encyclopédique. 2-3 paragraphes max.${caveContext}`;

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
        max_tokens: 600,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'API error', details: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    return res.status(200).json({ answer: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
