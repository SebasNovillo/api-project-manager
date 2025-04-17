const { body } = require('express-validator');

const registerValidator = [
  body('email', 'Email is required').notEmpty(),
  body('email', 'Email is not valid').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

const loginValidator = [
  body('email', 'Email is required').notEmpty(),
  body('password', 'Password is required').notEmpty()
];

const projectValidator = [
  body('name', 'Project name is required').notEmpty()
];

const taskValidator = [
  body('title', 'Task title is required').notEmpty(),
  body('projectId', 'Project ID must be a number').isInt()
];

module.exports = {
  registerValidator,
  loginValidator,
  projectValidator,
  taskValidator
};
