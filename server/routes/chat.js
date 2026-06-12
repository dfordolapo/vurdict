import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();
const PROVIDER = process.env.AI_PROVIDER || 'openai';
const OPENAI_MODEL = 'gpt-4o-mini';
const GEMINI_MODEL = 'gemini-2.5-flash';
const CLAUDE_MODEL = 'claude-3-5-haiku-latest';
const DEEPSEEK_MODEL = 'deepseek-chat';

const PROVIDER_CONFIG = {
  openai: { key: 'OPENAI_API_KEY', label: 'OpenAI' },
  gemini: { key: 'GEMINI_API_KEY', label: 'Gemini' },
  claude: { key: 'CLAUDE_API_KEY', label: 'Claude' },
  deepseek: { key: 'DEEPSEEK_API_KEY', label: 'DeepSeek' },
};

router.post('/', async (req, res) => {
  const { message, dimension, score, explanation, context, experience, allDimensions, overallScore, priorityActionPlan, fixThisFirst } = req.body;

  if (!message || !dimension) {
    return res.status(400).json({ error: 'Missing chat message or dimension data.' });
  }

  let dimsOverview = '';
  if (allDimensions && allDimensions.length > 0) {
    dimsOverview = allDimensions.map(d => {
      const imp = d.improve && d.improve.length > 0 ? d.improve[0].title : '';
      return `- **${d.label}**: ${d.score}/100${imp ? ` — top improvement: ${imp}` : ''}`;
    }).join('\n');
  } else {
    dimsOverview = `- **${dimension}**: ${score}/100`;
  }

  let topFixesNote = '';
  if (priorityActionPlan && priorityActionPlan.critical_fixes && priorityActionPlan.critical_fixes.length > 0) {
    topFixesNote = '\nHighest priority improvements:\n' +
      priorityActionPlan.critical_fixes.slice(0, 2).map(f => `- ${f.title}`).join('\n');
  }

  let fixFirstNote = '';
  if (fixThisFirst && fixThisFirst.title) {
    fixFirstNote = `\nSingle most important fix: ${fixThisFirst.title}`;
  }

  const cfg = PROVIDER_CONFIG[PROVIDER];
  if (!cfg) {
    return res.status(500).json({ error: `Unknown AI_PROVIDER: ${PROVIDER}` });
  }

  if (!process.env[cfg.key]) {
    return res.json({
      reply: `I'm here as your Co-Pilot, but the server doesn't have ${cfg.key} configured. \n\nHere's a summary of your portfolio:\n\n${dimsOverview}\n\nYou're currently viewing **${dimension}** (${score}/100). Focus on the areas above to level up your portfolio for **${context}**.`
    });
  }

  try {
    const systemInstruction = `You are Vurdict Co-Pilot, the designer's talented, witty, and highly supportive Design Lead Best Friend.
You speak in a friendly, modern design-mentor tone (like a senior colleague chatting over Slack or coffee). You use terms like "hifi", "lofi", "UX writing", "friction", "CTA", and "flows".

The user's portfolio is being reviewed for the "${context}" goal at an experience level of "${experience}".
Overall score: ${overallScore || score}/100.

Here are their scores across all 6 evaluation dimensions:
${dimsOverview}${topFixesNote}${fixFirstNote}

The dimension they are currently viewing is "${dimension}" (${score}/100).

Guidelines:
1. Use the full portfolio context above when answering, not just the current dimension. Cross-reference strengths and weaknesses across dimensions.
2. Explain how their scores make sense based on their goals and experience. Speak honestly but supportively.
3. Structure replies to be highly readable: short paragraphs, bold key terms, bullet lists.
4. Give concrete, creative rewrite options or formatting ideas they can copy-paste directly.
5. If they ask about the current dimension, use it as the entry point but feel free to reference related dimensions.

RESPONSE LENGTH RULES (critical):
- If the user says a simple greeting ("hi", "hey", "hello"), respond with a brief warm greeting (1-2 sentences) and ask if they want help.
- If the user gives short acknowledgments ("okay", "ok", "got it", "thanks", "thank you", "i see", "makes sense", "cool", "nice"), respond with just 1 sentence acknowledging them and leave the door open without pushing more advice.
- If the user says "no", "nah", "not really", "not now", "maybe later", "i'm good", or declines help, respond briefly (1 sentence) saying "No problem at all — I'm here whenever you want to pick this up." Do NOT push advice or suggest next steps.
- If the user asks about something off-topic (weather, news, food, sports, programming, etc.), politely say "I'm your portfolio co-pilot, so I stick to design career advice." and redirect back to their portfolio.
- For substantive questions about their score, improvement, hiring, etc., give detailed, valuable responses with specific advice.
- MATCH the user's energy: if they're brief, be brief. If they ask a detailed question, give a detailed answer.`;

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
        const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
        const response = await anthropic.messages.create({
          model: CLAUDE_MODEL,
          system: systemInstruction,
          messages: [{ role: 'user', content: message }],
          max_tokens: 4096,
          temperature: 0.7,
        });
        text = response.content[0]?.text;
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
    console.error('[Chat Router Error]', err.message);
    res.status(503).json({ fallback: true });
  }
});

export default router;
