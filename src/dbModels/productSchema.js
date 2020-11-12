const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    stock_amount: {
        type: String,
    },
    stock_quantity: {
        type: String,
    },
    unit: {
        type: String,
    },
    qtyunit: {
        type: String,
    },
    // High price
    amt_original_price: {
        type: String,
        currency: 'INR',
    },
    // Low price
    amt_selling_price: {
        type: String,
        currency: 'INR',
    },
    // High price
    qty_original_price: {
        type: String,
        currency: 'INR',
    },
    // Low price
    qty_selling_price: {
        type: String,
        currency: 'INR',
    },
    productPictures: [
        {
            img: { type: String }
        }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date

}, { timestamps: true });

// Vertual field for offer:
productSchema.virtual('offer').get(function () {
    const off = ((this.original_price + this.selling_price) / this.original_price) * 100
    return `${off}%`
})

module.exports = mongoose.model('Product', productSchema);