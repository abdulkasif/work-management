const Project = require("../../models/Home/ProjectModel"); // Adjust the path if needed

// Create a new project
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (e.g., projectId already exists)
      res.status(400).json({ error: "Project ID already exists" });
    } else {
      res.status(500).json({ error: "Failed to create project" });
    }
  }
};



module.exports = {
  createProject
 
};
