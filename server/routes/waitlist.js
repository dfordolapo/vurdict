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
    // 1. Send notification to admin
    const adminEmail = await resend.emails.send({
      from: 'hello@vurdict.site',
      to: process.env.NOTIFY_EMAIL || 'hellovurdict@gmail.com',
      subject: `New Waitlist Signup: ${normalizedFeature}`,
      html: `<p><strong>Email:</strong> ${normalizedEmail}</p><p><strong>Feature:</strong> ${normalizedFeature}</p><p><strong>Time:</strong> ${new Date().toLocaleString()}</p>`,
    });

    if (adminEmail.error) {
      console.error('[Waitlist] Admin notification failed:', adminEmail.error);
    } else {
      console.log(`[Waitlist] Admin notification sent for: ${normalizedEmail}`);
    }

    // 2. Send confirmation to the user
    const userEmail = await resend.emails.send({
      from: 'Vurdict <hello@vurdict.site>',
      to: normalizedEmail,
      subject: `You're on the list! (${normalizedFeature})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thanks for joining the waitlist!</h2>
          <p>Hi there,</p>
          <p>This is a quick note to confirm that you're officially on the waitlist for <strong>${normalizedFeature === 'general' ? 'Vurdict' : normalizedFeature}</strong>.</p>
          <p>We're working hard behind the scenes and will notify you at this email address as soon as it's ready for you to access.</p>
          <br/>
          <p>Best,</p>
          <p><strong>The Vurdict Team</strong></p>
        </div>
      `,
    });

    if (userEmail.error) {
      console.error('[Waitlist] User confirmation failed:', userEmail.error);
    }

  } catch (err) {
    console.error('[Waitlist] Email sending threw an exception:', err.message);
  }

  res.json({ success: true, message: 'You\'re on the list!' });
});

export default router;
