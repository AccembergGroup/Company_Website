'use strict';

const { Prisma } = require('@prisma/client');

/**
 * Global Express error handler.
 * Catches any error passed via next(err).
 * Handles Prisma error codes and returns consistent JSON responses.
 */
const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') console.error(err);

  // ── Prisma: unique constraint violation (e.g. duplicate slug) ──────────────
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    const fields = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
    return res.status(409).json({ success: false, message: `Duplicate value: '${fields}' already exists.` });
  }

  // ── Prisma: record not found (update/delete on non-existent row) ───────────
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).json({ success: false, message: err.meta?.cause || 'Record not found.' });
  }

  // ── Prisma: invalid data shape / type mismatch ─────────────────────────────
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({ success: false, message: 'Invalid data provided to the database.' });
  }

  // ── Prisma: connection / initialization error ──────────────────────────────
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(503).json({ success: false, message: 'Database unavailable. Please try again later.' });
  }

  // ── CORS rejection ─────────────────────────────────────────────────────────
  if (err.message?.startsWith('CORS:')) {
    return res.status(403).json({ success: false, message: err.message });
  }

  // ── Malformed JSON body ────────────────────────────────────────────────────
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON in request body.' });
  }

  // ── Generic / unknown ──────────────────────────────────────────────────────
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred.'
      : (err.message || 'Internal server error'),
  });
};

module.exports = errorHandler;
