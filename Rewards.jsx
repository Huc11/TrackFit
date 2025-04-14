import React from "react";
import { motion } from "framer-motion";
import "../rewards.css";

const Rewards = ({ setScreen }) => {
  const badgeList = [
    {
      id: 1,
      name: "Consistency Champ",
      key: "consistency champ",
      desc: "Logged in 7 days in a row",
    },
    {
      id: 2,
      name: "Hydration Hero",
      key: "hydration hero",
      desc: "Met water goal 5 times",
    },
    {
      id: 3,
      name: "Weekly Warrior",
      key: "weekly warrior",
      desc: "Completed all weekly check-ins",
    },
    {
      id: 4,
      name: "Habit Starter",
      key: "habit starter",
      desc: "Log in 3 days in a row",
    },
    {
      id: 5,
      name: "Streak Keeper",
      key: "streak keeper",
      desc: "Maintain 5-day streak",
    },
    {
      id: 6,
      name: "Mindful Eater",
      key: "mindful eater",
      desc: "Log mindful meals",
    },
    {
      id: 7,
      name: "Quick Logger",
      key: "quick logger",
      desc: "Log progress early or quickly",
    },
    {
      id: 8,
      name: "Hydration Streak",
      key: "hydration streak",
      desc: "Hit hydration goal 7 days in a row",
    },
    {
      id: 9,
      name: "Goal Getter",
      key: "goal getter",
      desc: "Meet all daily goals",
    },
    {
      id: 10,
      name: "Leaderboard Legend",
      key: "leaderboard legend",
      desc: "Top 3 in the leaderboard",
    },
  ];

  // Replace this with your backend logic later
  const unlockedIds = [1, 2, 3];

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
        <h2 className="main-heading">Your Reward Badges</h2>
        <p className="subheading">Celebrate your progress and unlock new goals!</p>
      </div>

      {/* Badge Grid */}
      <div className="badge-grid">
  {badgeList.map((badge) => {
    const isUnlocked = unlockedIds.includes(badge.id);
    const folder = isUnlocked ? "unlocked" : "locked";

    const sanitizeKey = (key) =>
      key.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
      
    const fileName = `${badge.id}. ${sanitizeKey(badge.key)}.png`;

    return (
      <div key={badge.id} className={`badge-card ${isUnlocked ? "achieved" : "locked"}`}>
        <img
          src={`/badges/${folder}/${fileName}`}
          alt={badge.name}
          className="w-12 h-12"
        />
        <h4>{badge.name}</h4>
        <p>{badge.desc}</p>
      </div>
    );
  })}
</div>
         
      {/* Motivation Box */}
      <div className="motivation-box">
        <p>💬 Keep going! More badges await as you build healthy habits!</p>
      </div>
    </motion.div>
  );
};

export default Rewards;
