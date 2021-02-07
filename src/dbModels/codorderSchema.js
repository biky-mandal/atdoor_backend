const mongoose = require('mongoose');

const codorderSchema = new mongoose.Schema({

    user:{type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true},
    order_id : {type:String},
    amount: {type:Number},
    currency: {type:String},
    receipt: {type: String},
    orderItems : [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, default: 1 },
            price: {type: Number, required: true}
        }
    ]

}, {timestamps: true})

module.exports = mongoose.model('codOrder', codorderSchema);