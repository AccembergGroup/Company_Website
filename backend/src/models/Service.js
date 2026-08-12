'use strict';

const prisma = require('../config/prisma');

/**
 * Service model — wraps all prisma.service.* queries.
 * Fields: title, description, icon, order
 */
const Service = {
  /**
   * Return all services ordered by `order` ascending.
   *
   * @param {object} [where={}] — Prisma where clause
   */
  findAll: (where = {}) =>
    prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    }),
};

module.exports = Service;
