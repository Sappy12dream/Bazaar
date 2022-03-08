const express = require("express");
const {
  addToWishList,
  myWishList,
  removeItem,
} = require("../Controllers/WishListController");
const { isAuth } = require("../Middleware/auth");
const router = express.Router();

router.route("/add").post(isAuth, addToWishList);
router.route("/my").get(isAuth, myWishList);
router.route("/remove/:id").delete(isAuth, removeItem);

module.exports = router;
