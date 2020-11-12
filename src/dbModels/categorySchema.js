const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim:true,
        required:true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }

},{timestamps:true});

module.exports = mongoose.model('Category', categorySchema);