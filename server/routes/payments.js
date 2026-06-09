import { Router } from 'express';
import { verifyTransaction } from '../services/PaystackService.js';

const router = Router();

router.post('/verify', async (req, res, next) => {
  try {
    const { reference } = req.body;

    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({ error: 'Transaction reference is required.' });
    }

    const result = await verifyTransaction(reference);

    if (!result.verified) {
      return res.status(200).json({ verified: false, status: result.status });
    }

    return res.json({
      verified: true,
      amount: result.amount,
      currency: result.currency,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
