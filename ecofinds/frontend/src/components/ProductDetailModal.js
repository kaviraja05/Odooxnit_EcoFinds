import React, { useState } from 'react';

const ProductDetailModal = ({ product, isOpen, onClose, onBuyNow, onContactSeller, user, onDelete, onEdit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(product.id, product.title);
      setShowDeleteConfirm(false);
      // Modal will be closed by the parent component after successful deletion
    } catch (error) {
      console.error('Delete failed:', error);
      setIsDeleting(false);
      // Error handling is done in the parent component
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (!isOpen || !product) return null;

  // Simulate multiple images for the product
  const images = [
    product.image_url,
    product.image_url, // In a real app, you'd have multiple images
    product.image_url
  ].filter(Boolean);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative mb-4">
                <img
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop';
                  }}
                />
                
                {/* Eco Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-eco-green text-white px-3 py-1 rounded-full text-sm font-medium">
                    Eco {85 + Math.floor(Math.random() * 15)}%
                  </span>
                </div>
                
                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                  <span className="text-gray-400 hover:text-red-500 transition-colors text-lg">♡</span>
                </button>
              </div>
              
              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-eco-green' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-eco-green">${product.price}</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getConditionBadge(product.condition)}`}>
                    {product.condition}
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-lg">
                    {'★'.repeat(4)}{'☆'.repeat(1)}
                  </div>
                  <span className="text-gray-500 ml-2">4.2 ({20 + Math.floor(Math.random() * 80)} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Product Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Condition:</span>
                    <span className="ml-2 font-medium capitalize">{product.condition}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 font-medium">{product.category?.name || 'General'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <span className="ml-2 font-medium">📍 {product.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Posted:</span>
                    <span className="ml-2 font-medium">{new Date(product.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Seller Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-eco-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {product.seller.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.seller.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>⭐ 4.8/5 (127 reviews)</span>
                      <span>🕒 Usually responds within 2 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Tips */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🛡️ Safety Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Meet in a public place for exchanges</li>
                  <li>• Inspect the item before payment</li>
                  <li>• Use secure payment methods</li>
                  <li>• Trust your instincts</li>
                </ul>
              </div>

              {user && product.seller && product.seller.id === user.id ? (
                /* Product Owner Actions */
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-sm">👤</span>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium">This is your product</p>
                        <p className="text-xs text-blue-600">You can edit or delete this listing</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        onClose();
                        onEdit(product);
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                      disabled={isDeleting}
                    >
                      <span className="flex items-center justify-center">
                        ✏️ <span className="ml-2">Edit Product</span>
                      </span>
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                      disabled={isDeleting}
                    >
                      <span className="flex items-center justify-center">
                        {isDeleting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            🗑️ <span className="ml-2">Delete Product</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                  
                  {/* Statistics for owner */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{Math.floor(Math.random() * 50) + 10}</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{Math.floor(Math.random() * 10) + 1}</div>
                      <div className="text-xs text-gray-600">Inquiries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{Math.floor(Math.random() * 5) + 1}</div>
                      <div className="text-xs text-gray-600">Favorites</div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Buyer Actions */
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      onClose();
                      onBuyNow(product);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    💳 Buy Now - ${product.price}
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onContactSeller(product);
                    }}
                    className="px-6 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg font-medium transition-all transform hover:scale-105"
                  >
                    💬 Contact Seller
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                <span className="text-red-600 text-3xl">⚠️</span>
              </div>
              
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete Product</h3>
              <p className="text-center text-gray-600 mb-6">
                Are you sure you want to delete <strong>"{product.title}"</strong>?
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-red-800 mb-2">⚠️ Warning</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• This action cannot be undone</li>
                  <li>• Your product will be permanently removed</li>
                  <li>• All product data and images will be deleted</li>
                  <li>• Interested buyers will no longer see this listing</li>
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Deleting...
                    </span>
                  ) : (
                    'Delete Forever'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailModal;
