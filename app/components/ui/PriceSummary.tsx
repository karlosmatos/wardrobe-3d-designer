"use client";

import React, { useEffect } from 'react';
import useWardrobeStore from '../../store/wardrobeStore';

const PriceSummary: React.FC = () => {
  const { configuration, calculatePrice } = useWardrobeStore();
  const { price, type, dimensions, components } = configuration;
  
  // Recalculate price when configuration changes
  useEffect(() => {
    calculatePrice();
  }, [type, dimensions, components, calculatePrice]);
  
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Price Summary</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-700">Wardrobe Type:</span>
          <span className="font-medium text-gray-900">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-700">Dimensions:</span>
          <span className="font-medium text-gray-900">
            {dimensions.width} × {dimensions.height} × {dimensions.depth} cm
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-700">Components:</span>
          <span className="font-medium text-gray-900">{components.length}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-800">Total Price:</span>
            <span className="font-bold text-blue-700">${price}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button
          className="w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Save Design
        </button>
      </div>
    </div>
  );
};

export default PriceSummary; 