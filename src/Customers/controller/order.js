const Order = require('../../dbModels/orderSchema')
const Razorpay = require("razorpay")
const shortid = require('shortid')

//  This is for test payment.
const razorpay = new Razorpay({
    key_id:"rzp_test_6fro0z3TI6UZ9U",
    key_secret:"tpIvoEb7TydI7AcpCrmWkTFc"
})

// this is for live payment
// const razorpay = new Razorpay({
//     key_id:"rzp_live_uKSJibiIsUbyDI",
//     key_secret:"agBXSDk5DuUZ074PlRcMNjto"
// })


exports.placeOrder = async (req, res) => {

    const user = req.user._id
    const payment_capture = 1
    const amount = req.body.amount
    const currency = "INR"
    const orderItems = req.body.orderItems

    const options = {
        amount: amount*100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    const response = await razorpay.orders.create(options)

    console.log(response);
    // Create a new Order.
    const order = new Order({
        user: user,
        order_id : response.id,
        entity: response.entity,
        amount: response.amount,
        amount_paid: response.amount_paid,
        amount_due: response.amount_due,
        currency: response.currency,
        receipt: response.receipt,
        status: response.status,
        attempts: response.attempts,
        orderItems: orderItems
    })

    order.save((error, order) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }
        if (order) {
            return res.status(200).json({
                id:response.id,
                currency:response.currency,
                amount:response.amount
            })
        }
    })
}