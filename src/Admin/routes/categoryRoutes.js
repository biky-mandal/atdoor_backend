const express = require('express');
const { require_Signin, check_Admin_or_Not } = require('../../Common/controller');
const { createCategory, fetch_Categories, delete_Categories, update_Category } = require('../controller/category_Logic');


// lets import router method from express.
const router = express.Router();

// let's Upload images for category

// // importing packages.
// const multer = require('multer');
// const shortid = require('shortid');
// const Path = require('path');

// // //
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, Path.join(Path.dirname(__dirname), '../Resources/CategoryImg'))
//     },
//     filename: function (req, file, cb){
//         cb(null, shortid.generate() + '_' + file.originalname)
//     }
// });
// //////
// var upload = multer({ storage: storage })

router.post("/admin/category/create", require_Signin, check_Admin_or_Not, createCategory);
router.get("/admin/category/fetch", fetch_Categories);
router.post("/admin/category/delete", require_Signin, check_Admin_or_Not, delete_Categories);
router.post("/admin/category/update", require_Signin, check_Admin_or_Not, update_Category);

module.exports = router