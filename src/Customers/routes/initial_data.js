const express = require('express');
const { initialdata } = require('../controller/initial_data');

const router = express.Router();

router.post('/initialdata', initialdata);

module.exports = router