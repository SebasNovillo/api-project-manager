const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes'); // ← Import projects's routes
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


// Rutas
app.use('/api/auth', authRoutes);         // For login and register
app.use('/api/projects', projectRoutes);  // For create and see projects
app.use('/api/tasks', taskRoutes);        // Tasks list

app.get('/', (req, res) => {
  res.send('API Project Manager is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
