import React, { useEffect, useState } from "react";
import "../splash.css"; // Import the external CSS file
import Tooltip from "../components/Tooltip";
import FeatureTooltip from "../components/FeatureTooltip";

const SplashScreen = ({ onSelect }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const isGuest = true; // Assume guest user for SplashScreen
    if (isGuest) {
      setShowTooltip(true);
    }
  }, []);

  return (
    <div className="splash-container">
      {showTooltip && (
        <FeatureTooltip
          text="Welcome to TrackFit! Sign up to unlock all features or continue as a guest."
          onClose={() => setShowTooltip(false)}
          showInitially={true}
        />
      )}
      <div className="splash-box">
        <img src="/logo.png" alt="TrackFit Logo" className="splash-logo" />
        <h1 className="splash-title italic">TrackFit</h1>
        <div className="splash-buttons">
            <button className="signup-btn" onClick={() => onSelect("home")}>Sign Up</button>
            <button className="login-btn" onClick={() => onSelect("auth")}>Log In</button>
            <button className="guest-btn" onClick={() => onSelect("guest")}>Continue as Guest</button>
        </div>
        
      </div>
    </div>
  );
};

export default SplashScreen;
