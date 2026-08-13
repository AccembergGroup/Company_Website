'use strict';

// Load app environment configuration
require('dotenv').config({ override: true });

const app              = require('./src/app');
const connectDB        = require('./src/config/db');
const { startCronJobs } = require('./src/services/cronService');

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  // Attempt DB connection — non-fatal in dev so the server always starts
  try {
    await connectDB();
  } catch (err) {
    console.warn('⚠️   DB unavailable — server starting without database. API routes requiring DB will return 503.');
  }

  // Start scheduled background jobs (keep-alive, backup, cleanup)
  try { startCronJobs(); } catch (_) {}

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀  Accemberg API  →  http://localhost:${PORT}/api`);
    console.log(`   Network      →  http://192.168.1.33:${PORT}/api`);
    console.log(`   Environment  : ${process.env.NODE_ENV || 'development'}\n`);
  });

  // Graceful shutdown on SIGTERM / SIGINT (Docker, Ctrl+C)
  const shutdown = (signal) => {
    console.log(`\n${signal} received — shutting down gracefully…`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  console.error('Fatal: failed to start server\n', err);
  process.exit(1);
});
