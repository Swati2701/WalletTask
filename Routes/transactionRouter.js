/* eslint-disable */

const express = require('express');
const transactionController = require('./../controller/transactionController');

const router = express.Router();


router.post('/transactionDetails', transactionController.transactionDetails); 
router.get('/showTransactionDetails', transactionController.showTransactionDetails);

module.exports = router;
