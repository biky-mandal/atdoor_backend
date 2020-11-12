const express = require('express');
const { validate_Login_Request, validate_Signup_Request, is_Request_Validated } = require('../../Validations/auth_validation');
const { signup, login, logout } = require('../controller/auth_Logic');

// lets import router method from express.
const router = express.Router();

// lets Create some Route for the Admin.

// login Route
router.post('/admin/login', validate_Login_Request, is_Request_Validated, login);

// login Route
router.post('/admin/signup', validate_Signup_Request, is_Request_Validated, signup);

// login Route
router.post('/admin/logout', logout);



// We have to export the routes.
module.exports = router;