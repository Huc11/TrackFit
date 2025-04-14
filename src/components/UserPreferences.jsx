import { useState, useEffect } from "react";

const UserPreferences = ({ userId }) => {
  const [preferences, setPreferences] = useState({
    waterTracking: false,
    calorieTracking: false,
  });

  const isGuest = !userId || userId === "guest"; // Handling guest users

  useEffect(() => {
    if (!isGuest) {
      fetch(`http://localhost:5000/api/preferences/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) setPreferences(data);
        })
        .catch((error) => console.error("Error fetching preferences:", error));
    }
  }, [userId]);

  const handleChange = (e) => {
    if (!isGuest) {
      setPreferences({ ...preferences, [e.target.name]: e.target.checked });
    }
  };

  const handleSubmit = async () => {
    if (isGuest) return;

    try {
      const response = await fetch("http://localhost:5000/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, preferences }),
      });

      if (response.ok) {
        alert("Preferences saved successfully!");
      } else {
        alert("Error saving preferences.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="preferences-container">
      <h3 className="preferences-title">
        Select Your Tracking Preferences {isGuest && "(Only for Members*)"}
      </h3>

      <div className="preferences-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="waterTracking"
            checked={preferences.waterTracking}
            onChange={handleChange}
            disabled={isGuest}
          />
          Track Water Intake
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="calorieTracking"
            checked={preferences.calorieTracking}
            onChange={handleChange}
            disabled={isGuest}
          />
          Track Calorie Intake
        </label>
        
        <button className="preferences-btn" onClick={handleSubmit}>
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;
