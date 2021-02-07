const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required:true},
    name: {type: String},
    message: {type: String}
},{timestamps: true})

module.exports = mongoose.model('Message', messageSchema);