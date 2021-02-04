const express = require('express');
const { placeOrder } = require('../controller/order');
const router = express.Router();
const {require_Signin} = require('../../Common/controller')

router.post('/order',require_Signin, placeOrder)

module.exports = router