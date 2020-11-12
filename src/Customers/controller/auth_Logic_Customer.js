const Customer = require('../../dbModels/userSchema_Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

// Check whether customer already exist or nnot..
exports.check_already_exist_or_not = (req, res, next) => {
    Customer.findOne({ phoneNumber: req.body.phoneNumber }).exec(async (error, customer) => {
        // If Error Happened
        if(error){
            return res.status(400).json({
                error
            });
        }
        // if user Comes out
        if(customer){
            return res.status(200).json({
                data:{
                    exist: true,
                    message: 'Customer Already Registered.!'
                }
            })
        }
        next()
    })
}

// Create a signup process for customer.
exports.customer_signup = (req, res) => {
    Customer.findOne({ phoneNumber: req.body.phoneNumber })
        .exec(async (error, customer) => {
            // If error happened
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            // If user come
            if (customer) {
                return res.status(400).json({
                    message: 'Customer Already Registered.!'
                });
            }
            // If None of the above occures
            const {
                phoneNumber,
                password
            } = req.body;

            // Before save our data to DB we convert our plain password to
            // hash_password using bcrypt.
            const hash_password = await bcrypt.hash(password, 10); // here 10 is the salt that is maximum value measure strenth

            // Creating a new customer
            const _customer = new Customer({
                phoneNumber,
                hash_password,
                email: shortid.generate() ,
                fullName: 'User'
            });

            _customer.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        error
                    });
                }
                if (data) {
                    // We are going to login the user.
                    const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '100d' });

                    const { _id, phoneNumber, fullName } = data;
                    res.cookie('token', token, { expiresIn: '100d' });

                    res.status(200).json({
                        token,
                        customer: {
                            _id, phoneNumber, fullName
                        }
                    });
                    // return res.status(200).json({
                    //     data
                    // });
                }
            });
        });
}
// This function will compare bcrypt password and return true or false.
const authenticate = (customer, password) => {
    return bcrypt.compareSync(password, customer.hash_password);
}

// Let's Login Customer
exports.customer_login = (req, res) => {
    Customer.findOne({ phoneNumber: req.body.phoneNumber })
        .exec((error, customer) => {
            // User not found.
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            // If user found then we have to proceed towards login.
            if (customer) {
                // Now we should check that password matched or not
                // authenticate is a method defined in Schema to check password 
                if (authenticate(customer, req.body.password)) {
                    const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET, { expiresIn: '100d' });

                    const { _id, phoneNumber, fullName } = customer;
                    res.cookie('token', token, { expiresIn: '100d' });

                    res.status(200).json({
                        token,
                        customer: {
                            _id, phoneNumber, fullName
                        }
                    });
                } else {
                    return res.status(400).json({
                        error: 'Invalid Password!'
                    });
                }
            } else {
                return res.status(400).json({
                    error: 'I must register first.'
                });
            }
        });
}

// Lets create the log out logic
exports.customer_logout = (req, res) => {
    // In the logout section we clear the cookie of token so that the user will get Logout.
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout Successfull..'
    });
}
