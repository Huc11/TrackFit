import React, { useEffect, useState } from "react";
import "../featureTooltip.css"; // Import CSS for styling

const FeatureTooltip = ({ text, onClose, showInitially, className, children }) => {
  const [visible, setVisible] = useState(showInitially);

  useEffect(() => {
    if (!showInitially) {
      setVisible(false);
    }
  }, [showInitially]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className="feature-tooltip-container">
      {children}
      {visible && (
        <div className={`feature-tooltip ${className || ""}`}>
          <div className="tooltip-content">
            <p>{text}</p>
            <button onClick={handleClose}>Got it!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureTooltip;
