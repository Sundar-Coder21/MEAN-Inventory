const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult, body } = require("express-validator");
const { user } = require("../models");

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, isActive, role } = req.body;

  try {
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      email,
      password: hashedPassword,
      isActive: isActive || true, // Default to true if not provided
      role: role || "user", // Default role is 'user' if not provided
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
}

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: foundUser.id },
      process.env.SESSION_SECRET,
      { expiresIn: "24h" }
    );

    // Include user role in the response
    res
      .status(200)
      .json({
        message: "Login successful",
        token: token,
        role: foundUser.role,
      });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Failed to login" });
  }
}

async function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId } = req.user;

  const { email, password } = req.body;

  try {
    const existingUser = await user.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email) {
      existingUser.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    await existingUser.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};
