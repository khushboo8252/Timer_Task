import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
    <h1 className="text-xl font-bold">TimeHero</h1>
    <div>
      <Link to="/" className="px-2">Dashboard</Link>
      <Link to="/login" className="px-2">Login</Link>
      <Link to="/register" className="px-2">Register</Link>
    </div>
  </nav>
);

export default Navbar;