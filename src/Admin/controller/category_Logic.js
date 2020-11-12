const Category = require('../../dbModels/categorySchema');
const slugify = require('slugify');
const { db } = require('../../dbModels/categorySchema');

// Creating a Category
exports.createCategory = (req, res) => {
    // Creating an object to save in db
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        description: req.body.description
        // As parent category doesnot have parent id so we should
        // import it conditionally.
    }

    // Let's Save our category

    const new_Category = new Category(categoryObj);
    new_Category.save((error, category) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        if (category) {
            return res.status(200).json({
                category
            });
        }
    });
}

// fetching all Categories

exports.fetch_Categories = (req, res) => {
    Category.find({}) // it will Return all the categories from db
        .exec((err, categories) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }
            if (categories) {
                return res.status(200).json({
                    categories
                });
            }
        });
}

// Delete a Category
exports.delete_Categories = async (req, res) => {
    await db.collection('categories').deleteOne({ name: req.body.category_name}, (err, result) => {
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

//  Updating a Category

exports.update_Category = async (req, res) => {
    await db.collection('categories').updateOne({ name: req.body.category_name },
        {
            // Which has to be Updated.
            $set: { description: req.body.description },
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
        });
}