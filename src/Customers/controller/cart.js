const Cart = require('../../dbModels/cart_Schema');

exports.add_item_to_cart = (req, res) => {

    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }
        // If the Cart already exist then update the cart by quantity.s
        if (cart) {
            const new_product = req.body.cartItems.product
            const item = cart.cartItems.find(c => c.product == new_product);

            // If the product already exist
            if(item){
                Cart.findOneAndUpdate({user: req.user._id, "cartItems.product" : new_product}, {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity,
                            price: item.price + req.body.cartItems.price
                        }
                    }
                }, (error, _cart) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        })
                    }
                    if (_cart) {
                        return res.status(200).json({
                            message: "Added to Cart"
                        })
                    }
                })
            }else{
                Cart.findOneAndUpdate({user: req.user._id}, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }, (error, _cart) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        })
                    }
                    if (_cart) {
                        return res.status(200).json({
                            message: "Added To Cart"
                        })
                    }
                })
            }

        } else {
            // If cart doesnot exist create a cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });

            cart.save((error, cart) => {
                if (error) {
                    return res.status(400).json({
                        error
                    })
                }
                if (cart) {
                    return res.status(200).json({
                        cart
                    })
                }
            })

        }
    })
}