const express = require('express');
const { require_Signin } = require('../../Common/controller');
const { add_item_to_cart, remove_item_from_cart } = require('../controller/cart');

const router = express.Router();

router.post('/user/cart/add', require_Signin, add_item_to_cart);
router.post('/user/cart/delete', require_Signin, remove_item_from_cart)

module.exports = router