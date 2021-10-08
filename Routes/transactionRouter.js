/* eslint-disable */

const express = require('express');
const {} = require('express-validator');
//const authController = require('./../controller/authController');
const transactionController = require('./../controller/transactionController');

const router = express.Router();


router.post('/transactionDetails', transactionController.transactionDetails); 
router.get('/showTransactionDetails', transactionController.showTransactionDetails);

module.exports = router;
