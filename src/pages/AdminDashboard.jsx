import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./AdminDashboard.css";

const mockUsers = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
    role: "regular",
    createdAt: "2023-01-15T10:30:00Z",
    hydration: { goal: 2000, current: 1500 },
    calorie: {
      goal: 2500,
      current: 1800,
      burned: 400,
      foodLog: [
        { food: "Breakfast", calories: 500 },
        { food: "Lunch", calories: 700 },
        { food: "Dinner", calories: 600 },
      ],
      exerciseLog: [
        { exercise: "Running", calories: 250 },
        { exercise: "Gym workout", calories: 150 },
      ],
    },
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    isActive: true,
    role: "premium",
    createdAt: "2023-02-20T14:20:00Z",
    hydration: { goal: 2500, current: 2200 },
    calorie: { goal: 2000, current: 1600, burned: 600 },
  },
  {
    _id: "3",
    name: "Guest User",
    email: "guest@example.com",
    isActive: false,
    role: "guest",
    createdAt: "2023-03-10T09:15:00Z",
    hydration: { goal: 1800, current: 800 },
    calorie: { goal: 2200, current: 1900, burned: 300 },
  },
  {
    _id: "4",
    name: "Admin User",
    email: "admin@example.com",
    isActive: true,
    role: "admin",
    createdAt: "2022-12-05T11:45:00Z",
    hydration: { goal: 2200, current: 1900 },
    calorie: { goal: 2300, current: 2100, burned: 500 },
  },
];

const AdminDashboard = ({ setScreen }) => {
  const [users] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.isActive).length,
    guestUsers: users.filter((user) => user.role === "guest").length,
    premiumUsers: users.filter((user) => user.role === "premium").length,
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserData(user);
    setEditMode(false);
  };

  const handleUserSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleHydrationChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      hydration: {
        ...userData.hydration,
        [name]: parseInt(value, 10),
      },
    });
  };

  const handleCalorieChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      calorie: {
        ...userData.calorie,
        [name]: parseInt(value, 10),
      },
    });
  };

  const handleSaveChanges = () => {
    setSelectedUser(userData);
    setEditMode(false);
    alert("User data updated successfully!");
  };

  const userActivityData = [
    { name: "Active Users", value: stats.activeUsers },
    { name: "Inactive Users", value: stats.totalUsers - stats.activeUsers },
  ];

  const userTypeData = [
    {
      name: "Regular Users",
      value: stats.totalUsers - stats.guestUsers - stats.premiumUsers,
    },
    { name: "Guest Users", value: stats.guestUsers },
    { name: "Premium Users", value: stats.premiumUsers },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <motion.div
      className="admin-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <header className="admin-header">
        <div className="admin-title-container">
          <img src="/logo.png" alt="TrackFit Logo" className="admin-logo" />
          <h1 className="admin-title">TrackFit Admin Dashboard</h1>
        </div>
        <div className="admin-actions">
          <button onClick={() => setScreen("guest")} className="view-guest-btn">
            View as Guest
          </button>
          <button
            onClick={() => setScreen("dashboard")}
            className="view-app-btn"
          >
            View App
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              setScreen("adminLogin");
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="admin-content">
        {/* Left Panel - User List */}
        <div className="admin-panel users-panel">
          <h2>Users Management</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleUserSearch}
              className="search-input"
            />
          </div>

          <div className="users-list">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`user-item ${
                    selectedUser?._id === user._id ? "selected" : ""
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="user-avatar">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <div className="user-info">
                    <h3>{user.name || "Unknown User"}</h3>
                    <p>{user.email}</p>
                    <span
                      className={`user-status ${
                        user.isActive ? "active" : "inactive"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className={`user-role ${user.role}`}>
                      {user.role || "Regular"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-users">No users found</div>
            )}
          </div>
        </div>

        {/* Middle Panel - User Details & Edit */}
        <div className="admin-panel user-details-panel">
          {selectedUser ? (
            <>
              <div className="panel-header">
                <h2>{editMode ? "Edit User" : "User Details"}</h2>
                <button
                  onClick={handleEditToggle}
                  className={editMode ? "cancel-btn" : "edit-btn"}
                >
                  {editMode ? "Cancel" : "Edit"}
                </button>
                {editMode && (
                  <button onClick={handleSaveChanges} className="save-btn">
                    Save Changes
                  </button>
                )}
              </div>

              <div className="user-details-content">
                {editMode ? (
                  <div className="user-edit-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        name="role"
                        value={userData.role || "regular"}
                        onChange={handleInputChange}
                      >
                        <option value="regular">Regular</option>
                        <option value="premium">Premium</option>
                        <option value="admin">Admin</option>
                        <option value="guest">Guest</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="isActive"
                        value={userData.isActive ? "active" : "inactive"}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            isActive: e.target.value === "active",
                          })
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Hydration Settings */}
                    <div className="settings-section">
                      <h3>Hydration Settings</h3>
                      <div className="form-group">
                        <label>Goal (ml)</label>
                        <input
                          type="number"
                          name="goal"
                          value={userData.hydration?.goal || 0}
                          onChange={handleHydrationChange}
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>Current (ml)</label>
                        <input
                          type="number"
                          name="current"
                          value={userData.hydration?.current || 0}
                          onChange={handleHydrationChange}
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Calorie Settings */}
                    <div className="settings-section">
                      <h3>Calorie Settings</h3>
                      <div className="form-group">
                        <label>Goal (kcal)</label>
                        <input
                          type="number"
                          name="goal"
                          value={userData.calorie?.goal || 0}
                          onChange={handleCalorieChange}
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>Current (kcal)</label>
                        <input
                          type="number"
                          name="current"
                          value={userData.calorie?.current || 0}
                          onChange={handleCalorieChange}
                          min="0"
                        />
                      </div>
                      <div className="form-group">
                        <label>Burned (kcal)</label>
                        <input
                          type="number"
                          name="burned"
                          value={userData.calorie?.burned || 0}
                          onChange={handleCalorieChange}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="user-info-display">
                    <div className="user-profile-header">
                      <div className="user-avatar-large">
                        {selectedUser.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h3>{selectedUser.name || "Unknown User"}</h3>
                        <p>{selectedUser.email}</p>
                        <p>
                          Member since:{" "}
                          {new Date(
                            selectedUser.createdAt
                          ).toLocaleDateString()}
                        </p>
                        <div className="user-badges">
                          <span
                            className={`user-status ${
                              selectedUser.isActive ? "active" : "inactive"
                            }`}
                          >
                            {selectedUser.isActive ? "Active" : "Inactive"}
                          </span>
                          <span className={`user-role ${selectedUser.role}`}>
                            {selectedUser.role || "Regular"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="user-stats-grid">
                      <div className="stat-card">
                        <h4>Hydration Goal</h4>
                        <p>{selectedUser.hydration?.goal || 0} ml</p>
                      </div>
                      <div className="stat-card">
                        <h4>Hydration Current</h4>
                        <p>{selectedUser.hydration?.current || 0} ml</p>
                      </div>
                      <div className="stat-card">
                        <h4>Calorie Goal</h4>
                        <p>{selectedUser.calorie?.goal || 0} kcal</p>
                      </div>
                      <div className="stat-card">
                        <h4>Calories Consumed</h4>
                        <p>{selectedUser.calorie?.current || 0} kcal</p>
                      </div>
                      <div className="stat-card">
                        <h4>Calories Burned</h4>
                        <p>{selectedUser.calorie?.burned || 0} kcal</p>
                      </div>
                      <div className="stat-card">
                        <h4>Net Calories</h4>
                        <p>
                          {(selectedUser.calorie?.current || 0) -
                            (selectedUser.calorie?.burned || 0)}{" "}
                          kcal
                        </p>
                      </div>
                    </div>

                    {selectedUser.calorie?.foodLog &&
                      selectedUser.calorie.foodLog.length > 0 && (
                        <div className="log-section">
                          <h3>Food Log</h3>
                          <div className="log-items">
                            {selectedUser.calorie.foodLog.map((item, index) => (
                              <div key={index} className="log-item">
                                <span>{item.food}</span>
                                <span>{item.calories} kcal</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {selectedUser.calorie?.exerciseLog &&
                      selectedUser.calorie.exerciseLog.length > 0 && (
                        <div className="log-section">
                          <h3>Exercise Log</h3>
                          <div className="log-items">
                            {selectedUser.calorie.exerciseLog.map(
                              (item, index) => (
                                <div key={index} className="log-item">
                                  <span>{item.exercise}</span>
                                  <span>{item.calories} kcal</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-user-selected">
              <p>Select a user to view details</p>
            </div>
          )}
        </div>

        {/* Right Panel - Analytics */}
        <div className="admin-panel analytics-panel">
          <h2>Analytics Overview</h2>

          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p>{stats.activeUsers}</p>
              <span className="stat-percentage">
                {stats.totalUsers > 0
                  ? `${Math.round(
                      (stats.activeUsers / stats.totalUsers) * 100
                    )}%`
                  : "0%"}
              </span>
            </div>
            <div className="stat-card">
              <h3>Guest Users</h3>
              <p>{stats.guestUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Premium Users</h3>
              <p>{stats.premiumUsers}</p>
            </div>
          </div>

          <div className="chart-container">
            <h3>User Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userActivityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {userActivityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>User Types</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {userTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="action-buttons">
            <button className="action-btn">Export User Data</button>
            <button className="action-btn">Generate Reports</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
