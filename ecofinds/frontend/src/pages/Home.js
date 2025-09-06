import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const Home = ({ user }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(0);
  const [heroSearchTerm, setHeroSearchTerm] = useState('');

  const handleProductSuccess = () => {
    setShowProductForm(false);
    setRefreshProducts(prev => prev + 1); // Trigger product list refresh
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16 rounded-xl mb-8 shadow-xl">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Ecofinds</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Discover sustainable secondhand treasures and give pre-loved items a new life
          </p>
          
          {/* Hero Search Form */}
          <form onSubmit={handleHeroSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={heroSearchTerm}
                onChange={(e) => setHeroSearchTerm(e.target.value)}
                placeholder="e.g., 'Vintage bicycle', 'eco-friendly chair', 'handmade jewelry'"
                className="w-full px-6 py-4 text-lg text-gray-800 rounded-full shadow-lg focus:ring-4 focus:ring-green-300 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user && (
              <button
                onClick={() => setShowProductForm(!showProductForm)}
                className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                {showProductForm ? '❌ Cancel Posting' : '➕ Post a Product'}
              </button>
            )}
            {!user && (
              <div className="flex gap-4">
                <a 
                  href="/login" 
                  className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  🔐 Login to Post
                </a>
                <a 
                  href="/signup" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-500 transition-all"
                >
                  🆕 Join Now
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Form */}
      {showProductForm && user && (
        <div className="mb-8 animate-slideInDown">
          <ProductForm
            onSuccess={handleProductSuccess}
            onCancel={() => setShowProductForm(false)}
          />
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover-lift transition-all-smooth animate-fadeInLeft animate-delay-100">
          <div className="text-4xl mb-3 animate-float">🌱</div>
          <div className="text-2xl font-bold text-eco-green mb-1">10K+</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Eco Warriors</h3>
          <p className="text-gray-600 text-sm">Committed to sustainability</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover-lift transition-all-smooth animate-fadeInUp animate-delay-200">
          <div className="text-4xl mb-3 animate-float" style={{animationDelay: '0.5s'}}>💰</div>
          <div className="text-2xl font-bold text-eco-green mb-1">$2M+</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Money Saved</h3>
          <p className="text-gray-600 text-sm">By our community</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover-lift transition-all-smooth animate-fadeInUp animate-delay-300">
          <div className="text-4xl mb-3 animate-float" style={{animationDelay: '1s'}}>🤝</div>
          <div className="text-2xl font-bold text-eco-green mb-1">50K+</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Happy Trades</h3>
          <p className="text-gray-600 text-sm">Successful transactions</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center hover-lift transition-all-smooth animate-fadeInRight animate-delay-400">
          <div className="text-4xl mb-3 animate-float" style={{animationDelay: '1.5s'}}>♻️</div>
          <div className="text-2xl font-bold text-eco-green mb-1">95%</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Waste Reduced</h3>
          <p className="text-gray-600 text-sm">Environmental impact</p>
        </div>
      </div>

      {/* Products Section */}
      <div id="products-section" className="bg-white rounded-xl shadow-lg p-6 animate-fadeInUp animate-delay-500">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Latest Products</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>🔥</span>
            <span>Trending items in your area</span>
          </div>
        </div>
        <ProductList user={user} key={refreshProducts} heroSearchTerm={heroSearchTerm} />
      </div>
      </div>
    </div>
  );
};

export default Home;
