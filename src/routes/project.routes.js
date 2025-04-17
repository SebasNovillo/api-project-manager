const express = require('express');
const router = express.Router();
const { createProject, getMyProjects } = require('../controllers/project.controller');
const authenticate = require('../middlewares/auth.middleware');
const { projectValidator } = require('../middlewares/validators');
const validateResult = require('../middlewares/validateResult');
const isAdmin = require('../middlewares/isAdmin');


// Todas las rutas están protegidas con JWT
router.post('/', authenticate, projectValidator, validateResult, createProject);
router.get('/', authenticate, getMyProjects);
router.get('/admin-check', authenticate, isAdmin, (req, res) => {
    res.json({ message: 'Welcome, admin! 🔐' });
  });
  

module.exports = router;
