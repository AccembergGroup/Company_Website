'use strict';

const prisma = require('../config/prisma');

/**
 * BookACall model — wraps all prisma.bookACall.* queries.
 */
const BookACall = {
  create: (data) =>
    prisma.bookACall.create({ data }),

  findAll: ({ where = {}, skip = 0, take = 20 } = {}) =>
    prisma.bookACall.findMany({
      where,
      orderBy: { preferredDate: 'desc' },
      skip,
      take,
    }),

  count: (where = {}) =>
    prisma.bookACall.count({ where }),

  updateStatus: (id, status) =>
    prisma.bookACall.update({ where: { id }, data: { status } }),

  delete: (id) =>
    prisma.bookACall.delete({ where: { id } }),
};

module.exports = BookACall;
