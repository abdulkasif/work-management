const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true, // Ensures each Project ID is unique
    },
    clientId: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
      min: 1, // Assuming each project has at least one page
    },
    inputType: {
      type: String,
      enum: ["Physical", "Digital"], // Limits input type to these options
      required: true,
    },
    complexity: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    receivedDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    clientCost: {
      type: Number,
      required: true,
      min: 0, // Ensures cost is a non-negative value
    },
    outsourceCost: {
      type: Number,
      required: true,
      min: 0, // Ensures cost is a non-negative value
    },
    productionCost: {
      type: Number,
      required: true,
      min: 0, // Ensures cost is a non-negative value
    },
    description: {
      type: String,
      default: "", // Optional field for project details
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending", // Default project status
    },
    assignedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member", // Reference to the Member model
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the model
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
