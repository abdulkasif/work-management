const express = require('express');
const { createClient, addMember } = require('../controllers/HomeController');

const router = express.Router();

router.post('/client',createClient);

router.post('/member',addMember);

module.exports = router;
