import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();
const MODEL = 'gpt-4o-mini';

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing chat message.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.json({
      reply: "Hey there! I'm Re:Vurdict, your AI portfolio coach. It looks like the server doesn't have an OpenAI API key configured yet — so I can't give you personalized feedback right now. Once that's set up, I'll be ready to help you refine your case studies, sharpen your positioning, and get job-ready!"
    });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemInstruction = `You are Re:Vurdict, a friendly, conversational AI portfolio coach that helps designers improve their case studies, positioning, and job readiness through chat.

Guidelines:
1. Speak in a warm, encouraging mentor tone — like a senior designer giving honest but supportive feedback over coffee.
2. Keep replies readable: short paragraphs, bold key terms, and bullet lists where helpful.
3. Give concrete, actionable advice — rewrite ideas, formatting suggestions, or strategic tips they can apply directly.
4. Focus on portfolio-specific topics: case study narratives, visual storytelling, UX thinking, impact evidence, and personal brand positioning.`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: 'OpenAI returned an empty response.' });
    }
    res.json({ reply: text });
  } catch (err) {
    console.error('[Re:Vurdict Chat Error]', err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

export default router;
