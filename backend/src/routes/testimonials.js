'use strict';

const router          = require('express').Router();
const { body, param } = require('express-validator');
const ctrl            = require('../controllers/testimonialController');
const validate        = require('../middleware/validate');
const { adminAuth }   = require('../middleware/auth');

const writeRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }).escape(),
  body('role').optional().trim().isLength({ max: 150 }).escape(),
  body('company').optional().trim().isLength({ max: 120 }).escape(),
  body('review').trim().notEmpty().withMessage('Review content is required').escape(),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be 1–5'),
  body('avatar').optional().trim().isURL().withMessage('Must be a valid URL'),
  body('isFeatured').optional().isBoolean(),
  body('sortOrder').optional().isInt({ min: 0 }),
];

const idRule = param('id').isUUID().withMessage('Invalid ID format');

// Public
router.get('/',    ctrl.getTestimonials);
router.get('/:id', [idRule], validate, ctrl.getTestimonialById);

// Admin
router.post('/',     adminAuth, writeRules, validate, ctrl.createTestimonial);
router.patch('/:id', adminAuth, [idRule, ...writeRules], validate, ctrl.updateTestimonial);
router.delete('/:id', adminAuth, [idRule], validate, ctrl.deleteTestimonial);

module.exports = router;
