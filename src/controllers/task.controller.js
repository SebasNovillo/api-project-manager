const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Task
const createTask = async (req, res) => {
  const { title, projectId, status } = req.body;
  const userId = req.user.userId;

  try {
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
        status: status || 'todo',
      },
    });

    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

// Get Tasks by Project
const getTasksByProject = async (req, res) => {
  const projectId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
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

// Complete Task
const completeTask = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.project.ownerId !== userId) {
      return res.status(403).json({ error: 'Access denied to this task' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed: true },
    });

    res.status(200).json({ message: 'Task marked as completed', task: updatedTask });
  } catch (error) {
    console.error("❌ Error completing task:", error);
    res.status(500).json({ error: 'Error completing task' });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.project.ownerId !== userId) {
      return res.status(403).json({ error: 'Access denied to this task' });
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};

// Update Task Status (for drag and drop)
const updateTaskStatus = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { status } = req.body;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.project.ownerId !== userId) {
      return res.status(403).json({ error: 'Access denied to this task' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    res.status(200).json({ message: 'Task status updated', task: updatedTask });
  } catch (error) {
    console.error("❌ Error updating task status:", error);
    res.status(500).json({ error: 'Error updating task status' });
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  completeTask,
  deleteTask,
  updateTaskStatus,
};
