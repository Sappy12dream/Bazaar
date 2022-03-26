const Wishlist = require("../Model/WishListModel");
const AsyncErrorHandler = require("../Middleware/AsyncErrorHandler");
const Product = require("../Model/ProductModel");
const ErrorHandler = require("../utils/errorHandler");

exports.addToWishList = AsyncErrorHandler(async (req, res, next) => {
  const items = await Wishlist.find({user:req.user._id})
  const isMatched = items.find(item => item.product.toString() === req.body.product)
  if(isMatched){
    return next(new ErrorHandler("Item already exists", 400))
  }

  const item = await Wishlist.create({
      product: req.body.product,
      user: req.user._id,
    });
  
  

  res.status(201).json({
    success: true,
    item,
    message:"Item Added Successfully!"

  });
});

exports.myWishList = AsyncErrorHandler(async (req, res, next) => {
  const itemss = await Wishlist.find({ user: req.user._id }).populate(
    "product",
    "name"
  );
  
  const item = itemss.find(item => item.product === null)
  if(item){
    await item.remove();

  }
  const items = await Wishlist.find({ user: req.user._id }).populate(
    "product",
    "name description price ratings images category numberOfReviews reviews artist artistName createdAt whatsappLink"
  );
  
  res.status(200).json({
    success: true,
    nbHits: items.length,
    items,
  });
});

exports.removeItem = AsyncErrorHandler(async (req, res, next) => {
  let item = await Wishlist.findById(req.user._id && req.params.id);
  if (!item) {
    return next(new ErrorHandler("item not found", 404));
  }
  await item.remove();
  res.status(201).json({
    success: true,
    msg: "removed",
  });
});
