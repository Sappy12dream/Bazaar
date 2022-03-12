const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const Product = require("../Model/ProductModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../Utils/errorHandler");

//get all products - user
exports.getAllProducts = AsyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(201).json({ nbHits: products.length, productCount, products });
});

//create product - Artist
exports.createProduct = AsyncErrorHandler(async (req, res, next) => {
  req.body.artist = req.user.id;
  req.body.artistName = req.user.name;
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
  product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json(product);
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

exports.deleteReview = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;
  const numberOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    ratings,
    reviews,
    numberOfReviews,
  });

  res.status(201).json({
    success: true,
    message: "Deleted",
  });
});
