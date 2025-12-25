const User = require("../models/User.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        university,
        faculty,
        department,
        confirmPassword,
      } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await User.create({
        name,
        email,
        password,
        university,
        faculty,
        department,
        confirmPassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name,
          email,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error", error: err });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  });
};
