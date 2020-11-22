const express = require('express');
const { fetchcart } = require('../controller/fetchcart');

const router = express.Router();

router.post('/fetchcart', fetchcart);

module.exports = router