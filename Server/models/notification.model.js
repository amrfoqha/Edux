const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    type: {
      type: String,
      enum: ["request", "review", "approval"],
      default: "request",
    },
    message: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
