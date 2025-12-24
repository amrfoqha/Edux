const mongoose = require("mongoose");
const roomMessageSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    message: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = RoomMessage = mongoose.model("RoomMessage", roomMessageSchema);
