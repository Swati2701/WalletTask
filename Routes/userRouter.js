/* eslint-disable */

const express = require('express');
const {} = require('express-validator');
//const authController = require('./../controller/authController');
const userController = require('./../controller/userController');

const router = express.Router();


router.post('/signup', userController.signup); 
router.post('/login', userController.login);
router.get('/signout', userController.signOut);

module.exports = router;
