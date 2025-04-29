import express from "express";

const router = express.Router();

// Route to handle user registration
router.post("/register", (req, res) => {
  res.send("Register route");
});

// Basic route for login
router.post("/login", (req, res) => {
  res.send("Login route");
});

export default router;
