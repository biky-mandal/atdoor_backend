const { Router } = require('express');
const express = require('express');
const {messageController} = require('../controller/message');
const {require_Signin} = require('../../Common/controller');

const router = express.Router();

router.post('/message', require_Signin, messageController)

module.exports = router