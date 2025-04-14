import express from 'express';
import CalorieEntry from '../models/CalorieEntry.js';
import authenticate from '../middleware/authenticate.js';
import User from '../models/User.js';

const router = express.Router();

// ✅ Utility to calculate calorie totals
const calculateTotals = async (userId) => {
  const entries = await CalorieEntry.find({ userId });
  const totalConsumed = entries
    .filter(e => e.type === 'food')
    .reduce((sum, e) => sum + e.calories, 0);

  const totalBurned = entries
    .filter(e => e.type === 'exercise')
    .reduce((sum, e) => sum + e.calories, 0);

  return {
    entries,
    totalConsumed,
    totalBurned,
    netCalories: totalConsumed - totalBurned,
  };
};

// ✅ Manual Add (for Postman)
router.post('/calorie', async (req, res) => {
  try {
    const { userId, calories, foodItem } = req.body;

    const newEntry = new CalorieEntry({ userId, calories, foodItem });
    await newEntry.save();

    res.status(201).json({ message: 'Calorie entry added!', entry: newEntry });
  } catch (error) {
    console.error('Error adding calorie entry:', error);
    res.status(500).json({ error: 'Failed to add calorie entry' });
  }
});

// ✅ Log food entry (authenticated)
router.post('/user/food', authenticate, async (req, res) => {
  const { item, calories } = req.body;

  try {
    if (!item || !calories || calories <= 0) {
      return res.status(400).json({ error: 'Valid food and calorie amount are required' });
    }

    const newFoodEntry = new CalorieEntry({
      userId: req.user.id,
      item,
      calories,
      type: 'food',
    });

    await newFoodEntry.save();
    const totals = await calculateTotals(req.user.id);

    res.status(201).json({
      message: 'Food entry added',
      entry: newFoodEntry,
      ...totals,
    });
  } catch (err) {
    console.error('Error adding food entry:', err);
    res.status(500).json({ error: 'Failed to add food entry' });
  }
});

// ✅ Log exercise entry (authenticated)
router.post('/user/exercise', authenticate, async (req, res) => {
  const { item, calories } = req.body;

  try {
    if (!item || !calories || calories <= 0) {
      return res.status(400).json({ error: 'Valid exercise and calorie amount are required' });
    }

    const newExerciseEntry = new CalorieEntry({
      userId: req.user.id,
      item,
      calories,
      type: 'exercise',
    });

    await newExerciseEntry.save();
    const totals = await calculateTotals(req.user.id);

    res.status(201).json({
      message: 'Exercise entry added',
      entry: newExerciseEntry,
      ...totals,
    });
  } catch (err) {
    console.error('Error adding exercise entry:', err);
    res.status(500).json({ error: 'Failed to add exercise entry' });
  }
});

// ✅ Update calorie data (authenticated)
router.put('/user/calories', authenticate, async (req, res) => {
  try {
    const { calorie } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (calorie.current !== undefined) {
      user.calorie.current = calorie.current;
    }
    if (calorie.burned !== undefined) {
      user.calorie.burned = calorie.burned;
    }
    if (calorie.foodLog) {
      user.calorie.foodLog = calorie.foodLog;
    }
    if (calorie.exerciseLog) {
      user.calorie.exerciseLog = calorie.exerciseLog.map(entry => ({
        activity: entry.activity,
        calories: entry.calories,
        type: 'exercise',
      }));
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating calorie data:', error);
    res.status(500).json({ error: 'Failed to update calorie entry' });
  }
});

// ✅ Get all calorie entries and totals (authenticated)
router.get('/user/calories', authenticate, async (req, res) => {
  try {
    const totals = await calculateTotals(req.user.id);
    res.json(totals);
  } catch (error) {
    console.error('Error fetching calorie entries:', error);
    res.status(500).json({ error: 'Failed to fetch calorie entries' });
  }
});

// ✅ Get all entries raw (just in case needed)
router.get('/', authenticate, async (req, res) => {
  try {
    const entries = await CalorieEntry.find({ userId: req.user.id });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching calorie entries:', error);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// ✅ Delete entry by ID
router.delete('/user/calories/:id', authenticate, async (req, res) => {
  try {
    const deleted = await CalorieEntry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting calorie entry:', error);
    res.status(500).json({ error: 'Failed to delete calorie entry' });
  }
});

export default router;