const express = require('express');
const router = express.Router();
const { createProject, getMyProjects } = require('../controllers/project.controller');
const authenticate = require('../middlewares/auth.middleware');

// Todas las rutas están protegidas con JWT
router.post('/', authenticate, createProject);
router.get('/', authenticate, getMyProjects);

module.exports = router;
