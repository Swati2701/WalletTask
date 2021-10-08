/* eslint-disable */

const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const router = express.Router();


router.post('/signup', userController.signup); 
router.post('/login', userController.login);
router.get('/signout', userController.signOut);
router.get('/welcome', authController, userController.welcome);
module.exports = router;
