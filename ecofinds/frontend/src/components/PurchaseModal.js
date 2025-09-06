import React, { useState } from 'react';

const PurchaseModal = ({ product, isOpen, onClose, user }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  if (!isOpen || !product) return null;

  const totalPrice = (product.price * quantity).toFixed(2);
  const tax = (totalPrice * 0.08).toFixed(2); // 8% tax
  const finalTotal = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to make a purchase');
      onClose();
      return;
    }

    setIsProcessing(true);
    
    // Simulate purchase processing
    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseComplete(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        setPurchaseComplete(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  if (purchaseComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-backdrop">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4 animate-bounceIn">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2 animate-fadeInUp animate-delay-200">Purchase Successful!</h3>
            <p className="text-gray-600 mb-4 animate-fadeInUp animate-delay-300">
              Thank you for your purchase. The seller will contact you soon with delivery details.
            </p>
            <div className="bg-green-50 p-4 rounded-lg animate-fadeInUp animate-delay-400">
              <p className="text-sm text-green-800">
                <strong>Order ID:</strong> #ECO{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-backdrop">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto modal-content">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800 animate-fadeInLeft">Complete Your Purchase</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-all-smooth hover-scale"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Details */}
          <div className="animate-fadeInLeft animate-delay-200">
            <div className="bg-gray-50 p-4 rounded-lg mb-4 hover-lift transition-all-smooth">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-all-smooth hover-scale"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop';
                }}
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-eco-green">${product.price}</span>
                <span className="text-sm text-gray-500 capitalize">{product.condition}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Sold by: {product.seller.username} • 📍 {product.location}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="animate-fadeInRight animate-delay-300">
            <form onSubmit={handlePurchase}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    💳 Credit/Debit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    🅿️ PayPal
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    💵 Cash on Delivery
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({quantity}x)</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>${finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all-smooth hover-scale btn-ripple"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-eco-green hover:bg-eco-dark text-white py-2 px-4 rounded-lg font-medium transition-all-smooth disabled:opacity-50 disabled:cursor-not-allowed hover-scale btn-ripple animate-glow"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </span>
                  ) : (
                    `Complete Purchase - $${finalTotal}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
