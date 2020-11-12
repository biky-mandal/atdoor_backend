const express = require('express');
const { require_Signin, check_Admin_or_Not } = require('../../Common/controller');
const { create_Product, fetch_Products, delete_Products, update_Product, import_Product, export_Product } = require('../controller/product_Logic');


// for images
const multer = require('multer');
const shortid = require('shortid');
const Path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, Path.join(Path.dirname(__dirname), '../Resources/ProductImg'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});

var upload = multer({ storage })

// Actually router is a method.
const router = express.Router();


router.post('/admin/product/create', require_Signin, check_Admin_or_Not, upload.array('productPicture'),  create_Product)

router.get('/admin/product/fetch', fetch_Products);
router.post('/admin/product/delete', require_Signin, check_Admin_or_Not, delete_Products);
router.post('/admin/product/update', require_Signin, check_Admin_or_Not, update_Product);
router.post('/admin/product/import', require_Signin, check_Admin_or_Not, import_Product );
router.post('/admin/product/export', require_Signin, check_Admin_or_Not, export_Product);


module.exports = router