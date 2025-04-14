import express from 'express';
import mongoose from 'mongoose';
import Preference from '../models/Preference.js';

const router = express.Router();

// 🔍 GET preferences
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  // 🧠 Validate ObjectId format properly
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const pref = await Preference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ error: "Preferences not found" });
    }

    return res.status(200).json({
      userId: pref.userId,
      preferences: pref.preferences
    });
  } catch (error) {
    console.error("❌ Error fetching preferences:", error);
    return res.status(500).json({ error: "Failed to get preferences" });
  }
});

// ✅ POST or UPDATE preferences
router.post('/', async (req, res) => {
  const { userId, preferences } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  if (!userId || typeof preferences !== 'object' || preferences === null) {
    return res.status(400).json({ error: "Invalid request data: userId and preferences required" });
  }

  const { waterTracking, calorieTracking } = preferences;
  if (
    typeof waterTracking !== 'boolean' ||
    typeof calorieTracking !== 'boolean'
  ) {
    return res.status(400).json({ error: "Preferences must include 'waterTracking' and 'calorieTracking' as boolean values" });
  }

  try {
    let pref = await Preference.findOne({ userId });

    if (pref) {
      pref.preferences = preferences;
    } else {
      pref = new Preference({ userId, preferences });
    }

    await pref.save();

    return res.status(200).json({
      message: "Preferences saved!",
      data: {
        userId: pref.userId,
        preferences: pref.preferences,
      },
    });
  } catch (err) {
    console.error("🔥 Error saving preferences:", err);
    return res.status(500).json({ error: "Failed to save preferences" });
  }
});

export default router;
