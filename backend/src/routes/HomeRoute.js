const express = require("express");
const {
  createClient,
  getAllClient,
  deleteClientById,
} = require("../controllers/Home/CilentController.js");
const {
  addMember,
  getAllMember,
} = require("../controllers/Home/MemberController.js");
const {
  createProject,
  getAllProject,
  deleteProjectById,
} = require("../controllers/Home/ProjectController.js");

const router = express.Router();

//All CLient Routes
router.post("/client", createClient);
router.get("/getclient", getAllClient);
router.delete("/deleteclient/:id", deleteClientById);

//All Member Routes
router.post("/member", addMember);
router.get("/getmember", getAllMember);

//All Project Routes
router.post("/project", createProject);
router.get("/getproject", getAllProject);
router.delete("/deleteproject/:id", deleteProjectById);

module.exports = router;
