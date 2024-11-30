const { check } = require("express-validator");

exports.registerValidation = () => [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").isLength({ min: 6 }),
  check("name", "Name is required").isLength({ min: 3 }),
];

exports.loginValidation = () => [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").isLength({ min: 6 }),
];
