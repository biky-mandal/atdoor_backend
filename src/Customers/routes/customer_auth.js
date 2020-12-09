const express = require('express');
const { validate_Login_Request_customer, is_Request_Validated, validate_Signup_Request_customer } = require('../../Validations/auth_validation');
const { customer_signup, customer_login, customer_logout, phone_verification, check_already_exist_or_not } = require('../controller/auth_Logic_Customer');

// Lets import Router
const router = express.Router();

// Routes for Customer..

router.post('/user/login', validate_Login_Request_customer, is_Request_Validated, customer_login);

router.post('/user/signup', validate_Signup_Request_customer, is_Request_Validated, customer_signup);
// login Route
router.post('/user/logout', customer_logout);


// router.post('/user/verification/check_login_or_not', check_already_exist_or_not);

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACb934b93e5c421669ce5dd278c198e7da';
const authToken = 'f9ee2b71bba7e840834d1e378f3ed645';
const serviceID = 'VAe85db01e72c75ededbe1e5c86c788c61';

const client = require('twilio')(accountSid, authToken);
// Twilio verification
router.post('/user/verification/pending', check_already_exist_or_not,  (req, res) => {

    client.verify.services(serviceID).verifications.create({
        to: `+91${req.body.phoneNumber}`,
        channel: 'sms'
    }).then((data) => {
        res.status(200).json({
            data
        });
    }).catch((error) => {
        res.status(400).json({
            error
        });
    })
});

// CHecking Verification
router.post('/user/verify', (req, res) => {
    client.verify.services(serviceID).verificationChecks.create({
        to: `+91${req.body.phoneNumber}`,
        code: req.body.code
    }).then((data) => {
        res.status(200).json({
            data
        });
    }).catch((error) => {
        res.status(400).json({
            error
        });
    })
})

// Exporting the route
module.exports = router;