'use strict';

const express             = require('express');
const cors                = require('cors');
const helmet              = require('helmet');
const morgan              = require('morgan');

const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler        = require('./middleware/errorHandler');
const routes              = require('./routes');

const app = express();

/* ── Security Headers ─────────────────────────────────────────────────────── */
app.use(helmet());

/* ── CORS ──────────────────────────────────────────────────────────────────── */
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Allow curl / Postman / server-to-server (no Origin header)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin "${origin}" is not allowed`));
    },
    methods:        ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
    credentials:    true,
  }),
);

/* ── Body Parsing ──────────────────────────────────────────────────────────── */
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

/* ── Request Logging ───────────────────────────────────────────────────────── */
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

/* ── Global Rate Limiter (100 req / 15 min per IP) ────────────────────────── */
app.use('/api', generalLimiter);

/* ── API Routes ────────────────────────────────────────────────────────────── */
app.use('/api/v1', routes);
app.use('/api', routes);

/* ── Root Route ────────────────────────────────────────────────────────────── */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Accemberg Corporate REST API. Please use /api/testimonials or /api/faqs, or visit the main website at http://localhost:3000'
  });
});

/* ── 404 ───────────────────────────────────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

/* ── Global Error Handler ──────────────────────────────────────────────────── */
app.use(errorHandler);

module.exports = app;
