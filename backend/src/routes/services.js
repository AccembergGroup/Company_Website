'use strict';

const router = require('express').Router();
const ctrl   = require('../controllers/catalogueController');

// GET /api/v1/services — public
router.get('/', ctrl.getServices);

module.exports = router;
