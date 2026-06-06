import { Router } from 'express';
import { extractContent } from '../services/JinaService.js';
import { evaluatePortfolio } from '../services/ClaudeService.js';

const router = Router();

const VALID_GOALS = ['get_hired', 'win_clients'];

/**
 * POST /api/analyze
 * Body: { url: string, goal: 'get_hired' | 'win_clients' }
 */
router.post('/', async (req, res, next) => {
  try {
    const { url, goal } = req.body;

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

    console.log(`[Analyze] Goal: ${goal} | URL: ${url}`);

    // ── Step 1: Extract portfolio content ────────────────────────────────────
    const portfolioContent = await extractContent(url);

    // ── Step 2: Run AI evaluation ────────────────────────────────────────────
    const evaluation = await evaluatePortfolio(goal, portfolioContent);

    return res.json({ success: true, evaluation });
  } catch (err) {
    next(err);
  }
});

export default router;
