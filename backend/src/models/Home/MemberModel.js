const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  designation: {
    type: String,
    enum: ["Member", "Team Lead", "Manager"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
     required: true 
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  pan: {
    type: String,
    required: true,
    unique: true,
  },
  gst: {
    type: String,
    required: true,
  },
  tdsApplicable: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  salaryType: {
    type: String,
    enum: ["Monthly", "Hourly"],
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  employeeType: {
    type: String,
    enum: ["Monthly wise with PF", "Monthly wise with ESI"],
    required: true,
  },
});

module.exports = mongoose.model("Member", memberSchema);
