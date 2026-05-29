/**
 * Seed the octofit_db database with test data
 *
 * Usage: npx ts-node src/scripts/seed.ts
 */
import mongoose from "mongoose";
import { connectDatabase } from "../config/database";
import User from "../models/User";
import Team from "../models/Team";
import Activity from "../models/Activity";
import Leaderboard from "../models/Leaderboard";
import Workout from "../models/Workout";

async function seed() {
  await connectDatabase();
  console.log("Seeding octofit_db...");

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  // Seed Users
  const users = await User.insertMany([
    { username: "octofitmaster", email: "master@octofit.dev", password: "hashed_pw_1" },
    { username: "codercat", email: "codercat@octofit.dev", password: "hashed_pw_2" },
    { username: "jellyfish", email: "jellyfish@octofit.dev", password: "hashed_pw_3" },
    { username: "mona_lifts", email: "mona@octofit.dev", password: "hashed_pw_4" },
    { username: "hubot_runs", email: "hubot@octofit.dev", password: "hashed_pw_5" },
  ]);
  console.log(`Seeded ${users.length} users`);

  // Seed Teams
  const teams = await Team.insertMany([
    { name: "Octorunners", members: [users[0]._id, users[1]._id] },
    { name: "Code & Cardio", members: [users[2]._id, users[3]._id] },
    { name: "Push & Pull", members: [users[4]._id, users[0]._id] },
  ]);
  console.log(`Seeded ${teams.length} teams`);

  // Seed Activities
  const activities = await Activity.insertMany([
    { user: users[0]._id, type: "Running", duration: 30, calories: 320, date: new Date() },
    { user: users[1]._id, type: "Cycling", duration: 45, calories: 410, date: new Date() },
    { user: users[2]._id, type: "Swimming", duration: 60, calories: 500, date: new Date() },
    { user: users[3]._id, type: "Weightlifting", duration: 50, calories: 280, date: new Date() },
    { user: users[4]._id, type: "Yoga", duration: 40, calories: 150, date: new Date() },
  ]);
  console.log(`Seeded ${activities.length} activities`);

  // Seed Leaderboard
  const leaderboard = await Leaderboard.insertMany([
    { user: users[0]._id, score: 1500, rank: 1 },
    { user: users[3]._id, score: 1350, rank: 2 },
    { user: users[1]._id, score: 1200, rank: 3 },
    { user: users[2]._id, score: 980, rank: 4 },
    { user: users[4]._id, score: 850, rank: 5 },
  ]);
  console.log(`Seeded ${leaderboard.length} leaderboard entries`);

  // Seed Workouts
  const workouts = await Workout.insertMany([
    {
      name: "Morning Blitz",
      description: "Quick full-body morning workout",
      exercises: [
        { name: "Push-ups", sets: 3, reps: 15 },
        { name: "Squats", sets: 3, reps: 20 },
        { name: "Plank", sets: 3, reps: 1, duration: 60 },
      ],
    },
    {
      name: "Cardio Burst",
      description: "High-intensity cardio session",
      exercises: [
        { name: "Jumping Jacks", sets: 4, reps: 30 },
        { name: "Burpees", sets: 3, reps: 10 },
        { name: "High Knees", sets: 3, reps: 30 },
      ],
    },
    {
      name: "Strength Builder",
      description: "Progressive strength training",
      exercises: [
        { name: "Deadlift", sets: 4, reps: 6 },
        { name: "Bench Press", sets: 4, reps: 8 },
        { name: "Pull-ups", sets: 3, reps: 8 },
      ],
    },
  ]);
  console.log(`Seeded ${workouts.length} workouts`);

  console.log("Seeding complete!");
  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
