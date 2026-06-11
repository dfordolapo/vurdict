import { Router } from 'express';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

const resend = new Resend(process.env.RESEND_API_KEY);
const STORAGE_PATH = path.join(__dirname, '..', 'waitlist-emails.json');

function readEmails() {
  try {
    if (fs.existsSync(STORAGE_PATH)) {
      return JSON.parse(fs.readFileSync(STORAGE_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('[Waitlist] Error reading storage:', err.message);
  }
  return [];
}

function writeEmails(emails) {
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(emails, null, 2), 'utf-8');
}

router.post('/', async (req, res) => {
  const { email, feature } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const emails = readEmails();

  if (emails.some((e) => e.email === email)) {
    return res.json({ success: true, message: 'Already on the waitlist.' });
  }

  emails.push({
    email,
    feature: feature || 'general',
    subscribed_at: new Date().toISOString(),
  });

  writeEmails(emails);

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'reports@vurdict.vercel.app',
      to: process.env.NOTIFY_EMAIL || 'hellovurdict@gmail.com',
      subject: `New Waitlist Signup: ${feature || 'general'}`,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Feature:</strong> ${feature || 'general'}</p><p><strong>Time:</strong> ${new Date().toLocaleString()}</p>`,
    });
    console.log(`[Waitlist] Notification sent for: ${email}`);
  } catch (err) {
    console.error('[Waitlist] Email notification failed:', err.message);
  }

  res.json({ success: true, message: 'You\'re on the list!' });
});

export default router;
