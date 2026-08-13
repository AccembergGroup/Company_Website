'use strict';

const prisma = require('../config/prisma');

/**
 * Partner model — wraps all prisma.partner.* queries.
 * Fields: name, logoUrl, website, isVerified
 */
const Partner = {
  /**
   * Return all partners matching the given filter.
   * By default, returns only verified partners (isVerified: true).
   *
   * @param {object} [where={}] — Prisma where clause
   */
  findAll: (where = {}) =>
    prisma.partner.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    }),
};

module.exports = Partner;
