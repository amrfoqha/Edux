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
      enum: ["request", "review", "approval", "dm", "room"],
      default: "dm",
    },
    message: String,
    isRead: { type: Boolean, default: false },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
