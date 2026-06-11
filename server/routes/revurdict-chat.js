import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();
const MODEL = 'gemini-2.5-flash';

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing chat message.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      reply: "Hey there! I'm Re:Vurdict, your AI portfolio coach. It looks like the server doesn't have a Gemini API key configured yet — so I can't give you personalized feedback right now. Once that's set up, I'll be ready to help you refine your case studies, sharpen your positioning, and get job-ready!"
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const systemInstruction = `You are Re:Vurdict, a friendly, conversational AI portfolio coach that helps designers improve their case studies, positioning, and job readiness through chat.

Guidelines:
1. Speak in a warm, encouraging mentor tone — like a senior designer giving honest but supportive feedback over coffee.
2. Keep replies readable: short paragraphs, bold key terms, and bullet lists where helpful.
3. Give concrete, actionable advice — rewrite ideas, formatting suggestions, or strategic tips they can apply directly.
4. Focus on portfolio-specific topics: case study narratives, visual storytelling, UX thinking, impact evidence, and personal brand positioning.`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error('[Re:Vurdict Chat Error]', err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

export default router;
