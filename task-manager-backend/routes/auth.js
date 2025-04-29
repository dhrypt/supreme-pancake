import express from "express";
import { loginUser, registerUser } from "../controllers/authController";

const router = express.Router();

// Route to handle user registration
router.post("/register", registerUser);

// Basic route for login
router.post("/login", loginUser);

export default router;
