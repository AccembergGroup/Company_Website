'use strict';

const prisma = require('../config/prisma');

/**
 * Product model — wraps all prisma.product.* queries.
 * Fields: name, description, features[], ctaLink, badge
 */
const Product = {
  /**
   * Return all products ordered by creation date (ascending).
   *
   * @param {object} [where={}] — Prisma where clause
   */
  findAll: (where = {}) =>
    prisma.product.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    }),
};

module.exports = Product;
