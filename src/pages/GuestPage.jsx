import React, { useEffect, useState } from "react";
import "../guest.css"; // Import CSS file
import FeatureTooltip from "../components/FeatureTooltip";
import UserPreferences from "../components/UserPreferences"; 

const userId = "exampleUserId";
import { useNavigate } from "react-router-dom";

const GuestPage = ({ setScreen }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate(); // 🔹 Added for navigation

  useEffect(() => {
    setShowTooltip(true);
  }, []);

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  const faqs = [
    {
      question: "How do I track my daily water intake?",
      answer: "TrackFit allows you to log your daily water intake and view hydration trends over time."
    },
    {
      question: "Is there a reminder for drinking water?",
      answer: "Yes! TrackFit provides customizable reminders to help you stay hydrated throughout the day."
    },
    {
      question: "Can I sync data with other fitness apps?",
      answer: "Yes, TrackFit integrates with major fitness apps like Apple Health and Google Fit."
    }
  ];

  return (
    <div className="guest-container">
      {showTooltip && (
        <FeatureTooltip
          text="Explore TrackFit features! Sign up to save your progress."
          onClose={handleTooltipClose}
          showInitially={true}
          className="guest-tooltip"
        />
      )}

      {/* Header */}
      <header className="guest-header">
        <div className="guest-title-container">
          <img src="/logo.png" alt="TrackFit Logo" className="guest-logo" />
          <h1 className="guest-title">TrackFit</h1>
        </div>
        <a href="#" className="help-icon">
          <img src="/help-icon.png" alt="Help" className="help-logo" />
        </a>
      </header>

      {/* Welcome Text */}
      <div className="guest-content">
        <h1 className="welcome-text">Welcome, Guest User!</h1>
      </div>

      {/* Promotion Section */}
      <div className="promotion-section">
        <div className="promo-discount">%</div>
        <div className="promo-text">
          <h3>Special Promotion!</h3>
          <p>Enjoy exclusive discounts on fitness plans. Limited time only!</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="main-content">
        <div className="trackfit-features">
          <h2>Why Use TrackFit to Manage Your Water Hydration?</h2>
          <div className="feature-container">

            <FeatureTooltip text="Track your calorie intake with ease!">
              <div
                className="feature-box"
                style={{ cursor: "pointer" }}
                onClick={() => setScreen("calorie")}
              >
                <span role="img" aria-label="fire">🔥</span> Track Your Calories
              </div>
            </FeatureTooltip>

            <FeatureTooltip text="Monitor your hydration levels daily!">
              <div
                className="feature-box"
                style={{ cursor: "pointer" }}
                onClick={() => setScreen("hydration")}
              >
                <span role="img" aria-label="water-drop">💧</span> Track Your Hydration Level
              </div>
            </FeatureTooltip>

            <FeatureTooltip text="Get detailed reports on your progress!">
              <div className="feature-box">
                <span role="img" aria-label="chart">📊</span> Get Reports
              </div>
            </FeatureTooltip>
          </div>
        </div>

        {/* Signup Section */}
        <div className="signup-section">
          <h3>Join TrackFit Today</h3>
          <p>Unlock all features by signing up!</p>
          <FeatureTooltip text="Sign up now to access all features!">
            <a href="/signup" className="signup-btn">Sign Up</a>
          </FeatureTooltip>
        </div>
        
      </div>
      
      {/* User Preference */}
      <div className="preferences-panel">
        <UserPreferences userId={userId} />
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question} {openIndex === index ? "▲" : "▼"}
              </button>
              {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Glimpse Section */}
      <div className="dashboard-container">
        <div className="dashboard-left">
          <img src="/giff.gif" alt="Animated Glimpse" className="dashboard-gif" />
        </div>
        <div className="dashboard-right">
          <h2 className="dashboard-title">Get a Glimpse of Your Health Insights</h2>
          <img src="/Dash.jpg" alt="TrackFit Dashboard" className="dashboard-image" />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
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
    </div>
  );
};

export default GuestPage;
