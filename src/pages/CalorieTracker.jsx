import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import "../calorie.css";

const CalorieTracker = ({ setScreen }) => {
  const [calorieGoal, setCalorieGoal] = useState(2500);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [foodInput, setFoodInput] = useState("");
  const [calorieInput, setCalorieInput] = useState("");
  const [exerciseInput, setExerciseInput] = useState("");
  const [burnedInput, setBurnedInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [foodLog, setFoodLog] = useState([]);
  const [exerciseLog, setExerciseLog] = useState([]);

  const netCalories = caloriesConsumed - caloriesBurned;
  const remainingCalories = Math.max(calorieGoal - netCalories, 0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("Token:", token);
    console.log("UserId:", userId);
    if (!token || !userId) {
      setScreen("auth");
      return;
    }

    axios.get(`http://localhost:5000/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      const { calorie } = response.data;
      setCalorieGoal(calorie.goal || 2500);
      setCaloriesConsumed(calorie.current || 0);
      setFoodLog(calorie.foodLog || []);
      setExerciseLog(calorie.exerciseLog || []);
      setCaloriesBurned(calorie.burned || 0);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching user data", error);
      setIsLoading(false);
    });
  }, [setScreen]);

  const addFood = () => {
    if (!foodInput || !calorieInput) return;

    const foodCalories = parseInt(calorieInput);
    if (isNaN(foodCalories)) return;

    const newFoodLog = [...foodLog, { food: foodInput, calories: foodCalories }];
    const newCaloriesConsumed = caloriesConsumed + foodCalories;

    setFoodLog(newFoodLog);
    setCaloriesConsumed(newCaloriesConsumed);
    setFoodInput("");
    setCalorieInput("");
    updateCalorieData(newCaloriesConsumed, caloriesBurned, newFoodLog, exerciseLog);
  };

  const addExercise = () => {
    if (!exerciseInput || !burnedInput) return;

    const exerciseCalories = parseInt(burnedInput);
    if (isNaN(exerciseCalories)) return;

    const newExerciseLog = [...exerciseLog, { activity: exerciseInput, calories: exerciseCalories }];
    const newCaloriesBurned = caloriesBurned + exerciseCalories;

    setExerciseLog(newExerciseLog);
    setCaloriesBurned(newCaloriesBurned);
    setExerciseInput("");
    setBurnedInput("");
    updateCalorieData(caloriesConsumed, newCaloriesBurned, foodLog, newExerciseLog);
  };

  const updateCalorieData = (consumed, burned, foodLog, exerciseLog) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    axios.put(
      `http://localhost:5000/api/user/${userId}`,
      {
        calorie: { goal: calorieGoal, current: consumed, burned, foodLog, exerciseLog }
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ).catch((error) => console.error("Update error:", error));
  };

  const chartData = [
    { name: "Consumed", value: caloriesConsumed },
    { name: "Burned", value: caloriesBurned },
    { name: "Net", value: netCalories },
  ];

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <motion.div
      className="calorie-container"
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

      <h2 className="calorie-heading">Calorie Tracker</h2>

      <div className="calorie-summary">
        <div className="summary-card goal">
          <h3>Daily Goal</h3>
          <p>{calorieGoal} kcal</p>
        </div>
        <div className="summary-card consumed">
          <h3>Consumed</h3>
          <p>{caloriesConsumed} kcal</p>
        </div>
        <div className="summary-card burned">
          <h3>Burned</h3>
          <p>{caloriesBurned} kcal</p>
        </div>
        <div className={`summary-card ${remainingCalories > 0 ? 'remaining' : 'over'}`}>
          <h3>{remainingCalories > 0 ? "Remaining" : "Over"}</h3>
          <p>{remainingCalories} kcal</p>
        </div>
      </div>

      <div className="calorie-chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} kcal`, ""]} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Calories">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === "Consumed"
                      ? "#ff6384"
                      : entry.name === "Burned"
                      ? "#36a2eb"
                      : "#ffcd56"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="calorie-input-sections">
        <div className="food-input">
          <h3>Add Food</h3>
          <div className="input-group">
            <input
              type="text"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              placeholder="Food item"
            />
            <input
              type="number"
              value={calorieInput}
              onChange={(e) => setCalorieInput(e.target.value)}
              placeholder="Calories"
              min="0"
            />
            <button onClick={addFood}>Add</button>
          </div>
          <div className="log-container">
            {foodLog.map((item, index) => (
              <div key={index} className="log-item">
                <span>{item.food}</span>
                <span>{item.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>

        <div className="exercise-input">
          <h3>Add Exercise</h3>
          <div className="input-group">
            <input
              type="text"
              value={exerciseInput}
              onChange={(e) => setExerciseInput(e.target.value)}
              placeholder="Exercise"
            />
            <input
              type="number"
              value={burnedInput}
              onChange={(e) => setBurnedInput(e.target.value)}
              placeholder="Calories burned"
              min="0"
            />
            <button onClick={addExercise}>Add</button>
          </div>
          <div className="log-container">
            {exerciseLog.map((item, index) => (
              <div key={index} className="log-item">
                <span>{item.activity}</span>
                <span>-{item.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalorieTracker;
