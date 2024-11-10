// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold">Namma Veedu</h2>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
