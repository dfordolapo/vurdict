import { Router } from 'express';
import { sendReportByEmail } from '../services/EmailService.js';

const router = Router();

/**
 * POST /api/send-report
 * Body: { email, url, goal, experience, formattedDateTime, report }
 */
router.post('/', async (req, res, next) => {
  try {
    const { email, url, goal, experience, formattedDateTime, report, statusLabel } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!report || !report.overall_score === undefined) {
      return res.status(400).json({ error: 'Invalid report data.' });
    }

    console.log(`[SendReport] Sending to ${email} for ${url}`);

    await sendReportByEmail({
      email,
      url,
      goal,
      experience,
      report,
      statusLabel,
      formattedDateTime,
    });

    console.log(`[SendReport] Sent successfully to ${email}`);

    return res.json({ success: true, message: 'Report sent successfully.' });
  } catch (err) {
    console.error('[SendReport] Failed:', err.message);
    next(err);
  }
});

export default router;
