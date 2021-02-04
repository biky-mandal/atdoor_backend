const Payment = require('../../dbModels/paymentSchema');
const Cart = require('../../dbModels/cart_Schema');

exports.pay_process = (req, res) => {

    const user = req.user._id

    const payment = new Payment({
        user: user,
        payment_id: req.body.payment_id,
        order_id: req.body.order_id,
        signature: req.body.signature
    })

    payment.save((error, payment) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }
        if (payment) {
            Cart.findOneAndUpdate({user: req.user._id},
            {
                "$pullAll": {
                    cartItems : req.body.cartItems
                }
            }, (error, _cart) => {
                if (error) {
                    return res.status(400).json({
                        error
                    })
                }
                if (_cart) {
                    return res.status(200).json({
                        message: "Removed From Cart"
                    })
                }
            })
        }
    })
}