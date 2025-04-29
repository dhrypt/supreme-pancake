import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // Import auth routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup routes
app.use("/api/auth", authRoutes);

// Default route to check server
app.get("/", (req, res) => res.send("API is running"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.error(err));
