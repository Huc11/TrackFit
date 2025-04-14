import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../leaderboard.css";

const weeklyData = [
  { day: "Mon", water: 1.5, calories: 2100 },
  { day: "Tue", water: 2.0, calories: 2600 },
  { day: "Wed", water: 1.8, calories: 2500 },
  { day: "Thu", water: 2.1, calories: 2700 },
  { day: "Fri", water: 1.9, calories: 2550 },
  { day: "Sat", water: 2.0, calories: 2650 },
  { day: "Sun", water: 1.7, calories: 2580 },
];

const Leaderboard = ({ setScreen, username = "User" }) => {
  return (
    <>
      <div className="back-btn-container">
        <button 
          onClick={() => setScreen("dashboard")} 
          className="back-button"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="leaderboard-container">
        <div className="welcome-banner">
          <div className="welcome-subheading">
            Welcome, <span className="username">{username}</span> 👋
          </div>
          <h2 className="main-heading">Community Leaderboard</h2>
        </div>

        <div className="nav-buttons">
          <button onClick={() => setScreen("hydration")}>💧 Hydration</button>
          <button onClick={() => setScreen("calorie")}>🔥 Calorie</button>
          <button onClick={() => setScreen("progress")}>📈 Progress</button>
        </div>

        <div className="leaderboard-grid">
          {/* LEFT PANEL */}
          <div className="left-panel">
            <div className="progress-tracker">
              <h4>📅 Weekly Progress</h4>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: "82%" }}>
                  82%
                </div>
              </div>
            </div>

            <div className="checkin-summary">
              <h4>📌 Today's Check-In</h4>
              <p>💧 Water: <strong>1.6L</strong> / 2L</p>
              <p>🔥 Calories: <strong>1520 kcal</strong> / 2500 kcal</p>
            </div>

            <div className="goal-insights">
              <h3>📈 Weekly Goal Insights</h3>
              <ul>
                <li>💧 Water Goal Met: <strong>5/7 days</strong></li>
                <li>🔥 Calorie Goal Met: <strong>6/7 days</strong></li>
                <li>📅 Check-ins Completed: <strong>3/3</strong></li>
              </ul>
            </div>

            <div className="charts-section">
              <h3>📊 Weekly Intake Overview</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "Calories", angle: -90, position: "insideRight" }}
                  />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="water"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                    name="Water Intake"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="calories"
                    stroke="#f97316"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                    name="Calorie Intake"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="right-panel">
            <div className="weekly-challenges">
              <h3>🏅 Weekly Challenges</h3>
              <table className="challenge-table">
                <thead>
                  <tr>
                    <th>Challenge</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Drink 2L of water for 5 days</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>Log at least 1500 kcal/day</td>
                    <td>✅</td>
                  </tr>
                  <tr>
                    <td>Track progress 3 times this week</td>
                    <td>⏳</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="top-performers">
              <h3>🏆 Top Performers</h3>
              <table className="performers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Goal Met</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sarah</td>
                    <td>95%</td>
                  </tr>
                  <tr>
                    <td>John</td>
                    <td>92%</td>
                  </tr>
                  <tr>
                    <td>Ayesha</td>
                    <td>89%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="badges-section">
              <h3>🎖️ Your Badges</h3>
              <div className="badges">
                <span className="badge">🏅 Consistency Champ</span>
                <span className="badge">💧 Hydration Hero</span>
                <span className="badge">🔥 Calorie Conqueror</span>
              </div>
            </div>
          </div>
        </div>

        <div className="motivation-box">
          <p>💬 “You don’t have to be extreme, just consistent.”</p>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
