// components/Reports.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const Reports = () => {
  const [chartData, setChartData] = useState([]);

  // Replace with dynamic userId if using login token/localStorage in production
  const userId = "67f8b1adc14a0d6ae97ea9a8"; // ← Your test user ID

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/report/${userId}`);
        const { calories, water } = res.data;

        // Group entries by date (yyyy-mm-dd)
        const grouped = {};

        water.forEach((entry) => {
          const date = entry.date?.slice(0, 10);
          if (!grouped[date]) grouped[date] = { calories: 0, water: 0 };
          grouped[date].water += entry.amount || 0;
        });

        calories.forEach((entry) => {
          const date = entry.date?.slice(0, 10);
          if (!grouped[date]) grouped[date] = { calories: 0, water: 0 };
          grouped[date].calories += entry.calories || 0;
        });

        // Convert grouped data into sorted array (latest 7 days)
        const sorted = Object.entries(grouped)
          .sort(([a], [b]) => new Date(b) - new Date(a)) // sort by date desc
          .slice(0, 7) // latest 7 entries
          .reverse() // reverse for chart (old to new)
          .map(([date, values]) => ({
            day: new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
            }), // "Mon", "Tue"...
            ...values,
          }));

        setChartData(sorted);
      } catch (err) {
        console.error("Failed to load report data", err);
      }
    };

    fetchReportData();
  }, []);

  return (
    <motion.section
      className="mt-6 bg-white shadow-md p-4 rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
    >
      <motion.h2
        className="text-lg font-semibold mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Your Weekly Insights
      </motion.h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="water" fill="#3b82f6" name="Water (ml)" />
          <Bar dataKey="calories" fill="#f59e0b" name="Calories (kcal)" />
        </BarChart>
      </ResponsiveContainer>
    </motion.section>
  );
};

export default Reports;