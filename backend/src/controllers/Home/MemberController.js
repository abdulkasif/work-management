const Client = require("../../models/Home/ClientModel.js");
const Member = require("../../models/Home/MemberModel.js");
// Controller function to add a new member
const bcrypt = require("bcryptjs");
const User = require("../../models/UserModel.js");

// Controller function to add a new member
exports.addMember = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, password, designation } = req.body;

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user object with the required fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      designation,
    });

    // Save the user to the database
    await newUser.save();

    // Now, create a new member object and save to the Member model
    const newMember = new Member({
      ...req.body, // Include all other fields that are needed for the Member model
    });

    await newMember.save();

    // Send a success response
    res.status(201).json({
      message: "Member and User added successfully",
      user: newUser,
      member: newMember,
    });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Error adding member", error });
  }
};

exports.getAllMember = async (req, res) => {
  try {
    const members = await Member.find(); // Fetch all members
    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error("Error fetching members:", error); // Log the full error for debugging
    res.status(500).json({
      success: false,
      message: "Can't fetch from database",
      error: error.message || "Unknown error occurred",
    });
  }
};
