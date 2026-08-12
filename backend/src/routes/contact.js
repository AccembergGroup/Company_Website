'use strict';

const router             = require('express').Router();
const { body }           = require('express-validator');
const ctrl               = require('../controllers/contactController');
const validate           = require('../middleware/validate');
const { formLimiter }    = require('../middleware/rateLimiter');

/**
 * Validation rules for contact form submissions.
 * Mirrors the Contact Prisma model constraints exactly.
 */
const writeRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('A valid email address is required')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters')
    .escape(),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape(),
];

// POST /api/v1/contact — public, rate-limited
router.post('/', formLimiter, writeRules, validate, ctrl.createContact);

module.exports = router;
