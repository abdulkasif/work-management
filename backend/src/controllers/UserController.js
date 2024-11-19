const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');

exports.registerController = async (req, res) => {
    const { name, email, password, designation } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user (storing password in plain text)
        const userDoc = await User.create({
            name,
            email,
            password,  // Store password in plain text (not recommended)
            designation
        });

        res.status(201).json(userDoc);
    } catch (error) {
        res.status(400).json({ msg: 'Error creating user', error });
    }
};

exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const userDoc = await User.findOne({ email });
        if (!userDoc) return res.status(400).json("Invalid credentials");

        // Compare password (not hashing, just plain text comparison)
        if (password === userDoc.password) {
            // Generate JWT token
            const payload = { id: userDoc._id, email: userDoc.email };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;

                // Set token in cookie and send response
                res.cookie('token', token, { httpOnly: true }).json({
                    id: userDoc._id,
                    email: userDoc.email,
                    name: userDoc.name,
                });
            });
        } else {
            res.status(400).json("Invalid credentials");
        }
    } catch (error) {
        res.status(400).json("An error occurred during login");
    }
};

exports.logoutController = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');
        res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).json({ msg: "Error logging out", error });
    }
};
