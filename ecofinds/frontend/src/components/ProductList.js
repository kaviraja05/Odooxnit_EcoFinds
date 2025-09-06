import React, { useState, useEffect, useCallback } from 'react';
import { productsAPI } from '../api';
import CategoryFilter from './CategoryFilter';
import PurchaseModal from './PurchaseModal';
import ContactSellerModal from './ContactSellerModal';
import ProductDetailModal from './ProductDetailModal';
import LoadingSkeleton from './LoadingSkeleton';

const ProductList = ({ user, heroSearchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('-created_at');
  const [error, setError] = useState(null);
  
  // Modal states
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Update search term when hero search changes
  useEffect(() => {
    if (heroSearchTerm) {
      setSearchTerm(heroSearchTerm);
    }
  }, [heroSearchTerm]);

  // Modal handlers
  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowPurchaseModal(true);
  };

  const handleContactSeller = (product) => {
    setSelectedProduct(product);
    setShowContactModal(true);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
    setSelectedProduct(null);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedProduct(null);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  // Delete product handler
  const handleDeleteProduct = async (productId, productTitle) => {
    try {
      await productsAPI.deleteProduct(productId);
      
      // Remove the product from the local state
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      
      // Show success message
      alert(`✅ "${productTitle}" has been deleted successfully!`);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ Failed to delete product. Please try again.');
      return Promise.reject(error);
    }
  };

  // Edit product handler (placeholder for future functionality)
  const handleEditProduct = (product) => {
    // For now, we'll just show an alert. Later this can be expanded to open an edit modal
    alert(`Edit functionality for "${product.title}" - Coming soon!`);
  };

  // Debounced search function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const fetchProducts = useCallback(async (search = '', category = '', ordering = '-created_at') => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (search && search.trim()) {
        params.search = search.trim();
      }
      if (category && category !== '') {
        params.category = category;
      }
      if (ordering) {
        params.ordering = ordering;
      }
      
      console.log('Fetching products with params:', params);
      
      const response = await productsAPI.getProducts(params);
      const productsData = response.data.results || response.data;
      setProducts(productsData);
      
      console.log('Products fetched:', productsData.length);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced version of fetchProducts
  const debouncedFetchProducts = useCallback(
    debounce((search, category, ordering) => {
      fetchProducts(search, category, ordering);
    }, 300),
    [fetchProducts]
  );

  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Initial load
  }, [fetchProducts]);

  useEffect(() => {
    debouncedFetchProducts(searchTerm, selectedCategory, sortBy);
  }, [searchTerm, selectedCategory, sortBy, debouncedFetchProducts]);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-fadeIn">
        <LoadingSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2 text-red-600">Error Loading Products</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={() => fetchProducts(searchTerm, selectedCategory, sortBy)}
          className="bg-eco-green text-white px-6 py-2 rounded-lg hover:bg-eco-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
          >
            <option value="-created_at">📅 Newest First</option>
            <option value="created_at">📅 Oldest First</option>
            <option value="price">💰 Price: Low to High</option>
            <option value="-price">💰 Price: High to Low</option>
            <option value="title">🔤 A to Z</option>
            <option value="-title">🔤 Z to A</option>
          </select>
        </div>
      </div>
      
      {/* Search Results Info */}
      {!loading && (
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm text-gray-600">
            {searchTerm || selectedCategory ? (
              <span>
                Found {products.length} product{products.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedCategory && ` in selected category`}
              </span>
            ) : (
              <span>Showing {products.length} product{products.length !== 1 ? 's' : ''}</span>
            )}
          </div>
          
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="text-sm text-eco-green hover:text-eco-dark font-medium transition-colors"
            >
              ✕ Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or browse different categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            // Calculate simulated discount
            const originalPrice = (product.price * (1 + Math.random() * 0.5 + 0.2)).toFixed(2);
            const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
            
            // Condition badge styling
            const getConditionBadge = (condition) => {
              const badges = {
                'excellent': 'bg-emerald-100 text-emerald-800 border-emerald-200',
                'good': 'bg-blue-100 text-blue-800 border-blue-200',
                'fair': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                'poor': 'bg-red-100 text-red-800 border-red-200'
              };
              return badges[condition] || badges['good'];
            };

            return (
              <div 
                key={product.id} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all-smooth transform hover:-translate-y-2 hover-glow animate-fadeInUp`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Image Container - Clickable */}
                <div 
                  className="relative cursor-pointer"
                  onClick={() => handleViewDetails(product)}
                >
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl">📦</span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    {/* Eco Badge */}
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Eco {85 + Math.floor(Math.random() * 15)}%
                    </span>
                    
                    {/* Your Product Badge */}
                    {user && product.seller && product.seller.id === user.id && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Your Product
                      </span>
                    )}
                  </div>
                  
                  {/* Discount Badge */}
                  {discount > 10 && (
                    <div className="absolute top-3 right-12">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {discount}% off
                      </span>
                    </div>
                  )}
                  
                  {/* Heart Icon */}
                  <button 
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                    }}
                  >
                    <span className="text-gray-400 hover:text-red-500 transition-colors">♡</span>
                  </button>
                </div>

                {/* Content - Also clickable */}
                <div className="p-4">
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewDetails(product)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-eco-green transition-colors">{product.title}</h3>
                    
                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        {discount > 10 && (
                          <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getConditionBadge(product.condition)}`}>
                        {product.condition}
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(4)}{'☆'.repeat(1)}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">({20 + Math.floor(Math.random() * 80)})</span>
                    </div>
                    
                    {/* Seller Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>by {product.seller.username}</span>
                      <span>📍 {product.location}</span>
                    </div>
                    
                    {/* Category Badge */}
                    {product.category && (
                      <div className="mb-3">
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {product.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all"
                    >
                      💳 Buy Now
                    </button>
                    <button 
                      onClick={() => handleContactSeller(product)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                      title="Contact Seller"
                    >
                      💬
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Purchase Modal */}
      <PurchaseModal
        product={selectedProduct}
        isOpen={showPurchaseModal}
        onClose={closePurchaseModal}
        user={user}
      />
      
      {/* Contact Seller Modal */}
      <ContactSellerModal
        product={selectedProduct}
        isOpen={showContactModal}
        onClose={closeContactModal}
        user={user}
      />
      
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={showDetailModal}
        onClose={closeDetailModal}
        onBuyNow={handleBuyNow}
        onContactSeller={handleContactSeller}
        user={user}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default ProductList;
