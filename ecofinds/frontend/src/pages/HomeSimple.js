import React from 'react';

const HomeSimple = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-green-500 text-white py-16 rounded-xl mb-8">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Ecofinds</h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover sustainable secondhand treasures and give pre-loved items a new life
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user && (
                <button className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
                  Post a Product
                </button>
              )}
              {!user && (
                <div className="flex gap-4">
                  <a 
                    href="/login" 
                    className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
                  >
                    Login to Post
                  </a>
                  <a 
                    href="/signup" 
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-500"
                  >
                    Join Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Latest Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Sample Product</h3>
              <p className="text-gray-600">This is a test product to verify the layout is working.</p>
              <div className="mt-4">
                <span className="text-green-500 font-bold">$50.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSimple;
