'use strict';

const router = require('express').Router();
const { body, param } = require('express-validator');
const ctrl = require('../controllers/bookACallController');
const validate = require('../middleware/validate');
const { adminAuth } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');

const createRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }).escape(),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('company').optional().trim().isLength({ max: 120 }).escape(),
  body('phone').optional().trim().isLength({ max: 30 }).escape(),
  body('preferredDate')
    .optional()
    .isISO8601().withMessage('Date must be ISO 8601 format (YYYY-MM-DD)'),
  body('message').optional().trim().isLength({ max: 2000 }).withMessage('Message must be under 2000 characters').escape(),
];

const idRule = param('id').isUUID().withMessage('Invalid ID format');
const statusRule = body('status')
  .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
  .withMessage('Invalid status value');

router.post('/', formLimiter, createRules, validate, ctrl.createBooking);

router.get('/', adminAuth, ctrl.getBookings);
router.patch('/:id', adminAuth, [idRule, statusRule], validate, ctrl.updateBooking);
router.delete('/:id', adminAuth, [idRule], validate, ctrl.deleteBooking);

module.exports = router;
