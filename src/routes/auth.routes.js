const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../middlewares/validators');
const validateResult = require('../middlewares/validateResult');

router.post('/register', registerValidator, validateResult, register);
router.post('/login', loginValidator, validateResult, login);

module.exports = router;
