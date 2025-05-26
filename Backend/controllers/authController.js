const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Signup Controller (Normal User)
exports.signup = async (req, res) => {
  let { name, email, password } = req.body;
  email = email.trim().toLowerCase();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, isAdmin: false });
    await user.save();

    req.session.user = { id: user._id, isAdmin: user.isAdmin };
    res.status(201).json({ success: true, message: "User registered successfully", isAdmin: user.isAdmin });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login Controller (Admin & User both)
exports.login = async (req, res) => {
  let { email, password } = req.body;
  email = email.trim().toLowerCase();

  try {
    // Admin Login (credentials from .env)
    if (email === process.env.ADMIN_EMAIL.toLowerCase()) {
      if (password === process.env.ADMIN_PASSWORD) {
        req.session.user = { id: "admin", isAdmin: true };
        return res.json({ success: true, message: "Admin login successful", isAdmin: true });
      } else {
        return res.status(401).json({ success: false, message: "Invalid admin credentials" });
      }
    }

    // User Login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    req.session.user = { id: user._id, isAdmin: user.isAdmin };
    res.json({ success: true, message: "Login successful", isAdmin: user.isAdmin });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
};

// Session Check
exports.sessionCheck = (req, res) => {
  if (req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "No active session" });
  }
};
