const Client = require("../../models/Home/ClientModel.js"); 
const Member = require("../../models/Home/MemberModel.js");
// Controller function to add a new member
const bcrypt = require('bcryptjs');
const User = require("../../models/UserModel.js");


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


//Fetching all the client details from the databasee

exports.getAllClient = async (req,res) => {
  try {
    
    const clients = await Client.find();

    res.status(200).json({
      success: true,
      data: clients,
    })
    
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Clients cannot be fetched",
      error: error.message,
     })
  }
}








