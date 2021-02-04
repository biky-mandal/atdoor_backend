const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required:true},
    order_id : {type: String},
    payment_id: {type: String},
    signature: {type: String}

},{timestamps: true})

module.exports = mongoose.model('Payment', paymentSchema);
