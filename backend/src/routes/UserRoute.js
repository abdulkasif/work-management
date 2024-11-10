const express = require('express');

const router = express.Router();

const {registerController, loginController, logoutController} = require('../controllers/UserController.js')


// Register Route
router.post('/register', registerController);

// Login Route
router.post('/login', loginController);

router.post('/logout', logoutController);

module.exports = router;
