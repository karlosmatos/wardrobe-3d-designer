"use client";

import React, { useState } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useWardrobeStore from '../../store/wardrobeStore';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

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
    updateComponent,
  } = useWardrobeStore();
  
  const { components, dimensions } = configuration;
  
  // State for tracking which component is being edited
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null);
  
  // State for storing temporary edit values
  const [editValues, setEditValues] = useState<{
    position: { x: number; y: number; z: number };
    dimensions: { width: number; height: number; depth: number };
    material: string;
  } | null>(null);
  
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
  
  // Start editing a component
  const handleStartEdit = (component: typeof components[0]) => {
    setEditingComponentId(component.id);
    setEditValues({
      position: { ...component.position },
      dimensions: { ...component.dimensions },
      material: component.material,
    });
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingComponentId(null);
    setEditValues(null);
  };
  
  // Save edits
  const handleSaveEdit = (id: string) => {
    if (editValues) {
      updateComponent(id, {
        position: editValues.position,
        dimensions: editValues.dimensions,
        material: editValues.material,
      });
      setEditingComponentId(null);
      setEditValues(null);
    }
  };
  
  // Handle input change for position and dimensions
  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: 'position' | 'dimensions',
    property: 'x' | 'y' | 'z' | 'width' | 'height' | 'depth'
  ) => {
    if (editValues) {
      const value = parseFloat(e.target.value) || 0;
      setEditValues({
        ...editValues,
        [category]: {
          ...editValues[category],
          [property]: value,
        },
      });
    }
  };
  
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Add Components</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {componentTypes.map((componentType) => (
          <button
            key={componentType.type}
            onClick={() => handleAddComponent(componentType.type as keyof typeof defaultComponentValues)}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 border border-gray-200"
          >
            <PlusIcon className="h-5 w-5 mr-2 text-blue-700" />
            <span className="text-gray-900">Add {componentType.name}</span>
          </button>
        ))}
      </div>
      
      {components.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-900">Current Components</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
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
                    const isEditing = editingComponentId === component.id;
                    
                    return (
                      <tr key={component.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {componentTypes.find(t => t.type === component.type)?.name || component.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {isEditing ? (
                            <div className="flex space-x-2">
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">X:</label>
                                <input
                                  type="number"
                                  value={editValues?.position.x}
                                  onChange={(e) => handleNumberInputChange(e, 'position', 'x')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">Y:</label>
                                <input
                                  type="number"
                                  value={editValues?.position.y}
                                  onChange={(e) => handleNumberInputChange(e, 'position', 'y')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">Z:</label>
                                <input
                                  type="number"
                                  value={editValues?.position.z}
                                  onChange={(e) => handleNumberInputChange(e, 'position', 'z')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                            </div>
                          ) : (
                            <span>X: {component.position.x}, Y: {component.position.y}, Z: {component.position.z}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {isEditing ? (
                            <div className="flex space-x-2">
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">W:</label>
                                <input
                                  type="number"
                                  value={editValues?.dimensions.width}
                                  onChange={(e) => handleNumberInputChange(e, 'dimensions', 'width')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">H:</label>
                                <input
                                  type="number"
                                  value={editValues?.dimensions.height}
                                  onChange={(e) => handleNumberInputChange(e, 'dimensions', 'height')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">D:</label>
                                <input
                                  type="number"
                                  value={editValues?.dimensions.depth}
                                  onChange={(e) => handleNumberInputChange(e, 'dimensions', 'depth')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                            </div>
                          ) : (
                            <span>W: {component.dimensions.width}, H: {component.dimensions.height}, D: {component.dimensions.depth}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {isEditing ? (
                            <Listbox 
                              value={editValues?.material} 
                              onChange={(materialId) => setEditValues({...editValues!, material: materialId})}
                            >
                              <div className="relative mt-1 w-48">
                                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500">
                                  {editValues && (
                                    <div className="flex items-center">
                                      <div 
                                        className="w-4 h-4 rounded-full mr-2" 
                                        style={{ backgroundColor: availableMaterials.find(m => m.id === editValues.material)?.color || '#ffffff' }}
                                      />
                                      <span className="block truncate">
                                        {availableMaterials.find(m => m.id === editValues.material)?.name || 'Unknown'}
                                      </span>
                                    </div>
                                  )}
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                  </span>
                                </Listbox.Button>
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {availableMaterials.map((material) => (
                                    <Listbox.Option
                                      key={material.id}
                                      value={material.id}
                                      className={({ active, selected }) =>
                                        `${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                                        ${selected ? 'bg-blue-50' : ''}
                                        relative cursor-pointer select-none py-2 pl-3 pr-9`
                                      }
                                    >
                                      {({ selected }) => (
                                        <div className="flex items-center">
                                          <div 
                                            className="w-4 h-4 rounded-full mr-2" 
                                            style={{ backgroundColor: material.color }}
                                          />
                                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {material.name}
                                          </span>
                                        </div>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </div>
                            </Listbox>
                          ) : (
                            <div className="flex items-center">
                              <div 
                                className="w-4 h-4 rounded-full mr-2" 
                                style={{ backgroundColor: materialObj?.color || '#ffffff' }}
                              />
                              {materialObj?.name || 'Unknown'}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {isEditing ? (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleSaveEdit(component.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <CheckIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleStartEdit(component)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => removeComponent(component.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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