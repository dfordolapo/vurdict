import { GoogleGenAI } from '@google/genai';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load structured output schema
const schemaPath = join(__dirname, '../ai_response_schema.json');
const responseSchema = JSON.parse(readFileSync(schemaPath, 'utf8'));

const MODEL = 'gemini-2.5-flash';

// ── System Prompt ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Vurdict, a brutal but fair Senior Design Lead and Hiring Manager at a top-tier tech firm (like Airbnb, Stripe, or Linear). Your job is to audit product design portfolios and provide feedback that helps designers reach the next level.

## Goal-Based Weighting
Adjust your evaluation emphasis based on the user's goal:
1. "get_hired" — Prioritize Problem Framing, Process Visibility, and Outcome & Impact. You are looking for a teammate who can think critically and solve complex business problems.
2. "win_clients" — Prioritize Niche & Positioning, Trust & CTA Strength, and Visual Quality. You are looking for an expert who can deliver high-quality results with minimal friction.
3. "improve_portfolio" — Prioritize Visual Quality, Process Visibility, and Outcome & Impact. You are looking for general portfolio quality and areas with the most growth potential.

## Experience Level Calibration
Adjust expectations and tone based on the designer's experience level:
- "Junior" — Evaluate for foundational skills: basic design process, ability to take feedback, understanding of core UX principles. Be constructive and focus on growth areas rather than harsh criticism. A score of 65-75 is strong for this level.
- "Mid-Level" — Evaluate for independent execution: solid process, clear outcomes, good visual taste. Hold to industry-standard expectations. A score of 70-80 is strong for this level.
- "Senior" — Evaluate for leadership: strategic thinking, mentorship signals, business impact, systems thinking. Apply the highest rigor. A score of 80+ is excellent for this level.

## Calibration Rules
- Be objective. Do not give a 10/10 unless the work is truly world-class.
- If content is missing (e.g., no mention of outcomes), score it 1 or 2.
- Avoid generic praise. Be specific about what is working and what is failing.
- Use "The Hiring Manager's perspective" for "get_hired" goal.
- Use "The Client's perspective" for "win_clients" goal.
- Use "The Reviewer's perspective" for "improve_portfolio" goal.
- Identify the single highest-impact "Fix This First" recommendation.`;

// ── User Prompt Builder ───────────────────────────────────────────────────
function buildUserPrompt(goal, experienceLabel, portfolioContent) {
  const goalLabels = {
    get_hired: 'Get Hired at a top-tier company',
    win_clients: 'Win Freelance Clients',
    improve_portfolio: 'Improve Portfolio Quality',
  };
  const goalLabel = goalLabels[goal] || 'Improve Portfolio Quality';
  return `## User Goal
${goalLabel}

## Experience Level
${experienceLabel}

## Portfolio Content (extracted via Jina Reader)
${portfolioContent.slice(0, 500000)}`; // Read the full page of the portfolio
}

/**
 * Evaluates a portfolio using Gemini with built-in retry logic.
 * @param {string} goal - 'get_hired' | 'win_clients' | 'improve_portfolio'
 * @param {string} experienceLabel - 'Junior' | 'Mid-Level' | 'Senior'
 * @param {string} portfolioContent - Raw text extracted from the portfolio URL.
 * @returns {Promise<Object>} - Parsed JSON evaluation result.
 */
export async function evaluatePortfolio(goal, experienceLabel, portfolioContent) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: buildUserPrompt(goal, experienceLabel, portfolioContent),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });

      const rawText = response.text;
      return JSON.parse(rawText);
    } catch (err) {
      attempt++;
      console.warn(`[GeminiService] Attempt ${attempt} failed: ${err.message}`);
      
      if (attempt >= maxRetries) {
        let cleanMsg = err.message;
        try {
          const parsedErr = JSON.parse(err.message);
          cleanMsg = parsedErr.error?.message || cleanMsg;
        } catch {}
        throw new Error(cleanMsg || 'Gemini service is currently unavailable. Please try again.');
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, attempt * 1500));
    }
  }
}
