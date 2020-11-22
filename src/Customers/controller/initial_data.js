const ProductSchema = require('../../dbModels/productSchema');
const CategorySchema = require('../../dbModels/categorySchema');

exports.initialdata = async (req, res) => {
    const products = await ProductSchema.find({}).exec();
    const categories = await CategorySchema.find({}).exec();

    res.status(200).json({
        products,
        categories
    })
}