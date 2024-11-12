const express = require("express");
const { createClient, getAllClient } = require("../controllers/Home/CilentController.js");
const {
  addMember,
  getAllMember,
} = require("../controllers/Home/MemberController.js");

const router = express.Router();

//All CLient Routes
router.post("/client", createClient);
router.get("/getclient",getAllClient);

//All Member Routes
router.post("/member", addMember);
router.get("/getmember", getAllMember);

module.exports = router;
