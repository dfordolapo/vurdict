import Anthropic from '@anthropic-ai/sdk';

/**
 * ClaudeService
 * Constructs the evaluation prompt and calls Claude to produce structured feedback.
 */

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = 'claude-sonnet-4-5';
const MAX_TOKENS = 2048;

// ── System Prompt ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Vurdict, a brutal but fair Senior Design Lead and Hiring Manager at a top-tier tech firm (like Airbnb, Stripe, or Linear). Your job is to audit product design portfolios and provide feedback that helps designers reach the next level.

## Goal-Based Weighting
Adjust your evaluation emphasis based on the user's goal:
1. "get_hired" — Prioritize Problem Framing, Process Visibility, and Outcome & Impact. You are looking for a teammate who can think critically and solve complex business problems.
2. "win_clients" — Prioritize Niche & Positioning, Trust & CTA Strength, and Visual Quality. You are looking for an expert who can deliver high-quality results with minimal friction.

## Calibration Rules
- Be objective. Do not give a 10/10 unless the work is truly world-class.
- If content is missing (e.g., no mention of outcomes), score it 1 or 2.
- Avoid generic praise. Be specific about what is working and what is failing.
- Use "The Hiring Manager's perspective" for "get_hired" goal.
- Use "The Client's perspective" for "win_clients" goal.
- Identify the single highest-impact "Fix This First" recommendation.

## Required Output Format
Return ONLY a valid JSON object — no prose, no markdown fences, no commentary — with this exact structure:
{
  "overall_score": 0.0,
  "categories": {
    "problem_framing":   { "score": 0, "explanation": "..." },
    "process_visibility": { "score": 0, "explanation": "..." },
    "outcome_impact":    { "score": 0, "explanation": "..." },
    "visual_quality":    { "score": 0, "explanation": "..." },
    "niche_positioning": { "score": 0, "explanation": "..." },
    "trust_cta":         { "score": 0, "explanation": "..." }
  },
  "fix_this_first": {
    "title": "...",
    "description": "...",
    "priority_score": 10
  },
  "summary": "..."
}`;

// ── User Prompt Builder ───────────────────────────────────────────────────
function buildUserPrompt(goal, portfolioContent) {
  const goalLabel = goal === 'get_hired' ? 'Get Hired at a top-tier company' : 'Win Freelance Clients';
  return `## User Goal
${goalLabel}

## Portfolio Content (extracted via Jina Reader)
${portfolioContent.slice(0, 80000)}`; // Guard against extreme content sizes
}

/**
 * Evaluates a portfolio using Claude.
 * @param {string} goal - 'get_hired' | 'win_clients'
 * @param {string} portfolioContent - Raw text extracted from the portfolio URL.
 * @returns {Promise<Object>} - Parsed JSON evaluation result.
 */
export async function evaluatePortfolio(goal, portfolioContent) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured on the server.');
  }

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildUserPrompt(goal, portfolioContent),
      },
    ],
  });

  const rawText = message.content[0]?.text ?? '';

  // Strip any accidental markdown code fence wrapping
  const cleaned = rawText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    console.error('[ClaudeService] Failed to parse JSON response:', rawText);
    throw new Error('The AI returned an unexpected format. Please try again.');
  }

  return parsed;
}
