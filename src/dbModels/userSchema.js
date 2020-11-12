const mongoose = require('mongoose');
// This bcrypt will used to convert a password to hash.
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true, // It will remove the white spaces
        min: 2,
        max: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    userName:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: [ 'user', 'admin' ],
        default: 'user'
    },
    contactNumber:{
        type: String,
    },
    profilePicture: {
        type: String
    }
}, {timestamps:true});

// Creating a full Name using Virtual fields.
// Which gonna simply return the full name as a fullName
userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', userSchema)