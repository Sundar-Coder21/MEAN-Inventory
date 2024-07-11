const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../helpers/auth'); 


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update', authenticateUser, userController.updateUser);

module.exports = router;