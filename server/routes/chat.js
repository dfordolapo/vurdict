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

    const systemInstruction = `You are Vurdict Co-Pilot, the designer's talented, witty, and highly supportive Design Lead Best Friend. 
You speak in a friendly, modern design-mentor tone (like a senior colleague chatting over Slack or coffee). You use terms like "hifi", "lofi", "UX writing", "friction", "CTA", and "flows".
You are helping them review their "**${dimension}**" dimension (they scored **${score}/100**).
Their goal is to "${context}" at an experience level of "${experience}".
The exact feedback Vurdict gave them for this is: "${explanation}".

Guidelines:
1. Explain how their score makes sense based on their goals and experience. Speak honestly but supportively—be their biggest cheerleader while helping them level up.
2. Structure your replies to be highly readable: use short paragraphs, bold key terms, and bullet lists.
3. Reference the Vurdict evaluation framework when answering (e.g. Structural Logic, Critical Thinking, Visual Execution, Impact Evidence, Narrative Tone, Positioning Clarity).
4. Give concrete, creative rewrite options or formatting ideas they can copy and paste directly into their case studies.`;

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
