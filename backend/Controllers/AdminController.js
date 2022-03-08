const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const ErrorHandler = require("../Utils/errorHandler");
const Artist = require("../Model/ArtistModel");
const User = require("../Model/UserModel");

//get all Artists - admin

exports.getAllArtists = AsyncErrorHandler(async (req, res, next) => {
  const artists = await Artist.find();
  res.status(200).json({
    success: true,
    nbHits: artists.length,
    artists,
  });
});

exports.getArtistDetail = AsyncErrorHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist) {
    return next(
      new ErrorHandler(`No artist with id: ${req.params.id} found`, 400)
    );
  }
  res.status(200).json({
    success: true,
    artist,
  });
});

exports.updateArtistRole = AsyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };
  const artist = await Artist.findByIdAndUpdate(req.params.id, newUserData);

  res.status(200).json({
    success: true,
  });
});

exports.DeleteArtist = AsyncErrorHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist) {
    return next(
      new ErrorHandler(`No artist with id: ${req.params.id} found`, 400)
    );
  }
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

exports.getUserDetail = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`No user with id: ${req.params.id} found`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserRole = AsyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData);

  res.status(200).json({
    success: true,
  });
});

exports.DeleteUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`No user with id: ${req.params.id} found`, 400)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
  });
});
