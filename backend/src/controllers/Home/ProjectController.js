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


const getAllProject = async (req,res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      data: projects,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      mesaage: "Project details are not found",
      error: error.message
    })
    
  }
}

const deleteProjectById = async (req,res) => {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if(!deletedProject){
      return res.status(404).json({
        success: false,
        message: "Project is not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
      data: deletedProject
    })
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete client',
    });
    
  }
}
module.exports = {
  createProject,
  getAllProject,
  deleteProjectById,
};
