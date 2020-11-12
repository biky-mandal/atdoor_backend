const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    fullName: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true
    },
    hash_password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
},{timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);