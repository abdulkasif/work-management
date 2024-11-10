const Client = require("../models/Home/ClientModel.js"); 
const Member = require("../models/Home/MemberModel.js");
// Controller function to add a new member
const bcrypt = require('bcryptjs');
const User = require("../models/UserModel.js");


// Controller to add a new client
exports.createClient = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      clientId,
      clientName,
      firstName,
      lastName,
      email,
      phone,
      address,
      country,
      currency,
      paymentTerms
      
    } = req.body;

    // Create a new client instance
    const newClient = new Client({
      clientId,
      clientName,
      firstName,
      lastName,
      email,
      phone,
      address,
      country,
      currency,
      paymentTerms
      
    });

    // Save the client to the database
    const savedClient = await newClient.save();

    // Send a success response
    res.status(201).json({
      message: "Client added successfully",
      client: savedClient
    });
  } catch (error) {
    // Handle errors and send a failure response
    if (error.code === 11000) {
      // Duplicate key error (e.g., duplicate clientId or email)
      res.status(400).json({ message: "Client ID or email already exists" });
    } else {
      res.status(500).json({ message: "Error adding client", error });
    }
  }
};


 // Assuming you have a User model

// Controller function to add a new member
exports.addMember = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the incoming request body

    // Extract data from the request body
    const { name, email, password, designation } = req.body;

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user object with the required fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,  // Store the hashed password
      designation
    });

    // Save the user to the database
    await newUser.save();

    // Now, create a new member object and save to the Member model
    const newMember = new Member({
      ...req.body,  // Include all other fields that are needed for the Member model
    });

    await newMember.save();

    // Send a success response
    res.status(201).json({
      message: "Member and User added successfully",
      user: newUser,
      member: newMember
    });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Error adding member", error });
  }
};







