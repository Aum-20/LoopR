import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from '../models/User';// adjust path if needed

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "super-secret-key";

// 🆕 Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // ✅ DO NOT hash password manually — model will do it
    const newUser = new User({ name, email, password });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});



// 🔑 Existing Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("🚀 Login attempt:", { email, password });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("🔐 Hashed password in DB:", user.password);

    const valid = await user.comparePassword(password); // uses schema method
    console.log("✅ Password match:", valid);

    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});


// Created to test the passwords.

// router.post("/check-password", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const match = await user.comparePassword(password);
//     res.json({
//       email,
//       passwordEntered: password,
//       hashStored: user.password,
//       result: match ? "✅ Password matches" : "❌ Password does not match",
//     });
//   } catch (err) {
//     console.error("Check-password error:", err);
//     res.status(500).json({ message: "Error during password comparison" });
//   }
// });

export default router;
