import { Router, Request, Response } from "express";
import Team from "../models/Team";

const router = Router();

// GET all teams
router.get("/", async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate("members", "-password");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// GET single team
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate("members", "-password");
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team" });
  }
});

// POST create team
router.post("/", async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: "Failed to create team" });
  }
});

// DELETE team
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team" });
  }
});

export default router;
