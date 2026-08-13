'use strict';

const prisma = require('../config/prisma');

/**
 * Testimonial model — wraps all prisma.testimonial.* queries.
 * Fields: name, role, company, review, rating, avatar, isFeatured, sortOrder
 */
const Testimonial = {
  findAll: (where = {}) =>
    prisma.testimonial.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
    }),

  findById: (id) =>
    prisma.testimonial.findUnique({ where: { id } }),

  create: (data) =>
    prisma.testimonial.create({ data }),

  update: (id, data) =>
    prisma.testimonial.update({ where: { id }, data }),

  delete: (id) =>
    prisma.testimonial.delete({ where: { id } }),
};

module.exports = Testimonial;
