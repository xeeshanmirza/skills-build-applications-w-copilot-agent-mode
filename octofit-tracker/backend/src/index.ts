import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activities";
import leaderboardRouter from "./routes/leaderboard";
import workoutsRouter from "./routes/workouts";

const app = express();
const PORT = 8000;

// Codespaces-aware MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/octofit_db";

// Codespaces-aware base URL
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

// CORS for local dev and Codespaces
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// Routes
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

app.get("/", (_req, res) => {
  res.json({ message: "OctoFit Tracker API", baseUrl: BASE_URL });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB: ${MONGODB_URI}`))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
});
