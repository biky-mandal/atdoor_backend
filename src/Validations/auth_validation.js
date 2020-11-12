// We will validate the input form like the email 
// Id is filled or not it is valid or not etc.

// Let's Import Validationresult and check from express-validator.
const { check, validationResult } = require('express-validator');

// Let's Validate signup request first
exports.validate_Signup_Request = [
    // Actually this is an array
    check('firstName')
    .notEmpty()
    .withMessage('Oops! I forgot to Enter my FirstName.'),

    check('lastName')
    .notEmpty()
    .withMessage('Oops! I forgot to Enter my LastName.'),

    check('email')
    .isEmail()
    .withMessage('I should Enter my Email Id.'),

    check('password')
    .isLength({min:8})
    .withMessage('Oh k..Password must be 8 characters long')
];

exports.validate_Login_Request = [
    check('email')
    .isEmail()
    .withMessage('I think I should Enter my Email Id to login.'),

    check('password')
    .isLength({min:8})
    .withMessage('Oh k..Password must be 8 characters long')
];

// Let's Validate signup for customer request first
exports.validate_Signup_Request_customer = [
    // Actually this is an array

    check('phoneNumber')
    .notEmpty()
    .withMessage('Oops! I forgot to Enter my Number.'),

    check('password')
    .isLength({min:8})
    .withMessage('Oh k..Password must be 8 characters long')
];

// Let's Validate login request first
exports.validate_Login_Request_customer = [
    check('phoneNumber')
    .notEmpty()
    .withMessage('Oops! I forgot to Enter my Number.'),

    check('password')
    .isLength({min:8})
    .withMessage('Oh k..Password must be 8 characters long')
];


// Now i Have to check that isRequestValidated

exports.is_Request_Validated = (req, res, next) => {
    // This will return all the erros while validation and it is provided
    // By express-validator
    const errors = validationResult(req); // store all errors to validationResult method

    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    // If there is no error then simply run next function
    next();
}

