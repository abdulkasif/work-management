const Member = require("../../models/Home/MemberModel");
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

const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mesaage: "Project details are not found",
      error: error.message,
    });
  }
};


const getProjectById = async (req,res) => {
  try{
    const projectId = req.params.id;

    const ProjectData = await Project.findById(projectId);
    
    if (!ProjectData) {
      res.status(404).json({success: false, message: "Project can't be found"});
    }

    res.status(200).json({
      success: true,
      message: "ProjectData fetched successfully",
      data: ProjectData
    })

  }catch(error){
    res.status(500).json({
      success: false,
      message: "internal error happened",
      error: error.message
    })

  }
}





const deleteProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project is not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete client",
    });
  }
};

const updateProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updateData = req.body;

    // Fetch the existing project data
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project cannot be found",
      });
    }

      // Handle assignedMembers updates
      if (updateData.assignedMembers && Array.isArray(updateData.assignedMembers)) {
        const currentMembers = existingProject.assignedMembers.map(String); // Convert ObjectId to string for comparison
        const newMembers = updateData.assignedMembers;
  
        // Members to add (checked members that are not in the current list)
        const membersToAdd = newMembers.filter(memberId => !currentMembers.includes(memberId));
  
        // Members to remove (unchecked members that are currently assigned)
        const membersToRemove = currentMembers.filter(memberId => !newMembers.includes(memberId));
  
        // Add project reference to newly assigned members (add projectId to their assignedProjects array)
        await Promise.all(
          membersToAdd.map(memberId =>
            Member.findByIdAndUpdate(
              memberId,
              { $addToSet: { assignedProject: projectId } },  // Ensure no duplicate project assignments
              { new: true }
            )
          )
        );
  
        // Remove project reference from members who are removed (remove projectId from their assignedProjects array)
        await Promise.all(
          membersToRemove.map(memberId =>
            Member.findByIdAndUpdate(
              memberId,
              { $pull: { assignedProject: projectId } },  // Remove projectId from the array
              { new: true }
            )
          )
        );
  
        // Update the project's assignedMembers array
        updateData.assignedMembers = newMembers;
      }

    // Update the project
    const updatedData = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Project is updated",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error..", error);
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error in updating...",
        error: error.message,
      });
    }
  }
};
module.exports = {
  createProject,
  getAllProject,
  getProjectById,
  deleteProjectById,
  updateProjectById,
};
