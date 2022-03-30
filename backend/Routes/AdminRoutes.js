const express = require("express");
const {
  getAllArtists,
  DeleteArtist,
  getAllUsers,
  DeleteUser,
} = require("../Controllers/AdminController");
const router = express.Router();
const { isAuth, authRoles } = require("../Middleware/auth");

router.route("/artists").get(isAuth, authRoles("admin"), getAllArtists);

router.route("/artist/:id").delete(isAuth, authRoles("admin"), DeleteArtist);

router.route("/users").get(isAuth, authRoles("admin"), getAllUsers);
router.route("/user/:id").delete(isAuth, authRoles("admin"), DeleteUser);

module.exports = router;
