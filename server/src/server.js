import "dotenv/config"; 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { authenticate } from "./middleware/authMiddleware.js";
import { requireRole } from "./middleware/roleMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running!"
  });
});

app.use("/api/auth", authRoutes);

app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "You're in", user: req.user });
});

app.get("/api/admin-only", authenticate, requireRole("ADMIN"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("‼️ UNHANDLED REJECTION:", reason);
});