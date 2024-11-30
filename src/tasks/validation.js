const { check } = require("express-validator");

exports.createTaskValidation = () => [
  check("title").isString().isLength({ min: 3, max: 50 }),
  check("description").isString().isLength({ min: 3, max: 100 }),
];

exports.updateTaskValidation = () => [
  check("title").isString().isLength({ min: 3, max: 50 }).optional(),
  check("description").isString().isLength({ min: 3, max: 100 }).optional(),
];