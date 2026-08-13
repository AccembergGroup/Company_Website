'use strict';

const router          = require('express').Router();
const { body, param } = require('express-validator');
const ctrl            = require('../controllers/faqController');
const validate        = require('../middleware/validate');
const { adminAuth }   = require('../middleware/auth');

const writeRules = [
  body('question').trim().notEmpty().withMessage('Question is required').isLength({ max: 400 }).escape(),
  body('answer')  .trim().notEmpty().withMessage('Answer is required').escape(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];

const idRule = param('id').isUUID().withMessage('Invalid ID format');

router.get('/',    ctrl.getFAQs);
router.get('/:id', [idRule], validate, ctrl.getFAQById);

router.post('/',     adminAuth, writeRules,              validate, ctrl.createFAQ);
router.patch('/:id', adminAuth, [idRule, ...writeRules], validate, ctrl.updateFAQ);
router.delete('/:id', adminAuth, [idRule],               validate, ctrl.deleteFAQ);

module.exports = router;
