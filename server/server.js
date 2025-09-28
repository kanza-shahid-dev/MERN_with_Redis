import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

//Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the built React files
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("listening", PORT);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("db connected"))
    .catch((error) => console.log("DB error", error));
});

//routes
app.use("/api/user", userRoutes);
