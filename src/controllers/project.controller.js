const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProject = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.userId;
  
    console.log("Request to create project:", { name, userId }); // 👈 Agregado
  
    try {
      const newProject = await prisma.project.create({
        data: {
          name,
          ownerId: userId,
        },
      });
  
      res.status(201).json({ message: 'Project created', project: newProject });
    } catch (error) {
      console.error("❌ Error creating project:", error); // 👈 Agregado
      res.status(500).json({ error: 'Error creating project' });
    }
  };
  

const getMyProjects = async (req, res) => {
  const userId = req.user.userId;

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
    });

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
};

module.exports = { createProject, getMyProjects };
