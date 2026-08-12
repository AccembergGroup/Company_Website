'use strict';

/**
 * Simple API-key guard for admin-only routes.
 * Pass the key in the request header: `x-api-key: <value>`
 *
 * Generate a key with:
 *   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */
const adminAuth = (req, res, next) => {
  const key    = req.headers['x-api-key'];
  const secret = process.env.ADMIN_API_KEY;

  // Fail-closed: if env var is not set, refuse all admin requests
  if (!secret) {
    console.error('[auth] ADMIN_API_KEY is not set in environment variables.');
    return res.status(500).json({ success: false, message: 'Server misconfiguration — contact administrator.' });
  }

  if (!key || key !== secret) {
    return res.status(401).json({ success: false, message: 'Unauthorized — invalid or missing x-api-key header.' });
  }

  next();
};

module.exports = { adminAuth };
