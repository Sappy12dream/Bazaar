const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const Artist = require("../Model/ArtistModel");
const User = require("../Model/UserModel");
const cloudinary = require("cloudinary");

//get all Artists - admin

exports.getAllArtists = AsyncErrorHandler(async (req, res, next) => {
  const artists = await Artist.find();
  res.status(200).json({
    success: true,
    nbHits: artists.length,
    artists,
  });
});

exports.DeleteArtist = AsyncErrorHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist) {
    return next(
      new ErrorHandler(`No artist with id: ${req.params.id} found`, 400)
    );
  }
  const imgId = artist.avatar.pid;
  await cloudinary.v2.uploader.destroy(imgId);
  await artist.remove();

  res.status(200).json({
    success: true,
  });
});

//get all user - admin

exports.getAllUsers = AsyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    nbHits: users.length,
    users,
  });
});

exports.DeleteUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`No user with id: ${req.params.id} found`, 400)
    );
  }
  const imgId = user.avatar.pid;
  await cloudinary.v2.uploader.destroy(imgId);
  await user.remove();

  res.status(200).json({
    success: true,
  });
});
