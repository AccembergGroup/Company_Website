'use strict';

const Service = require('../models/Service');
const Product = require('../models/Product');
const Partner = require('../models/Partner');

/* ── GET /api/v1/services ─────────────────────────────────────────────────── */

/**
 * Returns all services ordered by `order` ascending.
 * Public — no authentication required.
 */
exports.getServices = async (req, res, next) => {
  try {
    const data = await Service.findAll();
    res.json({ success: true, data, total: data.length });
  } catch (err) {
    next(err);
  }
};

/* ── GET /api/v1/products ─────────────────────────────────────────────────── */

/**
 * Returns all products ordered by creation date ascending.
 * Public — no authentication required.
 */
exports.getProducts = async (req, res, next) => {
  try {
    const data = await Product.findAll();
    res.json({ success: true, data, total: data.length });
  } catch (err) {
    next(err);
  }
};

/* ── GET /api/v1/partners ─────────────────────────────────────────────────── */

/**
 * Returns partners. Defaults to verified-only (isVerified: true).
 * Pass ?all=true (admin context) to include unverified entries.
 * Public — no authentication required for verified view.
 */
exports.getPartners = async (req, res, next) => {
  try {
    // Default: only verified partners for the public-facing website.
    // ?all=true returns everything (useful for internal admin tooling without
    // exposing a separate authenticated route for a simple read).
    const where = req.query.all === 'true' ? {} : { isVerified: true };
    const data  = await Partner.findAll(where);
    res.json({ success: true, data, total: data.length });
  } catch (err) {
    next(err);
  }
};
