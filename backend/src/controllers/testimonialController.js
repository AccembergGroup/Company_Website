'use strict';

const Testimonial = require('../models/Testimonial');

/* GET /api/v1/testimonials ─ public */
exports.getTestimonials = async (req, res, next) => {
  try {
    const where = { isActive: true };
    if (req.query.featured === 'true') where.isFeatured = true;

    const data = await Testimonial.findAll(where);
    res.json({ success: true, data, total: data.length });
  } catch (err) {
    next(err);
  }
};

/* GET /api/v1/testimonials/:id ─ public */
exports.getTestimonialById = async (req, res, next) => {
  try {
    const doc = await Testimonial.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

/* POST /api/v1/testimonials ─ admin */
exports.createTestimonial = async (req, res, next) => {
  try {
    const { name, role, company, review, rating, avatar, isFeatured, sortOrder } = req.body;
    const doc = await Testimonial.create({ name, role, company, review, rating, avatar, isFeatured, sortOrder });
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

/* PATCH /api/v1/testimonials/:id ─ admin */
exports.updateTestimonial = async (req, res, next) => {
  try {
    const { name, role, company, review, rating, avatar, isFeatured, sortOrder } = req.body;
    const doc = await Testimonial.update(req.params.id, { name, role, company, review, rating, avatar, isFeatured, sortOrder });
    res.json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/v1/testimonials/:id ─ admin */
exports.deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.delete(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted.' });
  } catch (err) {
    next(err);
  }
};
