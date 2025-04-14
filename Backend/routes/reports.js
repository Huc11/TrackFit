import express from "express";
import CalorieEntry from "../models/CalorieEntry.js";
import WaterEntry from "../models/waterentry.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const calorieLogs = await CalorieEntry.find({ userId }).sort({ date: -1 });
    const waterLogs = await WaterEntry.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      calories: calorieLogs,
      water: waterLogs
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
