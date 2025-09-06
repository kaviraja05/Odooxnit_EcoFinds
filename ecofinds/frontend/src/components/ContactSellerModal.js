import React, { useState } from 'react';

const ContactSellerModal = ({ product, isOpen, onClose, user }) => {
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  if (!isOpen || !product) return null;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to contact sellers');
      onClose();
      return;
    }

    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }

    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      setMessageSent(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        setMessageSent(false);
        setMessage('');
        onClose();
      }, 3000);
    }, 1500);
  };

  if (messageSent) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-4">
              Your message has been sent to {product.seller.username}. They will get back to you soon!
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Expected response:</strong> Within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Contact Seller</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Product Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop';
              }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <p className="text-eco-green font-bold">${product.price}</p>
              <p className="text-sm text-gray-500">Sold by: {product.seller.username}</p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Seller Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span>👤</span>
              <span>{product.seller.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span>{product.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⭐</span>
              <span>4.8/5 (127 reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Usually responds within 2 hours</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSendMessage}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Method
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={contactMethod === 'email'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="mr-2"
                />
                📧 Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="message"
                  checked={contactMethod === 'message'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="mr-2"
                />
                💬 In-app Message
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in your product. Is it still available?"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent resize-none"
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Be polite and specific about your interest in the product
            </p>
          </div>

          {/* Quick Message Templates */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Templates
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Hi! Is this item still available?",
                "What's the condition of this item?",
                "Can you provide more details about this product?",
                "Would you consider a lower price?",
                "When would be a good time to pick this up?"
              ].map((template, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMessage(template)}
                  className="text-left text-sm text-eco-green hover:text-eco-dark p-2 rounded hover:bg-green-50 transition-colors"
                >
                  "{template}"
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="flex-1 bg-eco-green hover:bg-eco-dark text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSellerModal;
