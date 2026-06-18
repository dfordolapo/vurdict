import { Router } from 'express';
import { verifyTransaction } from '../services/PaystackService.js';
import { Resend } from 'resend';

const router = Router();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    // Payment is verified, send email confirmation instantly if we have an email
    if (result.customerEmail && resend) {
      try {
        await resend.emails.send({
          from: 'Vurdict <hello@vurdict.site>',
          to: result.customerEmail,
          subject: 'Vurdict Full Dimension Report - Receipt',
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 40px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="background-color: #172554; padding: 32px 24px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Vurdict</h1>
              </div>
              <div style="padding: 32px 24px; background-color: #ffffff;">
                <h2 style="color: #0f172a; margin-top: 0;">Payment Successful</h2>
                <p style="color: #475569; line-height: 1.6;">
                  Thank you for unlocking the Full Dimension Report! You now have lifetime access to the detailed breakdown of your portfolio across all 6 evaluation dimensions.
                </p>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 24px 0;">
                  <p style="margin: 0 0 8px; font-size: 14px; color: #64748b;">Receipt / Reference</p>
                  <p style="margin: 0; font-family: monospace; font-size: 16px; color: #0f172a; font-weight: bold;">${reference}</p>
                </div>
                <p style="color: #94a3b8; font-size: 13px; text-align: center; margin-top: 32px;">
                  The Vurdict Team<br>
                  vurdict.site
                </p>
              </div>
            </div>
          `
        });
        console.log(`[Payments] Confirmation email sent to ${result.customerEmail}`);
      } catch (emailErr) {
        console.error('[Payments] Failed to send confirmation email:', emailErr);
      }
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
