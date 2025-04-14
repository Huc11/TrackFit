import express from 'express';
import WaterEntry from '../models/waterentry.js';
import authenticate from '../middleware/authenticate.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * ✅ Create a water entry (POST /api/water)
 * Allows: Authenticated users OR manual Postman test via userId
 */
router.post('/', async (req, res) => {
  const { userId, amount, notes } = req.body;
  const resolvedUserId = req.user?.id || userId;

  try {
    if (!resolvedUserId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'User ID and valid amount are required' });
    }

    const newWaterEntry = new WaterEntry({
      userId: resolvedUserId,
      amount,
      notes,
    });

    await newWaterEntry.save();

    // Update hydration.current in the User model
    await User.findByIdAndUpdate(resolvedUserId, {
      $inc: { 'hydration.current': amount },
    });

    res.status(201).json({
      message: 'Water entry added!',
      entry: newWaterEntry,
    });
  } catch (error) {
    console.error('Error adding water entry:', error);
    res.status(500).json({ error: 'Failed to add water entry' });
  }
});

/**
 * 🔍 Get all water entries for the logged-in user
 */
router.get('/user/water', authenticate, async (req, res) => {
  try {
    const waterEntries = await WaterEntry.find({ userId: req.user.id });
    res.json(waterEntries);
  } catch (error) {
    console.error('Error fetching water entries:', error);
    res.status(500).json({ error: 'Failed to fetch water entries' });
  }
});

/**
 * 🛠️ Update hydration data for the logged-in user
 */
router.put('/user/water/:id', authenticate, async (req, res) => {
  try {
    const { hydration } = req.body;

    if (!hydration || hydration.goal === undefined || hydration.current === undefined) {
      return res.status(400).json({ error: 'Both hydration goal and current values must be provided' });
    }

    if (req.params.id !== req.user.id.toString()) {
      return res.status(403).json({ error: 'You can only update your own hydration data' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.hydration.goal = hydration.goal;
    user.hydration.current = hydration.current;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating hydration data:', error);
    res.status(500).json({ error: 'Failed to update hydration data' });
  }
});

/**
 * 🗑️ Delete a water entry by ID and update hydration
 */
router.delete('/user/water/:id', authenticate, async (req, res) => {
  try {
    const deletedEntry = await WaterEntry.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return res.status(404).json({ error: 'Water entry not found' });
    }

    // Optionally decrement hydration.current
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'hydration.current': -deletedEntry.amount },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting water entry:', error);
    res.status(500).json({ error: 'Failed to delete water entry' });
  }
});

export default router;
