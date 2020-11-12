const User = require('../../dbModels/userSchema');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');


// This function will compare bcrypt password and return true or false.
const authenticate = (user, password) => {
    return bcrypt.compareSync(password, user.hash_password);
} 

// Lets create the signup logic
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }) // findOne function takes object argument
        .exec( async (error, user) => {
            // If error comes then
            if(error){
                return res.status(400).json({
                    error
                });
            }
            // if user comes then
            if(user){
                // That means User already exist.
                return res.status(401).json({
                    error: 'Admin already registered!'
                });
            }

            // If None of the above occures that means now we have to create a new acount.
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            // Before save our data to DB we convert our plain password to
            // hash_password using bcrypt.
            const hash_password = await bcrypt.hash(password, 10); // here 10 is the salt that is maximum value measure strenth

            // creating a new user
            const _user = new User({
                firstName,
                lastName,
                userName: firstName + shortid.generate(),
                email,
                hash_password,
                role: 'admin'
            });

            _user.save( (error, data) => {
                if(error){
                    return res.status(400).json({
                        error: 'Something Went wrong while saving the data to DB'
                    });
                }
                if(data){
                    return res.status(200).json({
                        error: 'Admin Created Successfully..'
                    });
                }
            });
        });
}


// Lets create the login logic
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec( (error, user) => {
            // User not found error.
            if(error){
                return res.status(400).json({
                    error
                });
            }
            // If user found then we have to proceed towards login.
            if(user){
                // Now we should check that password matched or not
                // authenticate is a method defined in userSchema to check password 
                if(authenticate(user,req.body.password) && user.role === 'admin'){
                    // Here we return user a token that whenever the user signs in he give us a token so that we can verify the user.
                    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn:'1d'})
    
                    const {_id, firstName, lastName, email, role, fullName} = user;
                    res.cookie('token', token, { expiresIn: '1d' });
    
                    res.status(200).json({
                        token,
                        user:{
                            _id, firstName, lastName, email, role, fullName
                        }
                    });
                }
                // If pssword does not match
                else{
                    return res.status(400).json({
                        error: 'Invalid Password!'
                    });
                }
            }else{
                return res.status(400).json({
                    error: 'I must register first.'
                });
            }
        });
}


// Lets create the log out logic
exports.logout = (req, res) => {
    // In the logout section we clear the cookie of token so that the user will get Logout.
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout Successfull..'
    });
}

