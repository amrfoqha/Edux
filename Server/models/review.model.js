const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);
module.exports = Review = mongoose.model("Review", reviewSchema);
