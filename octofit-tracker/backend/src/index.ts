import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;
const MONGODB_URI = "mongodb://localhost:27017/octofit";

app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (_req, res) => {
  res.json({ message: "OctoFit Tracker API" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
