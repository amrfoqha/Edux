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
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
module.exports = Room = mongoose.model("Room", roomSchema);
