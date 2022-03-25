const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const ErrorHandler = require("../Utils/errorHandler");
const Artist = require("../Model/ArtistModel");
const sendToken = require("../utils/sendToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");


exports.createArtist = AsyncErrorHandler(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "artistavatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password, whatsappLink,secretKey } = req.body;
if(secretKey !== "chaycjwsvxbuoadhvncoifdhoi"){
return next(new ErrorHandler("secret key is invalid, contact Admin for more information"),404)
}
  const user = await Artist.create({
    name,
    email,
    password,
    whatsappLink,

    avatar: {
      pid: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

exports.loginArtist = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter name & password", 400));
  }

  const artist = await Artist.findOne({ email }).select("+password");

  if (!artist) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }
  const ispasswordMatched = await artist.comparePassword(password);

  if (!ispasswordMatched) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  sendToken(artist, 200, res);
});

exports.logOutArtist = AsyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

exports.forgotPassword = AsyncErrorHandler(async (req, res, next) => {
  const artist = await Artist.findOne({
    email: req.body.email,
  });

  if (!artist) {
    return next("artist not found", 404);
  }

  const resetToken = artist.getResetpassToken();
  await artist.save({ validateBeforeSave: false });

  const resetPassUrl = `${process.env.FRONTEND_URL}/artist/password/reset/${resetToken}`;

  const message = `YourReset Password Token is \n\n ${resetPassUrl} \n if not requested please ignore`;

  try {
    await sendEmail({
      email: artist.email,
      subject: "Bazaar: recover password",
      message,
    });

    res.status(201).json({
      success: true,
      message: "msg send successfully",
    });
  } catch (error) {
    artist.resetPasswordToken = undefined;
    artist.resetPasswordExpire = undefined;
    await artist.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = AsyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await Artist.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("reset password token is invalid or expired", 400)
    );
  }

  if (!req.body.password === req.body.confirmPassword) {
    return next(
      new ErrorHandler("password doesn't match confirm password", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

exports.getArtistDetails = AsyncErrorHandler(async (req, res, next) => {
  const user = await Artist.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateArtistPassword = AsyncErrorHandler(async (req, res, next) => {
  const artist = await Artist.findById(req.user.id).select("+password");

  const ispasswordMatched = await artist.comparePassword(req.body.oldPassword);

  if (!ispasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect"), 400);
  }
  if (!req.body.newPassword === req.body.confirmPassword) {
    return next(new ErrorHandler("password doesn't match"), 400);
  }

  artist.password = req.body.newPassword;
  await artist.save();
  sendToken(artist, 200, res);
});

exports.updateArtistDetails = AsyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    whatsappLink: req.body.whatsappLink,
  };

  if (req.body.avatar !=="") {
    const user = await Artist.findById(req.user.id);
    const imgId = user.avatar.pid
    await cloudinary.v2.uploader.destroy(imgId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "artistavatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      pid: myCloud.public_id,
      url: myCloud.secure_url,
    };
    
  }
  const user = await Artist.findByIdAndUpdate(req.user.id, newUserData);

  res.status(200).json({
    success: true,
  });
});
