"use client";

import React, { useState, useEffect, useRef } from 'react';
import useWardrobeStore from '../../store/wardrobeStore';

// Custom number input component with increment/decrement buttons
const NumberInput: React.FC<{
  id: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  hasError: boolean;
}> = ({ id, value, min, max, step = 1, onChange, onBlur, hasError }) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Update input value when external value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);
  
  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };
  
  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleBlur = () => {
    const newValue = parseInt(inputValue);
    if (!isNaN(newValue)) {
      // Clamp the value between min and max
      const clampedValue = Math.min(Math.max(newValue, min), max);
      onChange(clampedValue);
      setInputValue(clampedValue.toString());
    } else {
      // Reset to previous valid value if input is not a number
      setInputValue(value.toString());
    }
    
    if (onBlur) {
      onBlur();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement();
    }
  };
  
  return (
    <div className="flex shadow-sm h-10">
      <button
        type="button"
        onClick={decrement}
        className={`w-10 flex items-center justify-center border rounded-l-md ${
          hasError ? 'border-red-500 bg-red-50' : 'border-gray-400 bg-gray-100'
        } hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-800 font-medium text-lg`}
        aria-label={`Decrease ${id}`}
      >
        −
      </button>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        id={id}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`block w-full border-y text-center text-lg p-0 font-semibold ${
          hasError 
            ? 'border-red-500 focus:border-red-500 bg-red-50 text-red-700' 
            : 'border-gray-400 focus:border-blue-500 bg-white text-gray-900'
        } focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none`}
        aria-label={`${id} value`}
      />
      <button
        type="button"
        onClick={increment}
        className={`w-10 flex items-center justify-center border rounded-r-md ${
          hasError ? 'border-red-500 bg-red-50' : 'border-gray-400 bg-gray-100'
        } hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-800 font-medium text-lg`}
        aria-label={`Increase ${id}`}
      >
        +
      </button>
    </div>
  );
};

const DimensionsControl: React.FC = () => {
  const { configuration, setDimensions } = useWardrobeStore();
  const { dimensions } = configuration;
  
  // Local state for input values
  const [width, setWidth] = useState(dimensions.width);
  const [height, setHeight] = useState(dimensions.height);
  const [depth, setDepth] = useState(dimensions.depth);
  
  // Validation state
  const [errors, setErrors] = useState({
    width: false,
    height: false,
    depth: false
  });
  
  // Debounce timer for auto-applying changes
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update local state when configuration changes
  useEffect(() => {
    setWidth(dimensions.width);
    setHeight(dimensions.height);
    setDepth(dimensions.depth);
    
    // Reset errors when configuration changes
    setErrors({
      width: false,
      height: false,
      depth: false
    });
  }, [dimensions]);
  
  // Validate dimensions
  const validateDimensions = () => {
    const newErrors = {
      width: width < 50 || width > 400,
      height: height < 100 || height > 300,
      depth: depth < 30 || depth > 300
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };
  
  // Apply changes to the store with debounce
  const applyChangesWithDebounce = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (validateDimensions()) {
        setDimensions({
          width,
          height,
          depth,
        });
      }
    }, 500); // 500ms debounce
  };
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  // Handle input changes
  const handleWidthChange = (value: number) => {
    setWidth(value);
    setErrors(prev => ({ ...prev, width: value < 50 || value > 400 }));
    applyChangesWithDebounce();
  };
  
  const handleHeightChange = (value: number) => {
    setHeight(value);
    setErrors(prev => ({ ...prev, height: value < 100 || value > 300 }));
    applyChangesWithDebounce();
  };
  
  const handleDepthChange = (value: number) => {
    setDepth(value);
    setErrors(prev => ({ ...prev, depth: value < 30 || value > 300 }));
    applyChangesWithDebounce();
  };
  
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Adjust Dimensions (cm)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
          <label htmlFor="width" className="block text-base font-bold text-gray-800 mb-2">
            Width (50-400 cm)
          </label>
          <div className="flex items-center mb-2">
            <div className="flex-grow">
              <NumberInput
                id="width"
                value={width}
                min={50}
                max={400}
                step={5}
                onChange={handleWidthChange}
                hasError={errors.width}
              />
            </div>
            <span className="ml-2 text-gray-800 font-medium">cm</span>
          </div>
          {errors.width ? (
            <p className="text-xs text-red-600 font-medium">
              Width must be between 50 and 400 cm
            </p>
          ) : (
            <div className="text-xs text-gray-700 font-medium">
              Recommended: 150-250 cm for standard wardrobes
            </div>
          )}
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
          <label htmlFor="height" className="block text-base font-bold text-gray-800 mb-2">
            Height (100-300 cm)
          </label>
          <div className="flex items-center mb-2">
            <div className="flex-grow">
              <NumberInput
                id="height"
                value={height}
                min={100}
                max={300}
                step={5}
                onChange={handleHeightChange}
                hasError={errors.height}
              />
            </div>
            <span className="ml-2 text-gray-800 font-medium">cm</span>
          </div>
          {errors.height ? (
            <p className="text-xs text-red-600 font-medium">
              Height must be between 100 and 300 cm
            </p>
          ) : (
            <div className="text-xs text-gray-700 font-medium">
              Recommended: 200-240 cm for standard ceiling height
            </div>
          )}
        </div>
        
        <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
          <label htmlFor="depth" className="block text-base font-bold text-gray-800 mb-2">
            Depth (30-300 cm)
          </label>
          <div className="flex items-center mb-2">
            <div className="flex-grow">
              <NumberInput
                id="depth"
                value={depth}
                min={30}
                max={300}
                step={5}
                onChange={handleDepthChange}
                hasError={errors.depth}
              />
            </div>
            <span className="ml-2 text-gray-800 font-medium">cm</span>
          </div>
          {errors.depth ? (
            <p className="text-xs text-red-600 font-medium">
              Depth must be between 30 and 300 cm
            </p>
          ) : (
            <div className="text-xs text-gray-700 font-medium">
              Recommended: 50-70 cm for clothes storage
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <div className="text-base text-gray-900 font-medium">
          Current dimensions: <span className="font-bold">{dimensions.width} × {dimensions.height} × {dimensions.depth} cm</span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Changes are applied automatically as you adjust the values
        </div>
      </div>
    </div>
  );
};

export default DimensionsControl; 