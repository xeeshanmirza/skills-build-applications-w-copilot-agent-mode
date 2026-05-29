import { Router, Request, Response } from "express";
import Leaderboard from "../models/Leaderboard";

const router = Router();

// GET leaderboard (sorted by rank)
router.get("/", async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate("user", "-password");
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// POST add/update leaderboard entry
router.post("/", async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: "Failed to create leaderboard entry" });
  }
});

// DELETE leaderboard entry
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Leaderboard.findByIdAndDelete(req.params.id);
    res.json({ message: "Leaderboard entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete leaderboard entry" });
  }
});

export default router;
