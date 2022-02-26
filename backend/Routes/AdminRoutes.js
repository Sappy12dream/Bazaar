const express = require('express');
const { getAllArtists, getArtistDetail, updateArtistRole, DeleteArtist } = require('../Controllers/AdminController');
const router = express.Router();
const { isAuth, authRoles } = require('../Middleware/auth');

router.route('/artists').get(isAuth, authRoles("admin") ,getAllArtists)
router.route('/artist/:id').get(isAuth,authRoles("admin"),getArtistDetail).put(isAuth,authRoles("admin"),updateArtistRole).delete(isAuth,authRoles("admin"),DeleteArtist)


module.exports = router;
