const express = require('express');
const { getAllArtists, getArtistDetail, updateArtistRole, DeleteArtist, getAllUsers, getUserDetail, updateUserRole, DeleteUser } = require('../Controllers/AdminController');
const router = express.Router();
const { isAuth, authRoles } = require('../Middleware/auth');

router.route('/artists').get(isAuth, authRoles("admin") ,getAllArtists)
router.route('/artist/:id').get(isAuth,authRoles("admin"),getArtistDetail).put(isAuth,authRoles("admin"),updateArtistRole).delete(isAuth,authRoles("admin"),DeleteArtist)
router.route('/users').get(isAuth, authRoles("admin") ,getAllUsers)
router.route('/user/:id').get(isAuth,authRoles("admin"),getUserDetail).put(isAuth,authRoles("admin"),updateUserRole).delete(isAuth,authRoles("admin"),DeleteUser)


module.exports = router;
