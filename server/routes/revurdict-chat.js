import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

const router = Router();
const PROVIDER = process.env.AI_PROVIDER || 'openai';
const OPENAI_MODEL = 'gpt-4o-mini';
const GEMINI_MODEL = 'gemini-2.5-flash';
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';
const DEEPSEEK_MODEL = 'deepseek-chat';

const PROVIDER_CONFIG = {
  openai: { key: 'OPENAI_API_KEY', label: 'OpenAI' },
  gemini: { key: 'GEMINI_API_KEY', label: 'Gemini' },
  claude: { key: 'CLAUDE_API_KEY', label: 'Claude' },
  deepseek: { key: 'DEEPSEEK_API_KEY', label: 'DeepSeek' },
  evolink: { key: 'EVOLINK_API_KEY', label: 'Evolink' },
};

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing chat message.' });
  }

  const cfg = PROVIDER_CONFIG[PROVIDER];
  if (!cfg) {
    return res.status(500).json({ error: `Unknown AI_PROVIDER: ${PROVIDER}` });
  }

  if (!process.env[cfg.key]) {
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

    switch (PROVIDER) {
      case 'gemini': {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: message,
          config: { systemInstruction, temperature: 0.7 },
        });
        text = response.text;
        break;
      }
      case 'claude': {
        const client = new OpenAI({
          apiKey: process.env.CLAUDE_API_KEY,
          baseURL: 'https://api.evolink.ai/v1',
        });
        const response = await client.chat.completions.create({
          model: CLAUDE_MODEL,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: message },
          ],
          temperature: 0.7,
        });
        text = response.choices[0]?.message?.content;
        break;
      }
      case 'deepseek': {
        const deepseek = new OpenAI({
          apiKey: process.env.DEEPSEEK_API_KEY,
          baseURL: 'https://api.deepseek.com',
        });
        const response = await deepseek.chat.completions.create({
          model: DEEPSEEK_MODEL,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: message },
          ],
          temperature: 0.7,
        });
        text = response.choices[0]?.message?.content;
        break;
      }
      case 'evolink': {
        const client = new OpenAI({
          apiKey: process.env.EVOLINK_API_KEY,
          baseURL: 'https://api.evolink.ai/v1',
        });
        const response = await client.chat.completions.create({
          model: CLAUDE_MODEL,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: message },
          ],
          temperature: 0.7,
        });
        text = response.choices[0]?.message?.content;
        break;
      }
      default: {
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
    }

    if (!text) {
      return res.status(500).json({ error: `${cfg.label} returned an empty response.` });
    }
    res.json({ reply: text });
  } catch (err) {
    console.error('[Re:Vurdict Chat Error]', err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

export default router;
