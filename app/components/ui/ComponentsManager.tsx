"use client";

import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import useWardrobeStore from '../../store/wardrobeStore';

const componentTypes = [
  { type: 'shelf', name: 'Shelf' },
  { type: 'drawer', name: 'Drawer' },
  { type: 'rail', name: 'Hanging Rail' },
  { type: 'door', name: 'Door' },
] as const;

const ComponentsManager: React.FC = () => {
  const { 
    configuration, 
    availableMaterials, 
    addComponent, 
    removeComponent, 
    updateComponent 
  } = useWardrobeStore();
  
  const { components, dimensions } = configuration;
  
  // Default values for new components
  const defaultComponentValues = {
    shelf: {
      type: 'shelf' as const,
      position: { x: 0, y: dimensions.height / 2, z: 0 },
      dimensions: { width: dimensions.width - 10, height: 2, depth: dimensions.depth - 10 },
      material: configuration.materials.body,
    },
    drawer: {
      type: 'drawer' as const,
      position: { x: 0, y: dimensions.height / 3, z: dimensions.depth / 2 - 5 },
      dimensions: { width: dimensions.width - 10, height: 20, depth: dimensions.depth - 10 },
      material: configuration.materials.doors,
    },
    rail: {
      type: 'rail' as const,
      position: { x: 0, y: dimensions.height - 30, z: 0 },
      dimensions: { width: dimensions.width - 10, height: 2, depth: 2 },
      material: configuration.materials.handles,
    },
    door: {
      type: 'door' as const,
      position: { x: 0, y: dimensions.height / 2, z: dimensions.depth / 2 },
      dimensions: { width: dimensions.width / 2 - 5, height: dimensions.height - 4, depth: 2 },
      material: configuration.materials.doors,
    },
  };
  
  // Add a new component
  const handleAddComponent = (type: keyof typeof defaultComponentValues) => {
    addComponent(defaultComponentValues[type]);
  };
  
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Components</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {componentTypes.map((componentType) => (
          <button
            key={componentType.type}
            onClick={() => handleAddComponent(componentType.type as keyof typeof defaultComponentValues)}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 border border-gray-200"
          >
            <PlusIcon className="h-5 w-5 mr-2 text-blue-700" />
            <span className="text-gray-800">Add {componentType.name}</span>
          </button>
        ))}
      </div>
      
      {components.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-800">Current Components</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Dimensions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {components.map((component) => {
                  const materialObj = availableMaterials.find(m => m.id === component.material);
                  
                  return (
                    <tr key={component.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {componentTypes.find(t => t.type === component.type)?.name || component.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        X: {component.position.x}, Y: {component.position.y}, Z: {component.position.z}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        W: {component.dimensions.width}, H: {component.dimensions.height}, D: {component.dimensions.depth}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2" 
                            style={{ backgroundColor: materialObj?.color || '#ffffff' }}
                          />
                          {materialObj?.name || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeComponent(component.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-700">
          No components added yet. Add components to customize your wardrobe.
        </div>
      )}
    </div>
  );
};

export default ComponentsManager; 