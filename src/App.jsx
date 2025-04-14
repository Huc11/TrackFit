import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import SplashScreen from "./pages/SplashScreen";
import GuestPage from "./pages/GuestPage";
import FitnessAuthForm from "./pages/FitnessAuthForm";
import Dashboard from "./pages/Dashboard";
import HydrationTracker from "./pages/HydrationTracker";
import CalorieTracker from "./pages/CalorieTracker";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards"; // ✅ Import included
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [screen, setScreen] = useState("splash");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("authToken") ? true : false; // ✅ Restore login state
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setScreen("dashboard");
  };

  useEffect(() => {
    const protectedScreens = ["dashboard", "hydration", "calorie", "leaderboard"];
    if (protectedScreens.includes(screen) && !isAuthenticated) {
      setScreen("auth");
    }
  }, [screen, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 transition-all">
      <AnimatePresence mode="wait">
        {screen === "splash" && <SplashScreen key="splash" onSelect={setScreen} />}
        {screen === "guest" && <GuestPage key="guest" setScreen={setScreen} />}
        {screen === "auth" && (
          <FitnessAuthForm
            key="auth"
            setScreen={setScreen}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {screen === "login" && (
          <FitnessAuthForm
            key="login"
            setScreen={setScreen}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {screen === "dashboard" && isAuthenticated && (
          <Dashboard key="dashboard" setScreen={setScreen} />
        )}
        {screen === "hydration" && isAuthenticated && (
          <HydrationTracker key="hydration" setScreen={setScreen} />
        )}
        {screen === "calorie" && isAuthenticated && (
          <CalorieTracker key="calorie" setScreen={setScreen} />
        )}
        {screen === "leaderboard" && isAuthenticated && (
          <Leaderboard key="leaderboard" setScreen={setScreen} />
        )}
        {screen === "rewards" && <Rewards key="rewards" setScreen={setScreen} />} {/* ✅ Rewards route */}
        {screen === "adminDashboard" && (
          <AdminDashboard key="adminDashboard" setScreen={setScreen} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
