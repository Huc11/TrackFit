import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import FitnessAuthForm from "./pages/FitnessAuthForm";

const App = () => {
  const [started, setStarted] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle login success and navigate to dashboard
  const handleLoginSuccess = () => {
    navigate("/dashboard"); // Redirect to Dashboard after successful login
  };

  return (
    <Routes>
      <Route
        path="/"
        element={!started ? <SplashScreen onStart={() => setStarted(true)} /> : <HomePage />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/auth"
        element={<FitnessAuthForm onLoginSuccess={handleLoginSuccess} />} // Pass handleLoginSuccess to FitnessAuthForm
      />
    </Routes>
  );
};

export default App;
