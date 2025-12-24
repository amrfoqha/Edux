const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema(
  {
    title: String,
    type: {
      type: String,
      enum: ["book", "slides", "course", "exam", "video"],
      default: "book",
    },
    description: String,
    university: { type: String, required: [true, "University is required"] },
    faculty: { type: String, required: [true, "Faculty is required"] },
    department: { type: String, required: [true, "Department is required"] },
    tags: [String],
    access_mode: {
      type: String,
      enum: ["downloadable", "requestable"],
      default: "downloadable",
    },
    file_url: String,
    thumbnail: String,
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    average_rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
module.exports = Resource = mongoose.model("Resource", resourceSchema);
