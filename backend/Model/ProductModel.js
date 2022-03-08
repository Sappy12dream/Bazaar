const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name can not be empty"],
  },
  description: {
    type: String,
    required: [true, "Product description can not be empty"],
  },
  price: {
    type: Number,
    required: [true, "Product price can not be empty"],
    maxLength: [8, "Product price can't exceed 8 figure"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      pid: {
        type: String,
        required: [true, "PID required"],
      },
      url: {
        type: String,
        required: [true, "url"],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "category required"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "artist" || "user",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: "artist",
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("product", productSchema);
