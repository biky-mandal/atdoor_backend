const express = require('express');
const { pay_process } = require('../controller/payment');
const router = express.Router();
const {require_Signin} = require('../../Common/controller')

router.post('/payment', require_Signin, pay_process)

module.exports = router