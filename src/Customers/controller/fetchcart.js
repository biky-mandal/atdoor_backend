const Cart = require('../../dbModels/cart_Schema');

exports.fetchcart = async (req, res) => {
    const AllCarts = await Cart.find({}).exec();

    AllCarts.map(cart => {
        if(cart.user == req.body.currentUserId){
            return res.status(200).json({
                cart
            })
        }
    })
}