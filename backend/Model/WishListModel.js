const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user" || "artist",
    required: true,
  },
});

module.exports = mongoose.model("wishlist", wishListSchema);
