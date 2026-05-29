import { Router, Request, Response } from "express";
import Activity from "../models/Activity";

const router = Router();

// GET all activities
router.get("/", async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate("user", "-password");
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// GET single activity
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate("user", "-password");
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});

// POST create activity
router.post("/", async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: "Failed to create activity" });
  }
});

// DELETE activity
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete activity" });
  }
});

export default router;
