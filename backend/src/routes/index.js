'use strict';

const router = require('express').Router();

router.use('/health',       require('./health'));
router.use('/testimonials', require('./testimonials'));
router.use('/testimonial',  require('./testimonials'));
router.use('/faq',          require('./faq'));
router.use('/faqs',         require('./faq'));
router.use('/book-a-call',  require('./bookACall'));
router.use('/contact',      require('./contact'));
router.use('/services',     require('./services'));
router.use('/products',     require('./products'));
router.use('/partners',     require('./partners'));

module.exports = router;
