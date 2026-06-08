import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();
const MODEL = 'gemini-2.5-flash';

router.post('/', async (req, res) => {
  const { message, dimension, score, explanation, context, experience } = req.body;

  if (!message || !dimension) {
    return res.status(400).json({ error: 'Missing chat message or dimension data.' });
  }

  // Fallback if no API key is present
  if (!process.env.GEMINI_API_KEY) {
    return res.json({
      reply: `I'm here as your Co-Pilot, but the server doesn't have a Gemini API key configured. \n\nHowever, since you scored a **${score}/100** on **${dimension}**, you can improve this by focusing on: \n\n- ${explanation}\n- Calibrate your case studies specifically for: **${context}**.`
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const systemInstruction = `You are Vurdict Co-Pilot, an expert AI Design Mentor helping a product designer improve their portfolio/case studies.
You are assisting them in the context of their "**${dimension}**" evaluation dimension where they scored **${score}/100**.
The user is aiming to: "${context}" at an experience level of "${experience}".
Here is the official feedback they received for this dimension:
"${explanation}"

Guidelines:
1. Provide constructive, direct, and actionable advice to improve this specific score.
2. Give concrete structural examples, rewriting suggestions, or layout ideas.
3. Be professional, encouraging, and clear. Avoid fluff.`;

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
    console.error('[Chat Router Error]', err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

export default router;
