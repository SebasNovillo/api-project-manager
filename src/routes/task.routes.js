const express = require('express');
const router = express.Router();
const { createTask, getTasksByProject, completeTask, deleteTask } = require('../controllers/task.controller');
const authenticate = require('../middlewares/auth.middleware');

router.post('/', authenticate, createTask);
router.get('/project/:id', authenticate, getTasksByProject);
router.put('/:id', authenticate, completeTask);
router.delete('/:id', authenticate, deleteTask);



module.exports = router;
