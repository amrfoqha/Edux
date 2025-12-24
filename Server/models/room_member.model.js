const mongoose = require("mongoose");
const roomMemberSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    role: {
      type: String,
      enum: ["owner", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = RoomMember = mongoose.model("RoomMember", roomMemberSchema);
