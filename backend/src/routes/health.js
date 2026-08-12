'use strict';

const router = require('express').Router();
const prisma  = require('../config/prisma');

/**
 * GET /api/v1/health
 * Verifies server and database are alive. Used by uptime monitors.
 */
router.get('/', async (req, res) => {
  let db = 'error';
  try {
    await prisma.$queryRaw`SELECT 1`;
    db = 'connected';
  } catch { /* leave as error */ }

  res.status(db === 'connected' ? 200 : 503).json({
    success:   db === 'connected',
    status:    db === 'connected' ? 'ok' : 'degraded',
    db,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
