import React from "react";
import { motion } from "framer-motion";
import FeatureTooltip from "../components/FeatureTooltip";
import "../Dashboard.css";
import Reports from "../components/Reports"
const Dashboard = ({ setScreen, caloriesConsumed, caloriesBurned }) => {
  const netCalories = caloriesConsumed - caloriesBurned; // Calculate net calories

  return (
    <motion.div
      className="p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top Header */}
      <header className="guest-header">
        <div className="guest-title-container">
          <img src="/logo.png" alt="TrackFit Logo" className="guest-logo" />
          <h1 className="guest-title">TrackFit</h1>
        </div>
        <a href="#" className="help-icon">
          <img src="/help-icon.png" alt="Help" className="help-logo" />
        </a>
      </header>

  {/* Health Dashboard */}
   <section className="mt-6 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Health Dashboard</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <FeatureTooltip text="Track your daily water intake here!">
            <motion.div
              className="p-4 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => setScreen("hydration")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm">Water Intake</p>
              <p className="text-xl font-semibold">8 cups</p>
              <p className="text-xs text-gray-600">-2 cups</p>
            </motion.div>
          </FeatureTooltip>

          <FeatureTooltip text="Monitor your calorie intake!">
            <motion.div
              className="p-4 bg-gray-200 rounded-md cursor-pointer"
              onClick={() => setScreen("calorie")}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm">Calorie Intake</p>
              <p className="text-xl font-semibold">1200 kcal</p>
              <p className="text-xs text-gray-600">+200 kcal</p>
            </motion.div>
          </FeatureTooltip>
        </div>
      </section>

      {/* Reports & Analytics Section */}
      <Reports className="mt-6 bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Reports & Analytics</h2>
        <motion.div
          className="bg-gradient-to-tr from-sky-100 to-indigo-100 rounded-lg p-4 flex flex-col items-center justify-center shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-800 font-medium mb-2">Weekly Progress Snapshot</p>
          <img
            src="https://placehold.co/300x150?text=Analytics+Graph"
            alt="Analytics Graph"
            className="rounded shadow"
          />
          <p className="text-xs text-gray-500 mt-2">*Dummy data for visual preview</p>
        </motion.div>
      </Reports>
      {/* Collections Section */}
      <section className="mt-6 bg-white shadow-md p-4 rounded-lg">
  <h2 className="text-lg font-semibold">Collections</h2>
  <div className="grid grid-cols-2 gap-4 mt-2">
    {/* Leaderboard Preview */}
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

    {/* Rewards Badge Preview */}
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
        <div className="flex gap-4 items-center justify-center bg-gray-100 p-2 rounded-md">
          {[
            {
              id: 1,
              name: "Consistency Champ",
              key: "consistency champ",
            },
            {
              id: 2,
              name: "Hydration Hero",
              key: "hydration hero",
            },
            {
              id: 3,
              name: "Weekly Warrior",
              key: "weekly warrior",
            },
          ].map((badge) => (
            <img
              key={badge.id}
              src={`/badges/unlocked/${badge.id}. ${badge.key}.png`}
              alt={badge.name}
              title={badge.name}
              className="w-10 h-10"
            />
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">Tap to view all badges →</p>
      </motion.div>
    </FeatureTooltip>
  </div>
</section>


      {/* Footer */}
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
      
            {/* Footer Section from GuestPage */}
            <footer className="footer mt-10">
        <div className="footer-container">
          <div className="footer-social">
            <FeatureTooltip text="Visit our Facebook page!">
              <a href="#"><img src="/facebook.png" alt="Facebook" /></a>
            </FeatureTooltip>
            <FeatureTooltip text="Follow us on Twitter!">
              <a href="#"><img src="/twitter.png" alt="Twitter" /></a>
            </FeatureTooltip>
            <FeatureTooltip text="Check out our Instagram!">
              <a href="#"><img src="/insta.png" alt="Instagram" /></a>
            </FeatureTooltip>
            <FeatureTooltip text="Connect with us on LinkedIn!">
              <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
            </FeatureTooltip>
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
