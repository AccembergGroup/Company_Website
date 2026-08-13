'use strict';


const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const prisma = require('../config/prisma');

// ─── helpers ─────────────────────────────────────────────────────────────────

const TAG = '[cron]';

function log(level, msg) {
  const ts = new Date().toISOString();
  console[level](`${ts}  ${TAG}  ${msg}`);
}

/** Ensure a directory exists, creating it recursively if needed. */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ─── job 1 — database keep-alive (every 4 minutes) ───────────────────────────

/**
 * Supabase's transaction-mode pooler closes idle connections after ~5 minutes.
 * This lightweight ping keeps at least one connection warm so the first real
 * request after a quiet period is never delayed by a reconnect.
 */
function startKeepAlive() {
  cron.schedule('*/4 * * * *', async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      log('info', '✅  keep-alive ping OK');
    } catch (err) {
      log('error', `❌  keep-alive ping failed: ${err.message}`);
    }
  });

  log('info', '🕐  Keep-alive job registered  (every 4 min)');
}

// ─── job 2 — nightly JSON backup (02:00 UTC every day) ───────────────────────

/**
 * Exports every table as a JSON file into  <repo_root>/backups/YYYY-MM-DD/ .
 * On Supabase Free / Pro, point-in-time recovery (PITR) is also available
 * from the dashboard — this job provides an additional application-level snapshot.
 */
async function runBackup() {
  const date = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  const backupDir = path.resolve(__dirname, '../../../../backups', date);
  ensureDir(backupDir);

  const tables = {
    contacts: () => prisma.contact.findMany(),
    book_a_calls: () => prisma.bookACall.findMany(),
    testimonials: () => prisma.testimonial.findMany(),
    faqs: () => prisma.faq.findMany(),
    partners: () => prisma.partner.findMany(),
    services: () => prisma.service.findMany(),
    products: () => prisma.product.findMany(),
  };

  let totalRows = 0;
  for (const [tableName, queryFn] of Object.entries(tables)) {
    try {
      const rows = await queryFn();
      const file = path.join(backupDir, `${tableName}.json`);
      fs.writeFileSync(file, JSON.stringify(rows, null, 2), 'utf8');
      totalRows += rows.length;
      log('info', `   📦  ${tableName}: ${rows.length} rows → ${file}`);
    } catch (err) {
      log('error', `   ❌  backup failed for ${tableName}: ${err.message}`);
    }
  }

  // Write a manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    date,
    tables: Object.keys(tables),
    totalRows,
  };
  fs.writeFileSync(
    path.join(backupDir, '_manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  log('info', `✅  Backup complete — ${totalRows} total rows → ${backupDir}`);
}

function startBackupJob() {
  // Run at 02:00 UTC every day
  cron.schedule('0 2 * * *', async () => {
    log('info', '📂  Starting nightly backup…');
    await runBackup();
  }, { timezone: 'UTC' });

  log('info', '🕐  Backup job registered  (daily 02:00 UTC)');
}

// ─── job 3 — cleanup stale cancelled bookings (Sundays 03:00 UTC) ────────────

/**
 * Hard-deletes BookACall rows that have been in "cancelled" status for more
 * than 90 days to prevent the table growing indefinitely.
 * Adjust the retention period via CANCELLED_BOOKING_RETENTION_DAYS in .env.
 */
async function runCleanup() {
  const retentionDays = parseInt(process.env.CANCELLED_BOOKING_RETENTION_DAYS || '90', 10);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retentionDays);

  try {
    const result = await prisma.bookACall.deleteMany({
      where: {
        status: 'cancelled',
        updatedAt: { lt: cutoff },
      },
    });
    log('info', `🧹  Cleanup: deleted ${result.count} stale cancelled booking(s) older than ${retentionDays} days`);
  } catch (err) {
    log('error', `❌  Cleanup job failed: ${err.message}`);
  }
}

function startCleanupJob() {
  // Run at 03:00 UTC every Sunday (weekday = 0)
  cron.schedule('0 3 * * 0', async () => {
    log('info', '🧹  Starting weekly stale-booking cleanup…');
    await runCleanup();
  }, { timezone: 'UTC' });

  log('info', '🕐  Cleanup job registered  (Sundays 03:00 UTC)');
}

// ─── public API ──────────────────────────────────────────────────────────────

/**
 * Registers and starts all cron jobs.
 * Call once from server.js after the database connection is established.
 */
function startCronJobs() {
  log('info', '⚙️   Initialising scheduled jobs…');
  startKeepAlive();
  startBackupJob();
  startCleanupJob();
  log('info', '✅  All cron jobs active.');
}

/**
 * Expose individual runners so they can be triggered manually from admin
 * routes or tests without waiting for the schedule.
 */
module.exports = {
  startCronJobs,
  runBackup,
  runCleanup,
};
