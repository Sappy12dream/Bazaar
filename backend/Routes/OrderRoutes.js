const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../Controllers/OrderController");
const router = express.Router();

const { isAuth, authRoles } = require("../Middleware/auth");

router.route("/new").post(isAuth, newOrder);

router.route("/order/:id").get(isAuth, getSingleOrder);

router.route("/orders/me").get(isAuth, myOrders);

router.route("/admin/orders").get(isAuth, authRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuth, authRoles("admin"), updateOrder)
  .delete(isAuth, authRoles("admin"), deleteOrder);

module.exports = router;
