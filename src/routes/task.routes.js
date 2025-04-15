const express = require('express');
const router = express.Router();
const { createTask, getTasksByProject, completeTask } = require('../controllers/task.controller');
const authenticate = require('../middlewares/auth.middleware');

router.post('/', authenticate, createTask);
router.get('/project/:id', authenticate, getTasksByProject);
router.put('/:id', authenticate, completeTask);



module.exports = router;
