const Client = require("../../models/Home/ClientModel.js");
const Member = require("../../models/Home/MemberModel.js");
// Controller function to add a new member
const bcrypt = require("bcryptjs");
const User = require("../../models/UserModel.js");

// Controller to add a new client
exports.createClient = async (req, res) => {
  try {
    // Extract data from the request body

    // Create a new client instance
    const newClient = new Client(req.body);

    // Save the client to the database
    const savedClient = await newClient.save();

    // Send a success response
    res.status(201).json({
      message: "Client added successfully",
      client: savedClient,
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

exports.getAllClient = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Clients cannot be fetched",
      error: error.message,
    });
  }
};

exports.deleteClientById = async (req, res) => {
  try {
    const clientId = req.params.id; // Get client ID from request parameters

    const deletedClient = await Client.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      data: deletedClient,
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete client",
    });
  }
};

exports.updateClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const updateData = req.body;

    const updatedData = await Client.findByIdAndUpdate(
      clientId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Client is not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Client is updated",
      data: updatedData,
    })
  } catch (error) {
    console.error("Error ..", error);
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "invalid data provided",
        error: error.message,
      });
    }else{
      res.status(500).json({
        success: false,
        message: "cannot update client",
        error: error.message,
      })
    }
  }
};
