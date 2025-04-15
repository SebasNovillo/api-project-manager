const express = require('express');
const router = express.Router();
const { createTask, getTasksByProject } = require('../controllers/task.controller');
const authenticate = require('../middlewares/auth.middleware');

router.post('/', authenticate, createTask);
router.get('/project/:id', authenticate, getTasksByProject);


module.exports = router;
