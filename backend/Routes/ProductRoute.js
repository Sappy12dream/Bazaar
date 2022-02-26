const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct } = require('../Controllers/ProductController');
const { isAuth, authRoles } = require('../Middleware/auth');


router.route('/products').get(getAllProducts);

//Artist Route
router.route('/product/new').post(isAuth, authRoles("artist"),createProduct);
router.route('/product/:id').put( isAuth, authRoles("artist"),updateProduct).delete( isAuth, authRoles("artist"),deleteProduct).get(getProduct);






module.exports = router;
