import React from 'react';

const NavbarSimple = ({ user, onLogout }) => {
  return (
    <nav className="bg-green-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">🌱 Ecofinds</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user.username}!</span>
                <button
                  onClick={onLogout}
                  className="bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <a
                  href="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-white text-green-500 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSimple;
