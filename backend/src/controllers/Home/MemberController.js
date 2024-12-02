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
    

    // Now, create a new member object and save to the Member model
    const newMember = new Member({
      ...req.body, // Include all other fields that are needed for the Member model
    });

    await newMember.save();

    // Create a new user object with the required fields
    const newUser = new User({
      name,
      email,
      password, // Store the hashed password
      designation,
      memberId: newMember._id
    });

    // Save the user to the database
    await newUser.save();

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

exports.getMemberById = async (req,res) => {
  try{
    const memberId = req.params.id;

    const memberData = await Member.findById(memberId);
    
    if (!memberData) {
      return res.status(404).json({success: false, message: "Member can't be found"});
    }

    res.status(200).json({
      success: true,
      message: "MemberData fetched successfully",
      data: memberData
    })

  }catch(error){
    res.status(500).json({
      success: false,
      message: "internal error happened",
      error: error.message
    })

  }
}




exports.deleteMemberById = async (req, res) => {
  try {
    const memberID = req.params.id;
    const { email } = req.body; // Extract the email from the request body

    // Assuming you are using email to identify the member for deletion
    const deletedMember = await Member.findByIdAndDelete(memberID);
    const deletedUser = await User.findOneAndDelete({memberId: memberID});

    if (!deletedMember) {
      return res.status(404).json({ success: false, message: 'Member not found or email mismatch' });
    }

    

    res.status(200).json({
      success: true,
      message: 'Member deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete member',
    });
  }
};

exports.updateMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const updateData = req.body;

    // Find the member by ID to get the associated email
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    // Update the member info
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Prepare update data for the User model
    const userUpdateData = {
      name: updateData.name || member.name,
      email: updateData.email || member.email,
      designation: updateData.designation || member.designation,
      password: updateData.password || member.password,
    };

    // Update the corresponding user
    const updatedUser = await User.findOneAndUpdate(
      { email: member.email }, // Match the user's email
      { $set: userUpdateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User associated with the member not found',
      });
    }

    // Send a success response
    res.status(200).json({
      success: true,
      message: 'Member and User updated successfully',
      member: updatedMember,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update member and user',
      error: error.message || 'Unknown error occurred',
    });
  }
};
