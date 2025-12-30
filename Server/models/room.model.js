const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          index: true,
        },
        isActive: { type: Boolean, default: true },
      },
    ],
    isActive: { type: Boolean, default: true },
    memberCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = Room = mongoose.model("Room", roomSchema);
