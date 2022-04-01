const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const Product = require("../Model/ProductModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

//get all products - user
exports.getAllProducts = AsyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()

    .pagination(resultPerPage);

  const products = await apiFeatures.query;

  res
    .status(201)
    .json({ nbHits: products.length, productCount, products, resultPerPage });
});

//get all products - admin

exports.getAllArtistProducts = AsyncErrorHandler(async (req, res, next) => {
  const products = await Product.find({ artist: req.user._id });
  res.status(201).json({ nbHits: products.length, products });
});

//create product - Artist
exports.createProduct = AsyncErrorHandler(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      pid: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.artist = req.user.id;
  req.body.artistName = req.user.name;
  req.body.whatsappLink = req.user.whatsappLink;
  req.body.avatar = req.user.avatar;
  req.body.images = imagesLinks;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Update product - Artist

exports.updateProduct = AsyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].pid);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        pid: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({
    success: true,
  });
});

//Delete product - Artist

exports.deleteProduct = AsyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();
  res.status(201).json({
    success: true,
    msg: "product deleted",
  });
});

// get single product - User
exports.getProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  } else {
    res.status(201).json({
      success: true,
      product,
    });
  }
});

//Reviews

exports.createProdutReview = AsyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  if (comment === "") {
    return next(new ErrorHandler("Comment & ratings is required", 404));
  }
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//all reviews

exports.getAllReviews = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    nbHits: product.numberOfReviews,
    reviews: product.reviews,
  });
});
