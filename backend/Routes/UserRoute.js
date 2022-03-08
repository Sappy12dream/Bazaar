const express = require("express");
const {
  createuser,
  loginuser,
  logOutuser,
  forgotPassword,
  resetPassword,
  getuserDetails,
  updateuserPassword,
  updateuserDetails,
} = require("../Controllers/UserController");
const { isAuth } = require("../Middleware/auth");
const router = express.Router();

router.route("/register").post(createuser);
router.route("/login").post(loginuser);
router.route("/logout").get(logOutuser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuth, getuserDetails);
router.route("/password/update").put(isAuth, updateuserPassword);
router.route("/profile/update").put(isAuth, updateuserDetails);

module.exports = router;
