const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v),
        message: "Email is invalid",
      },
    },
    img: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    university: { type: String, required: [true, "University is required"] },
    faculty: { type: String, required: [true, "Faculty is required"] },
    department: { type: String, required: [true, "Department is required"] },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

userSchema.pre("validate", function (next) {
  if (this.isNew || this.isModified("password")) {
    if (!this.confirmPassword) {
      this.invalidate("confirmPassword", "Confirm password is required");
    }
    if (this.password !== this.confirmPassword) {
      this.invalidate(
        "confirmPassword",
        "Password must match confirm password"
      );
    }
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
