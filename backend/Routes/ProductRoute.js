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
router.route("/artist/products").get(isAuth, authRoles("artist"),getAllArtistProducts);

//Artist Route
router.route("/product/new").post(isAuth, authRoles("artist"), createProduct);
router
  .route("/product/:id")
  .put(isAuth, authRoles("artist"), updateProduct)
  .delete(isAuth, authRoles("artist"), deleteProduct)
  .get(getProduct);

router.route("/add/review").put(isAuth, createProdutReview);

router.route("/reviews").get(getAllReviews).delete(isAuth, deleteReview);

module.exports = router;
