const Product = require('../../dbModels/productSchema');
const slugify = require('slugify');
const { db } = require('../../dbModels/productSchema');

// Creating a Product.
exports.create_Product = (req, res) => {

    // res.status(200).json({file: req.files, body: req.body})
    // Let's Create a product

    const {
        name, description, stock_amount, unit, qtyunit,
        stock_quantity, amt_original_price,
        amt_selling_price, qty_original_price,
        qty_selling_price, category
    } = req.body

    // Here we Take Product Pictures in an array.

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }
    // Finally let's create the product object with following attributes.

    const product = new Product({
        name,
        slug: slugify(name),
        description,
        stock_amount,
        stock_quantity,
        amt_original_price,
        amt_selling_price,
        qty_original_price,
        qty_selling_price,
        unit,
        qtyunit,
        category,
        productPictures,
        createdBy: req.user._id
    });

    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        if (product) {
            return res.status(200).json({
                product
            });
        }
    });
}

// Fetching Products..

exports.fetch_Products = (req, res) => {
    Product.find({}).exec((err, product) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        if (product) {
            return res.status(200).json({
                product
            });
        }
    })
}

// Deleting a Product

exports.delete_Products = async (req, res) => {
    await db.collection('products').deleteOne({ name: req.body.product_name }, (err, result) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        if (result) {
            return res.status(200).json({
                result
            });
        }
    });
}

// Updating the product

exports.update_Product = async (req, res) => {
    await db.collection('products').updateOne({ name: req.body.name }, {
        // Which is going to update.
        $set: {
            amt_original_price: req.body.up_amt_original_price,
            amt_selling_price: req.body.up_amt_selling_price,
            qty_original_price: req.body.up_qty_original_price,
            qty_selling_price: req.body.up_qty_selling_price,
            unit: req.body.unit,
            qtyunit: req.body.qtyunit,
            description: req.body.up_description
        },
        $currentDate: { lastModified: true }
    }, (err, result) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        if (result) {
            return res.status(200).json({
                result
            });
        }
    })
}

// Importing Products

exports.import_Product = async (req, res) => {

    if (req.body.unit === '') {
        // If there is no amount unit it will perform the quantity unit.
        await db.collection('products').updateOne({ name: req.body.name }, {
            // Which is going to update.
            $set: {
                stock_quantity: req.body.new_stock
            },
            $currentDate: { lastModified: true }
        }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }
            if (result) {
                return res.status(200).json({
                    result
                });
            }
        })

    }
    if (req.body.qtyunit === '') {
        // If there is no qty unit it will perform the amount update.

        await db.collection('products').updateOne({ name: req.body.name }, {
            // Which is going to update.
            $set: {
                stock_amount: req.body.new_stock
            },
            $currentDate: { lastModified: true }
        }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }
            if (result) {
                return res.status(200).json({
                    result
                });
            }
        })
    }
}

//Export Products 

exports.export_Product = async (req, res) => {

    if (req.body.unit === '') {
        // If there is no amount unit it will perform the quantity unit.
        await db.collection('products').updateOne({ name: req.body.name }, {
            // Which is going to update.
            $set: {
                stock_quantity: req.body.new_stock
            },
            $currentDate: { lastModified: true }
        }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }
            if (result) {
                return res.status(200).json({
                    result
                });
            }
        })

    }
    if (req.body.qtyunit === '') {
        // If there is no qty unit it will perform the amount update.

        await db.collection('products').updateOne({ name: req.body.name }, {
            // Which is going to update.
            $set: {
                stock_amount: req.body.new_stock
            },
            $currentDate: { lastModified: true }
        }, (err, result) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }
            if (result) {
                return res.status(200).json({
                    result
                });
            }
        })
    }
}