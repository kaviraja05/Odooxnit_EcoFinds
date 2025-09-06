import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg animate-slideInDown">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-eco-green hover-scale transition-all-smooth animate-fadeInLeft">
            <span className="animate-float">🌱</span> Ecofinds
          </Link>
          
          <div className="flex items-center space-x-4 animate-fadeInRight">
            {user ? (
              <>
                <span className="text-gray-700 animate-fadeIn">Welcome, {user.username}!</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all-smooth hover-scale btn-ripple"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-eco-green transition-all-smooth hover-scale"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-eco-green hover:bg-eco-dark text-white px-4 py-2 rounded-lg transition-all-smooth hover-scale btn-ripple animate-glow"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
