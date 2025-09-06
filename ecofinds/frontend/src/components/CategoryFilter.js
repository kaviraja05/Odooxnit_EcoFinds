import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const categoryIcons = {
    'Electronics': '📱',
    'Clothing & Fashion': '👗',
    'Home & Garden': '🏠',
    'Books & Media': '📚',
    'Sports & Outdoors': '⚽',
    'Vehicles': '🚗',
    'Automotive': '🔧',
    'Art & Collectibles': '🎨',
    'Musical Instruments': '🎸',
    'Health & Beauty': '💄',
    'Toys & Games': '🎮',
    'Jewelry & Watches': '💎'
  };

  return (
    <div className="mb-6 animate-fadeInUp">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 animate-fadeInLeft">Browse Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <button
          onClick={() => onCategoryChange('')}
          className={`p-4 rounded-lg border transition-all-smooth hover-lift ${
            selectedCategory === '' 
              ? 'bg-eco-green text-white border-eco-green shadow-md animate-glow' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-eco-green hover:shadow-md'
          } animate-fadeInUp animate-delay-100`}
        >
          <div className="text-2xl mb-2 animate-float">🌍</div>
          <div className="text-sm font-medium">All Categories</div>
        </button>
        
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`p-4 rounded-lg border transition-all-smooth hover-lift ${
              selectedCategory === category.id.toString() 
                ? 'bg-eco-green text-white border-eco-green shadow-md animate-glow' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-eco-green hover:shadow-md'
            } animate-fadeInUp`}
            style={{animationDelay: `${(index + 1) * 0.1}s`}}
          >
            <div 
              className="text-2xl mb-2 animate-float" 
              style={{animationDelay: `${index * 0.5}s`}}
            >
              {categoryIcons[category.name] || '📦'}
            </div>
            <div className="text-sm font-medium text-center">
              {category.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
