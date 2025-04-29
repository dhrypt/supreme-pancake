import express from "express";
import { registerUser } from "../controllers/authController";

const router = express.Router();

// Route to handle user registration
router.post("/register", registerUser);

// Basic route for login
router.post("/login", (req, res) => {
  res.send("Login route");
});

export default router;
