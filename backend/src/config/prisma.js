'use strict';

const { PrismaClient } = require('@prisma/client');

/**
 * Prisma Client singleton.
 * Instantiated once at process startup and shared across all modules.
 * Logs SQL queries in development, errors only in production.
 */
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? [{ emit: 'stdout', level: 'query' }, 'error', 'warn']
    : ['error'],
});

module.exports = prisma;
