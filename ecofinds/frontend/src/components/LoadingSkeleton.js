import React from 'react';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div 
          key={index} 
          className={`bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp`}
          style={{animationDelay: `${index * 0.1}s`}}
        >
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-gray-200 shimmer"></div>
          
          {/* Content Skeleton */}
          <div className="p-4">
            {/* Title */}
            <div className="h-4 bg-gray-200 rounded shimmer mb-3"></div>
            <div className="h-4 bg-gray-200 rounded shimmer mb-4" style={{width: '70%'}}></div>
            
            {/* Price and condition */}
            <div className="flex justify-between items-center mb-3">
              <div className="h-6 bg-gray-200 rounded shimmer" style={{width: '60px'}}></div>
              <div className="h-5 bg-gray-200 rounded-full shimmer" style={{width: '80px'}}></div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded shimmer ml-2" style={{width: '40px'}}></div>
            </div>
            
            {/* Seller info */}
            <div className="flex justify-between text-sm mb-3">
              <div className="h-3 bg-gray-200 rounded shimmer" style={{width: '80px'}}></div>
              <div className="h-3 bg-gray-200 rounded shimmer" style={{width: '60px'}}></div>
            </div>
            
            {/* Category badge */}
            <div className="mb-3">
              <div className="h-5 bg-gray-200 rounded-full shimmer" style={{width: '100px'}}></div>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <div className="flex-1 h-8 bg-gray-200 rounded-lg shimmer"></div>
              <div className="w-12 h-8 bg-gray-200 rounded-lg shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
