import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import analyzeRouter from './routes/analyze.js';
import sendReportRouter from './routes/send-report.js';
import chatRouter from './routes/chat.js';
import paymentsRouter from './routes/payments.js';
import waitlistRouter from './routes/waitlist.js';
import revurdictRouter from './routes/revurdict-chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// ── Rate Limiter Middleware ─────────────────────────────────────────────────
const rateLimitWindowMs = 15 * 60 * 1000; // 15 minutes
const rateLimitMaxRequests = 20; // 20 requests per window
const ipRequests = new Map();

// Periodic cleanup of rate limiting map memory (skipped in Vercel serverless functions)
if (!process.env.VERCEL) {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipRequests.entries()) {
      if (now - data.windowStart > rateLimitWindowMs) {
        ipRequests.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();

  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, { count: 1, windowStart: now });
    return next();
  }

  const data = ipRequests.get(ip);
  if (now - data.windowStart > rateLimitWindowMs) {
    data.count = 1;
    data.windowStart = now;
    return next();
  }

  if (data.count >= rateLimitMaxRequests) {
    return res.status(429).json({
      error: 'Too many analysis requests from this IP. Please try again in 15 minutes.',
    });
  }

  data.count++;
  next();
}

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin header)
    if (!origin) return callback(null, true);

    try {
      const parsedOrigin = new URL(origin);
      const isLocalhost = parsedOrigin.hostname === 'localhost' || parsedOrigin.hostname === '127.0.0.1';
      const isLocalTunnel = parsedOrigin.hostname.endsWith('.loca.lt') || parsedOrigin.hostname.endsWith('.ngrok-free.app');
      // Allow production domains automatically
      const isProduction = parsedOrigin.hostname === 'vurdict.site' || parsedOrigin.hostname === 'www.vurdict.site';
      // Allow explicitly configured CLIENT_URL(s) — supports comma-separated list
      const allowedOrigins = (process.env.CLIENT_URL || '')
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean);
      const isAllowedProd = allowedOrigins.includes(origin);

      if (isLocalhost || isLocalTunnel || isProduction || isAllowedProd) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    } catch {
      callback(new Error('Invalid CORS origin'));
    }
  },
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ── Serve Client Static Files ───────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../client/dist')));

// ── Routes ──────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/analyze', rateLimiter, analyzeRouter);
app.use('/api/send-report', sendReportRouter);
app.use('/api/chat', rateLimiter, chatRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/waitlist', waitlistRouter);
app.use('/api/revurdict-chat', rateLimiter, revurdictRouter);

// ── Fallback to SPA Router ──────────────────────────────────────────────────
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'client', 'dist', 'index.html');
  res.sendFile(indexPath);
});

// ── Global Error Handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  // Always log the actual stack trace/message internally
  console.error('[Server Error]', err.stack || err.message);

  let message = 'Something went wrong while analyzing this portfolio. Please try again.';
  let code = 'UNEXPECTED_FAILURE';

  if (err.message) {
    if (err.message.includes('JinaTimeout') || err.message.toLowerCase().includes('timeout')) {
      message = 'This portfolio took too long to analyze. Please try again.';
      code = 'TIMEOUT';
    } else if (err.message.includes('JinaNotFound') || err.message.includes('404')) {
      message = 'Please enter a valid portfolio URL.';
      code = 'INVALID_URL';
    } else if (
      err.message.includes('JinaForbidden') ||
      err.message.includes('JinaError') ||
      err.message.includes('forbidden') ||
      err.message.includes('403') ||
      err.message.includes('insufficient content')
    ) {
      message = 'We couldn’t access this portfolio. Check that the link is public and try again.';
      code = 'PRIVATE_PORTFOLIO';
    } else if (
      err.message.includes('GeminiQuotaExceeded') ||
      err.message.toLowerCase().includes('quota') ||
      err.message.toLowerCase().includes('limit') ||
      err.message.includes('429')
    ) {
      message = 'We’re unable to analyze portfolios right now. Please try again later.';
      code = 'ANALYSIS_UNAVAILABLE';
    }
  }

  res.status(err.status || 500).json({
    error: message,
    code: code
  });
});

// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Vurdict server running on http://localhost:${PORT}`);
});

export default app;
