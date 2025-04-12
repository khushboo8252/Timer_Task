import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    const res = await axios.post("https://timer-backend-jsj5.onrender.com/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const register = async (name, email, password) => {
    const res = await axios.post("https://timer-backend-jsj5.onrender.com/api/auth/register", {
      name,
      email,
      password,
    });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};