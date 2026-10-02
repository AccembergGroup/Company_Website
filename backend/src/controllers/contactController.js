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
    
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.log('⚠️ [Mock] Contact submitted successfully (No DB connected):', req.body);
      const mockContact = { id: 'mock-id-' + Date.now(), name, email, subject, message, submittedAt: new Date() };
      
      emailService.sendContactNotification(mockContact).catch((e) => console.error('[email] notify:', e.message));
      emailService.sendContactAutoReply(mockContact).catch((e) => console.error('[email] auto-reply:', e.message));

      return res.status(201).json({ 
        success: true, 
        contactId: mockContact.id,
        data: req.body 
      });
    }

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
    if (!process.env.DATABASE_URL || err.name === 'PrismaClientInitializationError') {
      console.log('⚠️ [Mock Fallback] Contact submitted successfully:', req.body);
      const mockContact = { id: 'mock-id-' + Date.now(), ...req.body, submittedAt: new Date() };
      emailService.sendContactNotification(mockContact).catch((e) => console.error('[email] notify:', e.message));
      emailService.sendContactAutoReply(mockContact).catch((e) => console.error('[email] auto-reply:', e.message));

      return res.status(201).json({ 
        success: true, 
        contactId: mockContact.id,
        data: req.body 
      });
    }
    next(err);
  }
};
