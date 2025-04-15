const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTask = async (req, res) => {
  const { title, projectId } = req.body;
  const userId = req.user.userId;

  try {
    // Verificamos que el proyecto pertenezca al usuario
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.ownerId !== userId) {
      return res.status(403).json({ error: 'Access denied to this project' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        projectId,
      },
    });

    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

const getTasksByProject = async (req, res) => {
    const projectId = parseInt(req.params.id);
    const userId = req.user.userId;
  
    try {
      // Verificamos que el proyecto le pertenezca al usuario
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
  
      if (!project || project.ownerId !== userId) {
        return res.status(403).json({ error: 'Access denied to this project' });
      }
  
      const tasks = await prisma.task.findMany({
        where: { projectId },
      });
  
      res.status(200).json({ tasks });
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  };
  
  module.exports = {
    createTask,
    getTasksByProject,
  };
  