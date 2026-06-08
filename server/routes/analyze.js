import { Router } from 'express';
import { extractContent } from '../services/JinaService.js';
import { evaluatePortfolio } from '../services/GeminiService.js';

const router = Router();

const VALID_GOALS = ['get_hired', 'win_clients', 'improve_portfolio'];

const EXPERIENCE_LABELS = {
  junior: 'Junior',
  mid: 'Mid-Level',
  senior: 'Senior',
};

/**
 * POST /api/analyze
 * Body: { url: string, goal: GoalType, experience?: 'junior' | 'mid' | 'senior' }
 */
router.post('/', async (req, res, next) => {
  try {
    const { url, goal, experience } = req.body;
    const experienceLabel = EXPERIENCE_LABELS[experience] || 'Mid-Level';

    // ── Validation ──────────────────────────────────────────────────────────
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'A valid portfolio URL is required.' });
    }

    if (!goal || !VALID_GOALS.includes(goal)) {
      return res.status(400).json({
        error: `A valid goal is required. Must be one of: ${VALID_GOALS.join(', ')}.`,
      });
    }

    // Basic URL format check
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'The provided URL is not valid.' });
    }

    console.log(`[Analyze] Goal: ${goal} | Level: ${experienceLabel} | URL: ${url}`);

    // ── Step 1: Extract portfolio content ────────────────────────────────────
    const portfolioContent = await extractContent(url);

    // ── Step 2: Run AI evaluation ────────────────────────────────────────────
    const evaluation = await evaluatePortfolio(goal, experienceLabel, portfolioContent);

    return res.json({ success: true, evaluation });
  } catch (err) {
    next(err);
  }
});

export default router;
