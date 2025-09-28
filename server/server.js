import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.listen(PORT, () => {
  console.log("listening", PORT);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("db connected"))
    .catch((error) => console.log("DB error", error));
});

//routes
app.use("/api/user", userRoutes);
