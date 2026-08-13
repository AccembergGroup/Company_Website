'use strict';

const prisma = require('../config/prisma');

/**
 * Contact model — wraps all prisma.contact.* queries.
 * Fields: name, email, subject, message, submittedAt
 */
const Contact = {
  /**
   * Create a new contact form submission.
   * @param {{ name: string, email: string, subject: string, message: string }} data
   */
  create: (data) =>
    prisma.contact.create({ data }),

  /**
   * Find the most recent submission from a given email within the last `windowMs`
   * milliseconds. Used for duplicate-submission guard in the controller.
   *
   * @param {string} email
   * @param {number} [windowMs=300_000] — default 5 minutes
   */
  findRecentByEmail: (email, windowMs = 5 * 60 * 1000) =>
    prisma.contact.findFirst({
      where: {
        email,
        submittedAt: { gte: new Date(Date.now() - windowMs) },
      },
      orderBy: { submittedAt: 'desc' },
    }),
};

module.exports = Contact;
