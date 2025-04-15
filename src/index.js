const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes'); // ← Importamos las rutas de proyectos
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


// Rutas
app.use('/api/auth', authRoutes);         // Para login y register
app.use('/api/projects', projectRoutes);  // Para crear y ver proyectos
app.use('/api/tasks', taskRoutes);        // Lista de tareas

app.get('/', (req, res) => {
  res.send('API Project Manager is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
