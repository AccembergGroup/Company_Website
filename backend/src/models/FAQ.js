'use strict';

const prisma = require('../config/prisma');

/**
 * FAQ model — wraps all prisma.faq.* queries.
 * Fields: question, answer, category, order (sortOrder), isActive (isPublished)
 */
const FAQ = {
  findAll: (where = {}) =>
    prisma.faq.findMany({
      where,
      orderBy: { order: 'asc' },
    }),

  findById: (id) =>
    prisma.faq.findUnique({ where: { id } }),

  create: (data) =>
    prisma.faq.create({ data }),

  update: (id, data) =>
    prisma.faq.update({ where: { id }, data }),

  delete: (id) =>
    prisma.faq.delete({ where: { id } }),
};

module.exports = FAQ;
