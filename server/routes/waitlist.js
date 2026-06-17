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

    // Define dynamic descriptions for the email
    let featureName = normalizedFeature === 'general' ? 'Vurdict Early Access' : normalizedFeature;
    let featureDescription = "We are building the ultimate suite of tools to give product designers objective, goal-aware portfolio feedback.";
    
    if (normalizedFeature.includes('re:vurdict')) {
      featureName = "Re:Vurdict";
      featureDescription = "Re:Vurdict is your AI design co-pilot that not only reviews your portfolio but helps you rewrite and fix it in real-time to meet hiring standards.";
    } else if (normalizedFeature.includes('example')) {
      featureName = "Example Case Studies";
      featureDescription = "You'll get access to a curated library of high-scoring portfolio case studies across different seniority levels to inspire your next update.";
    } else if (normalizedFeature.includes('co-pilot')) {
      featureName = "Vurdict Co-Pilot";
      featureDescription = "The Vurdict Co-Pilot will assist you in real-time as you write your case studies, ensuring you hit every metric hiring managers look for.";
    }

    // 2. Send confirmation to the user
    const userEmail = await resend.emails.send({
      from: 'Vurdict <hello@vurdict.site>',
      to: normalizedEmail,
      subject: `You're on the list! (${featureName})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 40px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #172554; padding: 32px 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Vurdict</h1>
          </div>
          <div style="padding: 32px 24px; background-color: #ffffff;">
            <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 600;">You're on the list.</h2>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
              Hi there, <br><br>
              You are officially on the waitlist for <strong>${featureName}</strong>. 
            </p>
            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
              <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6;">
                ${featureDescription}
              </p>
            </div>
            <p style="color: #475569; font-size: 15px; line-height: 1.6;">
              We're building this specifically to help product designers like you get hired faster. We will send you an exclusive update as soon as it's ready.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
            <p style="color: #94a3b8; font-size: 13px; text-align: center; margin: 0;">
              The Vurdict Team<br>
              <a href="https://vurdict.site" style="color: #3b82f6; text-decoration: none; margin-top: 4px; display: inline-block;">vurdict.site</a>
            </p>
          </div>
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
