import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Hello from API!" });
});

// Register API
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save((err, user) => {
      if (err) {
        console.error(err);
      } else {
        console.log("User created successfully:", user);
      }
    });

    res.json({ message: "User created successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
