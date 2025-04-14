import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Activity } from "lucide-react";
import "./fitnessAuthForm.css";

// ✅ Improved modal with heading retained
const Modal = ({ message, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Success!</h2>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const FitnessAuthForm = ({ onLoginSuccess, setScreen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      try {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          setModalMessage("Registration successful! Logging you in...");
          setModalVisible(true);
          handleLogin(email, password);
        } else {
          setModalMessage(data.error || "Registration failed.");
          setModalVisible(true);
        }
      } catch {
        setModalMessage("Registration error. Please try again.");
        setModalVisible(true);
      }
    } else {
      handleLogin(email, password);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);

        setModalMessage("Login successful!");
        setModalVisible(true);

        setTimeout(() => {
          setModalVisible(false);
          onLoginSuccess();
          setScreen("dashboard");
        }, 1500);
      } else {
        setModalMessage(data.error || "Login failed.");
        setModalVisible(true);
      }
    } catch {
      setModalMessage("Login error. Please try again.");
      setModalVisible(true);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <div className="auth-container">
      {modalVisible && <Modal message={modalMessage} onClose={closeModal} />}
      <div className={`auth-left-panel ${isLogin ? "login-animation" : "register-animation"}`}>
        <div className="auth-overlay"></div>
        <div className="auth-content">
          <Activity className="auth-icon" />
          <h2 className="auth-title">Healthy Living, Active Fitness</h2>
          <p className="auth-subtitle">Join us and start your wellness journey</p>
        </div>
        <div className="auth-gradient"></div>
      </div>

      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-header">
            <div className="auth-logo-container">
              <img src="./logo.jpeg" alt="TrackFit Logo" className="auth-logo" />
              <h1 className="auth-logo-text">TrackFit</h1>
            </div>
            <p className="auth-tagline">Your Fitness Partner</p>
          </div>

          <h2 className="auth-welcome">{isLogin ? "Welcome Back" : "Create New Account"}</h2>

          <div className="auth-tabs">
            <button className={`auth-tab ${isLogin ? "auth-tab-active" : "auth-tab-inactive"}`} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={`auth-tab ${!isLogin ? "auth-tab-active" : "auth-tab-inactive"}`} onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-form-group">
                <label htmlFor="name" className="auth-label">Username</label>
                <div className="auth-input-wrapper">
                  <div className="auth-input-icon"><User /></div>
                  <input type="text" id="name" required placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} className="auth-input" />
                </div>
              </div>
            )}

            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">Email</label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon"><Mail /></div>
                <input type="email" id="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="password" className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <div className="auth-input-icon"><Lock /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  placeholder={isLogin ? "Enter password" : "Set password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
                <div className="auth-password-toggle">
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="auth-submit-btn">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>
          </form>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <div className="auth-divider-line" />
          </div>

          <div className="auth-social-buttons">
            <button className="auth-social-btn">{/* Add Google/Facebook icons here */}</button>
          </div>

          <p className="auth-toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={toggleForm} className="auth-toggle-link">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
          <p className="text-xs text-gray-400 mt-4 text-center">
            <button
              onClick={() => setScreen("adminDashboard")}
              className="hover:text-gray-600"
            >
              Administrator Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FitnessAuthForm;
