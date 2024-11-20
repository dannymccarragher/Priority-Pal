// routes/authRoutes.js
const express = require("express");
const { createSecretToken } = require("../utils/SecretToken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Mock user data for testing
  const mockUser = {
    id: "12345",
    email: "test@example.com",
    password: "password123", // Normally, passwords are hashed in a database
  };

  // Simulate user authentication
  if (email === mockUser.email && password === mockUser.password) {
    const token = createSecretToken(mockUser.id);
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
