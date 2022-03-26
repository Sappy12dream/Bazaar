const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createProdutReview,
  getAllReviews,
  deleteReview,
  getAllArtistProducts,
} = require("../Controllers/ProductController");
const { isAuth, authRoles } = require("../Middleware/auth");

router.route("/products").get(getAllProducts)
router.route("/artist/products").get(isAuth, authRoles("artist") || authRoles('admin'),getAllArtistProducts);

//Artist Route
router.route("/new/product").post(isAuth, authRoles("artist") || authRoles('admin'), createProduct);
router
  .route("/product/:id")
  .put(isAuth, authRoles("artist") || authRoles('admin'), updateProduct)
  .delete(isAuth, authRoles("artist") || authRoles('admin'), deleteProduct)
  .get(getProduct);

router.route("/add/review").put(isAuth, createProdutReview);

router.route("/reviews").get(getAllReviews).delete(isAuth, deleteReview);

module.exports = router;
