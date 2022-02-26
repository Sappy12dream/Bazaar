const express = require('express');
const { createArtist, loginArtist, logOutArtist, forgotPassword, resetPassword, getArtistDetails, updateArtistDetails, updateArtistPassword } = require('../Controllers/ArtistController');
const { isAuth } = require('../Middleware/auth');
const router = express.Router();

router.route('/register').post(createArtist);
router.route('/login').post(loginArtist)
router.route('/logout').get(logOutArtist);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuth,getArtistDetails);
router.route('/password/update').put(isAuth,updateArtistPassword);
router.route('/profile/update').put(isAuth,updateArtistDetails);




module.exports = router;

