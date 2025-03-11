"use client";

import React, { useEffect, useRef } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import useWardrobeStore from '../../store/wardrobeStore';
import { WardrobeConfiguration } from '../../types/wardrobe';

const PriceSummary: React.FC = () => {
  const { configuration, calculatePrice, loadConfiguration } = useWardrobeStore();
  const { price, type, dimensions, components } = configuration;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Recalculate price when configuration changes
  useEffect(() => {
    calculatePrice();
  }, [type, dimensions, components, calculatePrice]);
  
  // Function to save the current design as a JSON file
  const handleSaveDesign = () => {
    // Create a JSON blob from the current configuration
    const configToSave = {
      ...configuration,
      savedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(configToSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `wardrobe-design-${configuration.id.slice(0, 8)}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Function to trigger the file input click
  const handleLoadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Function to handle the file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const loadedConfig = JSON.parse(content) as WardrobeConfiguration;
        
        // Load the configuration into the store
        loadConfiguration(loadedConfig);
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error loading design:', error);
        alert('Failed to load design. The file might be corrupted or in an invalid format.');
      }
    };
    
    reader.readAsText(file);
  };
  
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
      
      <div className="mt-4 space-y-2">
        <button
          onClick={handleSaveDesign}
          className="w-full py-2 flex items-center justify-center gap-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          <span>Save Design</span>
        </button>
        
        <button
          onClick={handleLoadButtonClick}
          className="w-full py-2 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <ArrowUpTrayIcon className="h-5 w-5" />
          <span>Load Design</span>
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default PriceSummary; 