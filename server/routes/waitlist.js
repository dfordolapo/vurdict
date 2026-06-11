import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

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

router.post('/', (req, res) => {
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

  console.log(`[Waitlist] New signup: ${email} (${feature || 'general'})`);

  res.json({ success: true, message: 'You\'re on the list!' });
});

export default router;
