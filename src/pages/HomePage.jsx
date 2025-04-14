import React, { useEffect, useState } from "react";
import FeatureTooltip from "../components/FeatureTooltip";

const HomePage = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const tooltipShown = localStorage.getItem("tooltipShown");
    if (!tooltipShown) {
      setShowTooltip(true);
      localStorage.setItem("tooltipShown", "true");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {showTooltip && (
        <FeatureTooltip
          text="Welcome back! Explore new features in TrackFit."
          onClose={() => setShowTooltip(false)}
          showInitially={true}
        />
      )}
      <h1 className="text-3xl font-bold text-blue-500">Welcome to TrackFit</h1>
      <p className="text-gray-600 mt-2">This is the Guest Homepage</p>
    </div>
  );
};

export default HomePage;
