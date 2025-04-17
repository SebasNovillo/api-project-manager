const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorList = errors.array().map(err => err.msg);
    return res.status(400).json({ errors: errorList });
  }

  next();
};

module.exports = validateResult;
