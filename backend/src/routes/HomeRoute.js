const express = require("express");
const {
  createClient,
  getAllClient,
  deleteClientById,
  updateClientById,
} = require("../controllers/Home/CilentController.js");
const {
  addMember,
  getAllMember,
  deleteMemberById,
  updateMemberById,
  getMemberById,
} = require("../controllers/Home/MemberController.js");
const {
  createProject,
  getAllProject,
  deleteProjectById,
  updateProjectById,
  getProjectById,
} = require("../controllers/Home/ProjectController.js");

const router = express.Router();

//All CLient Routes
router.post("/client", createClient);
router.get("/getclient", getAllClient);
router.delete("/deleteclient/:id", deleteClientById);
router.put("/editclient/:id", updateClientById);
//All Member Routes
router.post("/member", addMember);
router.get("/getmember", getAllMember);
router.get("/getmemberbyid/:id", getMemberById);
router.delete("/deletemember/:id", deleteMemberById);
router.put("/editmember/:id", updateMemberById);

//All Project Routes
router.post("/project", createProject);
router.get("/getproject", getAllProject);
router.get("/getprojectbyid/:id", getProjectById);
router.delete("/deleteproject/:id", deleteProjectById);
router.put("/editproject/:id", updateProjectById);

module.exports = router;
