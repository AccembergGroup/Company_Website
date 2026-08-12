'use strict';

const prisma = require('./prisma');

/**
 * Verifies the PostgreSQL connection at server startup.
 * Runs a lightweight raw query to confirm Prisma can reach the DB.
 */
async function connectDB() {
  try {
    await prisma.$connect();
    // Quick sanity-check query
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅  PostgreSQL connected via Prisma');
  } catch (err) {
    console.error('❌  Database connection error:', err.message);
    throw err;
  }
}

module.exports = connectDB;
