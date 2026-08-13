'use strict';

const router = require('express').Router();
const ctrl   = require('../controllers/catalogueController');

// GET /api/v1/products — public
router.get('/', ctrl.getProducts);

module.exports = router;
