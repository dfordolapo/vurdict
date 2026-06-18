import { Router } from 'express';
import { extractContent } from '../services/JinaService.js';
import { evaluatePortfolio } from '../services/GeminiService.js';
import { generateJobId, getJobStatus, setJobProcessing, setJobCompleted, setJobFailed, waitForJobCompletion } from '../services/KVService.js';

const router = Router();

const VALID_GOALS = ['get_hired', 'win_clients'];

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
      return res.status(400).json({
        error: 'Please enter a valid portfolio URL.',
        code: 'INVALID_URL'
      });
    }

    if (!goal || !VALID_GOALS.includes(goal)) {
      return res.status(400).json({
        error: 'Something went wrong while analyzing this portfolio. Please try again.',
        code: 'UNEXPECTED_FAILURE'
      });
    }

    // Strict URL validation and protocol check
    try {
      const parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return res.status(400).json({
          error: 'Please enter a valid portfolio URL.',
          code: 'INVALID_URL'
        });
      }
    } catch {
      return res.status(400).json({
        error: 'Please enter a valid portfolio URL.',
        code: 'INVALID_URL'
      });
    }

    console.log(`[Analyze] Goal: ${goal} | Level: ${experienceLabel} | URL: ${url}`);

    const jobId = generateJobId(url, goal);
    const existingJob = await getJobStatus(jobId);

    if (existingJob) {
      if (existingJob.status === 'completed') {
        console.log(`[Analyze] Returning CACHED report for ${jobId}`);
        return res.json({ success: true, evaluation: existingJob.evaluation });
      } else if (existingJob.status === 'failed') {
        return res.status(400).json(existingJob.errorConfig);
      } else if (existingJob.status === 'processing') {
        console.log(`[Analyze] Job ${jobId} is processing. Polling...`);
        // Wait up to 25 seconds for it to finish
        const finishedJob = await waitForJobCompletion(jobId, 25000);
        
        if (finishedJob && finishedJob.status === 'completed') {
          return res.json({ success: true, evaluation: finishedJob.evaluation });
        } else if (finishedJob && finishedJob.status === 'failed') {
          return res.status(400).json(finishedJob.errorConfig);
        } else {
          // Still processing after 25s, return timeout so frontend can prompt "Try Again"
          return res.status(504).json({
            error: 'Analysis is taking longer than expected. Please wait a moment and try again.',
            code: 'TIMEOUT'
          });
        }
      }
    }

    // New Job: Mark as processing and start
    await setJobProcessing(jobId);

    try {
      // ── Step 1: Extract portfolio content ────────────────────────────────────
      const portfolioContent = await extractContent(url);

      // ── Step 2: Run AI evaluation ────────────────────────────────────────────
      const evaluation = await evaluatePortfolio(goal, experienceLabel, portfolioContent, url);

      // Save to KV
      await setJobCompleted(jobId, evaluation);

      return res.json({ success: true, evaluation });
    } catch (processErr) {
      // If it's our custom structure
      const errorConfig = {
        error: processErr.message || 'Something went wrong.',
        code: processErr.code || 'UNEXPECTED_FAILURE'
      };
      await setJobFailed(jobId, errorConfig);
      throw processErr;
    }

  } catch (err) {
    next(err);
  }
});

export default router;
