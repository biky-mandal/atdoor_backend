const express = require('express');
const { placeOrder, codPlaceOrder, fetchCODOrders, fetchOrders } = require('../controller/order');
const router = express.Router();
const {require_Signin} = require('../../Common/controller')

router.post('/order',require_Signin, placeOrder)
router.post('/codorder', require_Signin, codPlaceOrder)
router.post('/fetchcodorders', require_Signin, fetchCODOrders)
router.post('/fetchorders', require_Signin, fetchOrders)

module.exports = router