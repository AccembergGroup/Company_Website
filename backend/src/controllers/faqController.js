'use strict';

const FAQ = require('../models/FAQ');

/* GET /api/v1/faq ─ public */
exports.getFAQs = async (req, res, next) => {
  try {
    const where = { isActive: true };
    const data = await FAQ.findAll(where);
    res.json({ success: true, data, total: data.length });
  } catch (err) {
    next(err);
  }
};

/* GET /api/v1/faq/:id ─ public */
exports.getFAQById = async (req, res, next) => {
  try {
    const doc = await FAQ.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'FAQ not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

/* POST /api/v1/faq ─ admin */
exports.createFAQ = async (req, res, next) => {
  try {
    const { question, answer, order, isActive } = req.body;
    const doc = await FAQ.create({ question, answer, order, isActive });
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

/* PATCH /api/v1/faq/:id ─ admin */
exports.updateFAQ = async (req, res, next) => {
  try {
    const { question, answer, order, isActive } = req.body;
    const doc = await FAQ.update(req.params.id, { question, answer, order, isActive });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/v1/faq/:id ─ admin */
exports.deleteFAQ = async (req, res, next) => {
  try {
    await FAQ.delete(req.params.id);
    res.json({ success: true, message: 'FAQ deleted.' });
  } catch (err) {
    next(err);
  }
};
