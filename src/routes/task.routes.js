const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasksByProject,
  completeTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/task.controller');

const authenticate = require('../middlewares/auth.middleware');
const { taskValidator } = require('../middlewares/validators');
const validateResult = require('../middlewares/validateResult');

router.post('/', authenticate, taskValidator, validateResult, createTask);
router.get('/project/:id', authenticate, getTasksByProject);
router.put('/:id', authenticate, completeTask);
router.put('/:id/status', authenticate, updateTaskStatus);
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
