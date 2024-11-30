const { validationResult } = require("express-validator");
const { ValidationError } = require("../error/commonErrors");

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.formatWith(({ msg }) => msg).array());
  }

  return next();
};

module.exports = validation;