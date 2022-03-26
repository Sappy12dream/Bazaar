const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../Model/UserModel");
const sendToken = require("../utils/sendToken");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");

exports.createuser = AsyncErrorHandler(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "useravatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      pid: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

exports.loginuser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter name & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }
  const ispasswordMatched = await user.comparePassword(password);

  if (!ispasswordMatched) {
    return next(new ErrorHandler("Invalid email or password"), 401);
  }

  sendToken(user, 200, res);
});

exports.logOutuser = AsyncErrorHandler(async (req, res, next) => {
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
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next("user not found", 404);
  }

  const resetToken = user.getResetpassToken();
  await user.save({ validateBeforeSave: false });

  const resetPassUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is \n\n ${resetPassUrl} \n if not requested please ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Bazaar: recover password",
      message,
    });

    res.status(201).json({
      success: true,
      message: "msg send successfully",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = AsyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
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

exports.getuserDetails = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateuserPassword = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const ispasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!ispasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect"), 400);
  }
  if (!req.body.newPassword === req.body.confirmPassword) {
    return next(new ErrorHandler("password doesn't match"), 400);
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

exports.updateuserDetails = AsyncErrorHandler(async (req, res, next) => {

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !=="") {
    const user = await User.findById(req.user.id);
    const imgId = user.avatar.pid
    await cloudinary.v2.uploader.destroy(imgId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "useravatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      pid: myCloud.public_id,
      url: myCloud.secure_url,
    };
    
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData);

  res.status(200).json({
    success: true,
  });
});
