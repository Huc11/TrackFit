import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routes
import calorieRoutes from './routes/calorie.js';
import waterRoutes from './routes/water.js';
import reportRoutes from './routes/reports.js';
import preferencesRoute from './routes/preferences.js'; // ✅ Preferences route

// Import Models & Middleware
import User from './models/User.js';
import authenticate from './middleware/authenticate.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_ATLAS_URI || process.env.MONGO_URI;
if (!mongoURI || !process.env.JWT_SECRET) {
  console.error("❌ Required environment variables (MONGO_URI / JWT_SECRET) are missing.");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log(`✅ MongoDB connected (${mongoURI.includes("localhost") ? "Local" : "Cloud"})`))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api', calorieRoutes);
app.use('/api/water', waterRoutes);
app.use('/report', reportRoutes);
app.use('/api/preferences', preferencesRoute);

// 🔐 Register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// 🔐 Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// 🔎 Get user by ID
app.get('/api/user/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error("❌ Fetch user error:", error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// 📋 Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Fetch users error:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// 🔄 Update user hydration or calorie data
app.put('/api/user', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { hydration, calorie } = req.body;

    if (hydration) {
      user.hydration.goal = hydration.goal || user.hydration.goal;
      user.hydration.current = hydration.current ?? user.hydration.current;
    }

    if (calorie) {
      user.calorie.goal = calorie.goal || user.calorie.goal;
      user.calorie.current = calorie.current ?? user.calorie.current;
      user.calorie.burned = calorie.burned ?? user.calorie.burned;
      user.calorie.foodLog = calorie.foodLog ?? user.calorie.foodLog;
      user.calorie.exerciseLog = calorie.exerciseLog ?? user.calorie.exerciseLog;
    }

    await user.save();
    res.json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error("❌ Update user error:", error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
});

// 🔄 Separate calorie update route
app.put('/api/user/calories', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { calorie } = req.body;

    if (calorie) {
      user.calorie.goal = calorie.goal || user.calorie.goal;
      user.calorie.current = calorie.current ?? user.calorie.current;
      user.calorie.burned = calorie.burned ?? user.calorie.burned;
      user.calorie.foodLog = calorie.foodLog ?? user.calorie.foodLog;
      user.calorie.exerciseLog = calorie.exerciseLog ?? user.calorie.exerciseLog;
    }

    await user.save();
    res.json({ message: 'Calorie data updated successfully' });
  } catch (error) {
    console.error('Failed to update calorie data:', error);
    res.status(500).json({ error: 'Failed to update calorie data' });
  }
});

// 🌐 Serve frontend if in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// 🚀 Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
