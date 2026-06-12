import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

const router = Router();
const PROVIDER = process.env.AI_PROVIDER || 'openai';
const OPENAI_MODEL = 'gpt-4o-mini';
const GEMINI_MODEL = 'gemini-2.5-flash';

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing chat message.' });
  }

  const missingKey = PROVIDER === 'gemini' ? 'GEMINI_API_KEY' : 'OPENAI_API_KEY';
  if (!process.env[missingKey]) {
    return res.json({
      reply: "Hey there! I'm Re:Vurdict, your AI portfolio coach. It looks like the server doesn't have the API key configured — so I can't give you personalized feedback right now. Once that's set up, I'll be ready to help you refine your case studies, sharpen your positioning, and get job-ready!"
    });
  }

  try {
    const systemInstruction = `You are Re:Vurdict, a friendly, conversational AI portfolio coach that helps designers improve their case studies, positioning, and job readiness through chat.

Guidelines:
1. Speak in a warm, encouraging mentor tone — like a senior designer giving honest but supportive feedback over coffee.
2. Keep replies readable: short paragraphs, bold key terms, and bullet lists where helpful.
3. Give concrete, actionable advice — rewrite ideas, formatting suggestions, or strategic tips they can apply directly.
4. Focus on portfolio-specific topics: case study narratives, visual storytelling, UX thinking, impact evidence, and personal brand positioning.`;

    let text;

    if (PROVIDER === 'gemini') {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: message,
        config: { systemInstruction, temperature: 0.7 },
      });
      text = response.text;
    } else {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      });
      text = response.choices[0]?.message?.content;
    }

    if (!text) {
      return res.status(500).json({ error: `${PROVIDER === 'gemini' ? 'Gemini' : 'OpenAI'} returned an empty response.` });
    }
    res.json({ reply: text });
  } catch (err) {
    console.error('[Re:Vurdict Chat Error]', err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

export default router;
