const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required:true},
    order_id : {type: String},
    entity: {type: String},
    amount: {type: Number},
    amount_paid: {type: Number},
    amount_due: {type: Number},
    currency: {type: String},
    receipt: {type: String},
    status: {type: String},
    attempts: {type: Number},
    orderItems: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, default: 1 },
            price: {type: Number, required: true}
        }
    ]

},{timestamps: true})

module.exports = mongoose.model('Order', orderSchema);