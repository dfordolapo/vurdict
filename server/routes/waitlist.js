import { Router } from 'express';
import { Resend } from 'resend';
import { kv } from '@vercel/kv';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { email, feature } = req.body;
  const normalizedEmail = email?.toLowerCase().trim();
  const normalizedFeature = (feature || 'general').toLowerCase().trim();

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const key = `waitlist:${normalizedFeature}`;

  try {
    const added = await kv.sadd(key, normalizedEmail);
    if (added === 0) {
      return res.json({ success: true, message: 'Already on the waitlist.' });
    }
  } catch (err) {
    console.error('[Waitlist] KV error:', err.message);
    return res.status(503).json({ error: 'Storage unavailable. Try again later.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'hello@vurdict.site',
      to: process.env.NOTIFY_EMAIL || 'hellovurdict@gmail.com',
      subject: `New Waitlist Signup: ${normalizedFeature}`,
      html: `<p><strong>Email:</strong> ${normalizedEmail}</p><p><strong>Feature:</strong> ${normalizedFeature}</p><p><strong>Time:</strong> ${new Date().toLocaleString()}</p>`,
    });

    if (error) {
      console.error('[Waitlist] Email notification failed:', error);
    } else {
      console.log(`[Waitlist] Notification sent for: ${normalizedEmail} (id: ${data?.id})`);
    }
  } catch (err) {
    console.error('[Waitlist] Email notification threw an exception:', err.message);
  }

  res.json({ success: true, message: 'You\'re on the list!' });
});

export default router;
