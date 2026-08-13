'use strict';

const router = require('express').Router();
const ctrl   = require('../controllers/catalogueController');

// GET /api/v1/partners        — verified only (default, public)
// GET /api/v1/partners?all=true — all partners (unverified included)
router.get('/', ctrl.getPartners);

module.exports = router;
