import React from "react";
import { motion } from "framer-motion";
import "../rewards.css";

const Rewards = ({ setScreen }) => {
  return (
    <motion.div
      className="rewards-container"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <div className="back-btn-container">
        <button onClick={() => setScreen("dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <div className="rewards-header">
        <h2 className="main-heading">🎖️ Your Reward Badges</h2>
        <p className="subheading">Celebrate your progress and unlock new goals!</p>
      </div>

      {/* Badge Grid */}
      <div className="badge-grid">
        {/* ✅ Achieved Badges */}
        <div className="badge-card achieved">
          <span className="badge-icon">🏅</span>
          <h4>Consistency Champ</h4>
          <p>Logged in 7 days in a row</p>
        </div>
        <div className="badge-card achieved">
          <span className="badge-icon">💧</span>
          <h4>Hydration Hero</h4>
          <p>Met water goal 5 times</p>
        </div>
        <div className="badge-card achieved">
          <span className="badge-icon">🔥</span>
          <h4>Calorie Conqueror</h4>
          <p>Stayed under calorie limit 5 times</p>
        </div>
        <div className="badge-card achieved">
          <span className="badge-icon">📅</span>
          <h4>Weekly Warrior</h4>
          <p>Completed all weekly check-ins</p>
        </div>
        <div className="badge-card achieved">
          <span className="badge-icon">🌟</span>
          <h4>All-Rounder</h4>
          <p>Met all goals in one day</p>
        </div>

        {/* 🔒 Locked Badges */}
        <div className="badge-card locked">
          <span className="badge-icon">📆</span>
          <h4>14-Day Streak</h4>
          <p>Log in for 14 consecutive days</p>
        </div>
        <div className="badge-card locked">
          <span className="badge-icon">📆</span>
          <h4>30-Day Streak</h4>
          <p>Maintain a 30-day streak</p>
        </div>
        <div className="badge-card locked">
          <span className="badge-icon">⏰</span>
          <h4>Early Bird Logger</h4>
          <p>Log progress before 9am</p>
        </div>
        <div className="badge-card locked">
          <span className="badge-icon">🌙</span>
          <h4>Night Owl Logger</h4>
          <p>Log progress after 10pm</p>
        </div>
        <div className="badge-card locked">
          <span className="badge-icon">🧠</span>
          <h4>Mindful Tracker</h4>
          <p>Log progress for 21 days straight</p>
        </div>
      </div>

      {/* Motivation Box */}
      <div className="motivation-box">
        <p>💬 Keep going! More badges await as you build healthy habits!</p>
      </div>
    </motion.div>
  );
};

export default Rewards;
