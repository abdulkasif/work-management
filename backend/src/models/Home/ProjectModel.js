const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true // Ensures each Project ID is unique
  },
  client: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true,
    min: 1 // Assuming each project has at least one page
  },
  inputType: {
    type: String,
    enum: ["Physical", "Digital"], // Limits input type to these options
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0 // Ensures cost is a non-negative value
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Export the model
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
