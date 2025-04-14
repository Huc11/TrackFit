// frontend/src/pages/HydrationTracker.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import "../hydration.css";

const HydrationTracker = ({ setScreen }) => {
  const [goal, setGoal] = useState(2000);
  const [current, setCurrent] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const remaining = Math.max(goal - current, 0);

  useEffect(() => {
    if (!token || !userId) {
      console.warn("🚫 No token or userId found. Redirecting to auth.");
      setScreen("auth");
      return;
    }

    axios
      .get(`http://localhost:5000/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { hydration } = response.data;
        setGoal(hydration.goal || 2000);
        setCurrent(hydration.current || 0);
      })
      .catch((error) => {
        console.error("Failed to fetch hydration data:", error);
        setError("Authentication failed or data not found.");
        setScreen("auth");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateHydration = (newCurrent) => {
    axios
      .put(
        `http://localhost:5000/api/user/${userId}`,
        { hydration: { goal, current: newCurrent } },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch(() => setError("Failed to update hydration data."));
  };

  const addWater = (amount) => {
    const newAmount = Math.min(current + amount, goal);
    setCurrent(newAmount);
    updateHydration(newAmount);
  };

  const pieData = [
    { name: "Completed", value: current },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = ["#2563eb", "#e5e7eb"];

  if (isLoading) return <div className="loading-spinner">Loading...</div>;

  return (
    <motion.div
      className="hydration-container"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="back-btn-container">
        <button onClick={() => setScreen("dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
      </div>

      <h2 className="hydration-heading">Hydration Tracker</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="hydration-content">
        <div className="hydration-stats">
          <h3>Today's Goal: {goal} ml</h3>
          <p>Completed: {current} ml</p>
          <p>Remaining: {remaining} ml</p>
        </div>

        <div className="hydration-chart">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={60}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} ml`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="hydration-controls">
          <div className="custom-input">
            <input
              type="number"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter ml"
              min="0"
            />
            <button
              onClick={() => {
                const amt = parseInt(customInput);
                if (!isNaN(amt) && amt > 0) {
                  addWater(amt);
                  setCustomInput("");
                } else {
                  setError("Please enter a valid amount.");
                }
              }}
            >
              Add
            </button>
          </div>

          <div className="quick-add-buttons">
            {[250, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => addWater(amt)}
                className="quick-add-btn"
              >
                +{amt}ml
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HydrationTracker;
