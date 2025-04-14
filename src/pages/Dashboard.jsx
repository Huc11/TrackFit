import React from "react";
import { motion } from "framer-motion";
import FeatureTooltip from "../components/FeatureTooltip";
import "../Dashboard.css";
import Reports from "../components/Reports";

const Dashboard = ({ setScreen, caloriesConsumed = 1200, caloriesBurned = 0 }) => {
  const netCalories = caloriesConsumed - caloriesBurned;

  return (
    <motion.div
      className="p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {/* 🧢 Header */}
      <header className="guest-header">
        <div className="guest-title-container">
          <img src="/logo.png" alt="TrackFit Logo" className="guest-logo" />
          <h1 className="guest-title">TrackFit</h1>
        </div>
        <a href="#" className="help-icon">
          <img src="/help-icon.png" alt="Help" className="help-logo" />
        </a>
      </header>

      {/* 🎥 Video Thumbnail */}
      <FeatureTooltip text="Watch a quick overview of TrackFit!">
        <motion.div
          className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 shadow-xl rounded-lg h-40 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-700 text-lg font-medium">Video Thumbnail</p>
        </motion.div>
      </FeatureTooltip>

      {/* 💧 Water & 🔥 Calorie Tracker */}
      <section className="mt-6 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Health Dashboard</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <FeatureTooltip text="Track your daily water intake here!">
            <motion.div
              className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg cursor-pointer shadow-md"
              onClick={() => setScreen("hydration")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-800">Water Intake</p>
              <p className="text-xl font-semibold text-blue-900">8 cups</p>
              <p className="text-xs text-blue-600">Track your hydration goals</p>
            </motion.div>
          </FeatureTooltip>

          <FeatureTooltip text="Monitor your calorie intake!">
            <motion.div
              className="p-4 bg-yellow-100 hover:bg-yellow-200 rounded-lg cursor-pointer shadow-md"
              onClick={() => setScreen("calorie")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-gray-800">Calorie Intake</p>
              <p className="text-xl font-semibold text-yellow-900">{caloriesConsumed} kcal</p>
              <p className="text-xs text-yellow-600">Net: {netCalories} kcal</p>
            </motion.div>
          </FeatureTooltip>
        </div>
      </section>

      {/* 📈 Reports Section */}
      <Reports className="mt-6 bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Reports & Analytics</h2>
      </Reports>

      {/* 🏆 Leaderboard & Rewards */}
      <section className="mt-6 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Collections</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <FeatureTooltip text="View the top performers and track your rank!">
            <motion.div
              className="p-4 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => setScreen("leaderboard")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-md font-semibold mb-2">🏆 Leaderboard</h2>
              <div className="text-sm bg-gray-100 p-2 rounded-md space-y-1">
                <p>🥇 Alice - 4500 pts</p>
                <p>🥈 Bob - 4000 pts</p>
                <p>🥉 Carol - 3800 pts</p>
              </div>
              <p className="text-xs text-blue-600 mt-2">Tap to see full rankings →</p>
            </motion.div>
          </FeatureTooltip>

          <FeatureTooltip text="Tap to view all badges you've earned!">
            <motion.div
              className="p-4 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => setScreen("rewards")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-md font-semibold mb-2">🎖️ Reward Badges</h2>
              <div className="text-sm bg-gray-100 p-2 rounded-md space-y-1">
                <p>🏅 Consistency Champ</p>
                <p>💧 Hydration Hero</p>
                <p>🔥 Calorie Conqueror</p>
              </div>
              <p className="text-xs text-blue-600 mt-2">Tap to view all badges →</p>
            </motion.div>
          </FeatureTooltip>
        </div>
      </section>

      {/* 🙌 Call to Action */}
      <FeatureTooltip text="Sign up to unlock all features!">
        <motion.button
          className="mt-6 w-full bg-black text-white py-2 rounded-lg shadow-md text-lg font-medium"
          onClick={() => setScreen("auth")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Sign Up Here
        </motion.button>
      </FeatureTooltip>

      {/* ⚙️ Footer Quick Links */}
      <footer className="mt-6 flex justify-around text-gray-600">
        {["Settings", "Analytics", "Support"].map((item, i) => (
          <FeatureTooltip key={item} text={`Go to ${item}`}>
            <motion.button
              className="text-sm font-semibold hover:text-indigo-500"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              {item}
            </motion.button>
          </FeatureTooltip>
        ))}
      </footer>

      {/* 📱 Social + Footer */}
      <footer className="footer mt-10">
        <div className="footer-container">
          <div className="footer-social">
            {["facebook", "twitter", "insta", "linkedin"].map((icon, i) => (
              <FeatureTooltip key={icon} text={`Connect on ${icon}`}>
                <a href="#"><img src={`/${icon}.png`} alt={icon} /></a>
              </FeatureTooltip>
            ))}
          </div>

          <div className="footer-nav">
            <FeatureTooltip text="Contact us for more information!">
              <a href="/contact">Contact Us</a>
            </FeatureTooltip>
            <FeatureTooltip text="Sign up to unlock all features!">
              <a href="/signup">Sign Up</a>
            </FeatureTooltip>
            <FeatureTooltip text="Learn more about TrackFit!">
              <a href="/about">About Us</a>
            </FeatureTooltip>
            <FeatureTooltip text="Read our terms and conditions.">
              <a href="/terms">Terms & Conditions</a>
            </FeatureTooltip>
          </div>

          <p className="footer-copyright">
            © {new Date().getFullYear()} TrackFit. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Dashboard;
