'use strict';

const { validationResult } = require('express-validator');

/**
 * Runs express-validator checks accumulated in the route handler chain.
 * Returns 400 + structured error array on failure.
 * Place this AFTER your body()/param() validator arrays in route definitions.
 *
 * @example
 * router.post('/', [body('email').isEmail(), validate], controller.create)
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = validate;
