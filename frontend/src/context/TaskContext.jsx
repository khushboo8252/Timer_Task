// src/context/TaskContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Re-fetch token if it's updated in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchTasks = async () => {
    if (!token) return; // ✅ No request without token

    try {
      const res = await axios.get("https://timer-backend-jsj5.onrender.com/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Fetch Tasks Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const createTask = async (data) => {
    if (!token) return;

    try {
      const res = await axios.post("https://timer-backend-jsj5.onrender.com/api/tasks", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("❌ Create Task Error:", err.response?.data || err.message);
    }
  };

  const updateTask = async (id, data) => {
    if (!token) return;

    try {
      const res = await axios.put(`https://timer-backend-jsj5.onrender.com/api/tasks/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("❌ Update Task Error:", err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
    if (!token) return;

    try {
      await axios.delete(`https://timer-backend-jsj5.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("❌ Delete Task Error:", err.response?.data || err.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
