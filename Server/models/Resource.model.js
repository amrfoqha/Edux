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
      enum: ["downloadable", "requestable", "external", "generated"],
      default: "downloadable",
    },
    files: { type: [String], default: [] },
    thumbnail: String,
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    url: { type: String, default: "" },
    average_rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);


resourceSchema.pre("validate", function (next) {
  if (["generated", "external"].includes(this.access_mode)) {
    if (!this.url || !this.url.trim()) {
      return next(new Error("url is required when access_mode is generated or external"));
    }
  }
  next();
});


module.exports = Resource = mongoose.model("Resource", resourceSchema);
