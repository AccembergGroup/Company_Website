'use strict';

const Contact      = require('../models/Contact');
const emailService = require('../services/emailService');

/**
 * POST /api/v1/contact — public
 *
 * Edge cases handled:
 *   • Duplicate email within 5-minute window → 409 Conflict
 *   • Email delivery failures are fire-and-forget (do not block 201 response)
 */
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // ── Duplicate-submission guard (5-minute window) ──────────────────────────
    const recent = await Contact.findRecentByEmail(email);
    if (recent) {
      return res.status(429).json({
        success: false,
        message:
          'A message from this email address was already received in the last 5 minutes. ' +
          'Please wait before submitting again.',
      });
    }

    // ── Persist ────────────────────────────────────────────────────────────────
    const contact = await Contact.create({ name, email, subject, message });

    // ── Fire-and-forget emails ─────────────────────────────────────────────────
    emailService
      .sendContactNotification(contact)
      .catch((e) => console.error('[email] contact notify:', e.message));

    emailService
      .sendContactAutoReply(contact)
      .catch((e) => console.error('[email] contact auto-reply:', e.message));

    res.status(201).json({ success: true, contactId: contact.id, data: contact });
  } catch (err) {
    next(err);
  }
};
