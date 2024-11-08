const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');
const router = express.Router();

const {registerController, loginController, logoutController} = require('../controllers/UserController.js')


// Register Route
router.post('/register', registerController);

// Login Route
router.post('/login', loginController);

router.post('/logout', logoutController);

module.exports = router;
