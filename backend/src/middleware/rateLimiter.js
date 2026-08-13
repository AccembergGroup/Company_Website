'use strict';

const rateLimit = require('express-rate-limit');

// In the test environment, rate limiters are no-ops so Jest suites never
// exhaust the in-memory counter and receive spurious 429 responses.
const passThrough = (_req, _res, next) => next();

/**
 * General API limiter — 100 requests per 15 minutes per IP.
 * Applied globally to all /api/* routes in app.js.
 */
const generalLimiter = process.env.NODE_ENV === 'test'
  ? passThrough
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: { success: false, message: 'Too many requests — please try again in 15 minutes.' },
    });

/**
 * Strict form limiter — 5 submissions per IP per hour.
 * Applied to POST /contact and POST /book-a-call only.
 */
const formLimiter = process.env.NODE_ENV === 'test'
  ? passThrough
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5,
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false,
      message: { success: false, message: 'Too many submissions from this IP — please try again in 15 minutes.' },
    });

module.exports = { generalLimiter, formLimiter };
