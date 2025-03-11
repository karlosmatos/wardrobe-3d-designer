"use client";

import React, { useState, useEffect, useRef } from 'react';
import WardrobeScene from './wardrobe/WardrobeScene';
import WardrobeTypeSelector from './ui/WardrobeTypeSelector';
import DimensionsControl from './ui/DimensionsControl';
import MaterialSelector from './ui/MaterialSelector';
import ComponentsManager from './ui/ComponentsManager';
import PriceSummary from './ui/PriceSummary';

const WardrobeDesigner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'type' | 'dimensions' | 'materials' | 'components'>('type');
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(66); // Default to 66% (2/3)
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isHoveringResizer, setIsHoveringResizer] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  
  const tabs = [
    { id: 'type', label: 'Wardrobe Type' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'materials', label: 'Materials' },
    { id: 'components', label: 'Components' },
  ] as const;
  
  // Check if we're on desktop
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    
    return () => {
      window.removeEventListener('resize', checkIfDesktop);
    };
  }, []);
  
  // Hide tooltip after 5 seconds
  useEffect(() => {
    if (isDesktop) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);
  
  // Handle mouse down on the resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setShowTooltip(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Handle mouse move while dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    
    // Calculate percentage (clamped between 30% and 80%)
    const newWidthPercent = Math.min(Math.max((mouseX / containerWidth) * 100, 30), 80);
    setLeftPanelWidth(newWidthPercent);
  };
  
  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row h-screen bg-gray-100 relative">
      {/* 3D Viewer */}
      <div 
        className="w-full h-1/2 lg:h-full"
        style={isDesktop ? { width: `${leftPanelWidth}%` } : {}}
      >
        <WardrobeScene />
      </div>
      
      {/* Resize Handle */}
      {isDesktop && (
        <div 
          className="absolute top-0 bottom-0 w-6 cursor-col-resize z-10 transition-colors"
          style={{ left: `calc(${leftPanelWidth}% - 12px)` }}
          onMouseDown={handleMouseDown}
          onMouseEnter={() => setIsHoveringResizer(true)}
          onMouseLeave={() => setIsHoveringResizer(false)}
        >
          <div className="h-full flex items-center justify-center">
            <div className={`h-24 w-1.5 rounded-full transition-all ${isHoveringResizer || isDraggingRef.current ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            {(isHoveringResizer || isDraggingRef.current) && (
              <div className="absolute flex flex-col items-center">
                <div className="w-4 h-4 border-t-2 border-l-2 border-blue-500 transform -rotate-45 mb-12"></div>
                <div className="w-4 h-4 border-b-2 border-r-2 border-blue-500 transform -rotate-45 mt-12"></div>
              </div>
            )}
            
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute right-8 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-blue-600"></div>
                Drag to resize panels
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Controls Panel */}
      <div 
        className="w-full h-1/2 lg:h-full overflow-y-auto bg-white shadow-lg"
        style={isDesktop ? { width: `${100 - leftPanelWidth}%` } : {}}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">3D Wardrobe Designer</h1>
          <p className="text-gray-700">Customize your perfect wardrobe</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-center ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-700 font-medium'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'type' && <WardrobeTypeSelector />}
          {activeTab === 'dimensions' && <DimensionsControl />}
          {activeTab === 'materials' && <MaterialSelector />}
          {activeTab === 'components' && <ComponentsManager />}
        </div>
        
        {/* Price Summary (always visible) */}
        <div className="p-4 border-t border-gray-200">
          <PriceSummary />
        </div>
      </div>
    </div>
  );
};

export default WardrobeDesigner; 