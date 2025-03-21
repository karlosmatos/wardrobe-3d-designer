"use client";

import React, { useState } from 'react';
import { 
  TrashIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon,
  Square3Stack3DIcon,
  SquaresPlusIcon,
  RectangleGroupIcon,
  ViewColumnsIcon,
  ArrowsUpDownIcon,
  ShoppingBagIcon,
  Bars3BottomLeftIcon,
  LightBulbIcon,
  RectangleStackIcon,
  CubeIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import useWardrobeStore from '../../store/wardrobeStore';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const componentTypes = [
  { type: 'shelf', name: 'Shelf' },
  { type: 'drawer', name: 'Drawer' },
  { type: 'rail', name: 'Hanging Rail' },
  { type: 'door', name: 'Door' },
  { type: 'divider', name: 'Vertical Divider' },
  { type: 'shoe_rack', name: 'Shoe Rack' },
  { type: 'trouser_rack', name: 'Trouser Rack' },
  { type: 'tie_rack', name: 'Tie/Belt Rack' },
  { type: 'mirror', name: 'Mirror' },
  { type: 'lighting', name: 'LED Lighting' },
  { type: 'jewelry_tray', name: 'Jewelry Tray' },
  { type: 'pull_out', name: 'Pull-Out Basket' },
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
    rotation?: { x: number; y: number; z: number };
    material: string;
  } | null>(null);
  
  // Default values for new components
  const defaultComponentValues = {
    shelf: {
      type: 'shelf' as const,
      position: { x: 0, y: dimensions.height / 2, z: 0 },
      dimensions: { width: dimensions.width - 10, height: 2, depth: dimensions.depth - 10 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.body,
    },
    drawer: {
      type: 'drawer' as const,
      position: { x: 0, y: dimensions.height / 3, z: dimensions.depth / 2 - 5 },
      dimensions: { width: dimensions.width - 10, height: 20, depth: dimensions.depth - 10 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.doors,
    },
    rail: {
      type: 'rail' as const,
      position: { x: 0, y: dimensions.height - 30, z: 0 },
      dimensions: { width: dimensions.width - 10, height: 2, depth: 2 },
      rotation: { x: 0, y: 90, z: 0 }, // Rotate by default to be horizontal
      material: configuration.materials.handles,
    },
    door: {
      type: 'door' as const,
      position: { x: 0, y: dimensions.height / 2, z: dimensions.depth / 2 },
      dimensions: { width: dimensions.width / 2 - 5, height: dimensions.height - 4, depth: 2 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.doors,
    },
    divider: {
      type: 'divider' as const,
      position: { x: dimensions.width / 2, y: dimensions.height / 2, z: 0 },
      dimensions: { width: 2, height: dimensions.height - 10, depth: dimensions.depth - 10 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.body,
    },
    shoe_rack: {
      type: 'shoe_rack' as const,
      position: { x: 0, y: 20, z: 0 },
      dimensions: { width: dimensions.width - 10, height: 15, depth: dimensions.depth - 10 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.body,
    },
    trouser_rack: {
      type: 'trouser_rack' as const,
      position: { x: 0, y: dimensions.height / 2, z: dimensions.depth / 3 },
      dimensions: { width: dimensions.width - 20, height: 5, depth: 40 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.handles,
    },
    tie_rack: {
      type: 'tie_rack' as const,
      position: { x: dimensions.width / 4, y: dimensions.height / 2, z: dimensions.depth - 10 },
      dimensions: { width: 30, height: 5, depth: 10 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.handles,
    },
    mirror: {
      type: 'mirror' as const,
      position: { x: 0, y: dimensions.height / 2, z: dimensions.depth / 2 },
      dimensions: { width: dimensions.width / 3, height: dimensions.height / 2, depth: 1 },
      rotation: { x: 0, y: 0, z: 0 },
      material: 'mat1', // Default to white material
    },
    lighting: {
      type: 'lighting' as const,
      position: { x: 0, y: dimensions.height - 5, z: 0 },
      dimensions: { width: dimensions.width - 20, height: 2, depth: 2 },
      rotation: { x: 0, y: 0, z: 0 },
      material: 'mat6', // Chrome material
    },
    jewelry_tray: {
      type: 'jewelry_tray' as const,
      position: { x: 0, y: dimensions.height / 3, z: 0 },
      dimensions: { width: dimensions.width / 3, height: 5, depth: dimensions.depth / 2 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.body,
    },
    pull_out: {
      type: 'pull_out' as const,
      position: { x: 0, y: dimensions.height / 4, z: dimensions.depth / 2 },
      dimensions: { width: dimensions.width - 20, height: 15, depth: dimensions.depth - 20 },
      rotation: { x: 0, y: 0, z: 0 },
      material: configuration.materials.body,
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
      rotation: component.rotation ? { ...component.rotation } : { x: 0, y: 0, z: 0 },
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
        rotation: editValues.rotation,
        material: editValues.material,
      });
      setEditingComponentId(null);
      setEditValues(null);
    }
  };
  
  // Handle input change for position and dimensions
  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: 'position' | 'dimensions' | 'rotation',
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
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800">Storage Components</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {componentTypes
            .filter(c => ['shelf', 'drawer', 'divider', 'pull_out'].includes(c.type))
            .map((componentType) => (
              <button
                key={componentType.type}
                onClick={() => handleAddComponent(componentType.type as keyof typeof defaultComponentValues)}
                className="flex items-center justify-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 border border-gray-200"
              >
                {componentType.type === 'shelf' && <Square3Stack3DIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'drawer' && <SquaresPlusIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'divider' && <ViewColumnsIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'pull_out' && <CubeIcon className="h-5 w-5 mr-2 text-blue-700" />}
                <span className="text-gray-900">Add {componentType.name}</span>
              </button>
            ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800">Clothing Organization</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {componentTypes
            .filter(c => ['rail', 'shoe_rack', 'trouser_rack', 'tie_rack'].includes(c.type))
            .map((componentType) => (
              <button
                key={componentType.type}
                onClick={() => handleAddComponent(componentType.type as keyof typeof defaultComponentValues)}
                className="flex items-center justify-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 border border-gray-200"
              >
                {componentType.type === 'rail' && <ArrowsUpDownIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'shoe_rack' && <ShoppingBagIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'trouser_rack' && <RectangleGroupIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'tie_rack' && <Bars3BottomLeftIcon className="h-5 w-5 mr-2 text-blue-700" />}
                <span className="text-gray-900">Add {componentType.name}</span>
              </button>
            ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800">Accessories & Finishing</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {componentTypes
            .filter(c => ['door', 'mirror', 'lighting', 'jewelry_tray'].includes(c.type))
            .map((componentType) => (
              <button
                key={componentType.type}
                onClick={() => handleAddComponent(componentType.type as keyof typeof defaultComponentValues)}
                className="flex items-center justify-center p-3 bg-white rounded-lg shadow hover:bg-gray-50 border border-gray-200"
              >
                {componentType.type === 'door' && <RectangleStackIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'mirror' && <EyeIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'lighting' && <LightBulbIcon className="h-5 w-5 mr-2 text-blue-700" />}
                {componentType.type === 'jewelry_tray' && <SquaresPlusIcon className="h-5 w-5 mr-2 text-blue-700" />}
                <span className="text-gray-900">Add {componentType.name}</span>
              </button>
            ))}
        </div>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rotation</th>
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
                          <div className="flex items-center">
                            {component.type === 'shelf' && <Square3Stack3DIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'drawer' && <SquaresPlusIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'divider' && <ViewColumnsIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'pull_out' && <CubeIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'rail' && <ArrowsUpDownIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'shoe_rack' && <ShoppingBagIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'trouser_rack' && <RectangleGroupIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'tie_rack' && <Bars3BottomLeftIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'door' && <RectangleStackIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'mirror' && <EyeIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'lighting' && <LightBulbIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {component.type === 'jewelry_tray' && <SquaresPlusIcon className="h-5 w-5 mr-2 text-blue-700" />}
                            {componentTypes.find(t => t.type === component.type)?.name || component.type}
                          </div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {isEditing ? (
                            <div className="flex space-x-2">
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">Rot X:</label>
                                <input
                                  type="number"
                                  value={editValues?.rotation?.x || 0}
                                  onChange={(e) => handleNumberInputChange(e, 'rotation', 'x')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">Rot Y:</label>
                                <input
                                  type="number"
                                  value={editValues?.rotation?.y || 0}
                                  onChange={(e) => handleNumberInputChange(e, 'rotation', 'y')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-xs text-gray-500">Rot Z:</label>
                                <input
                                  type="number"
                                  value={editValues?.rotation?.z || 0}
                                  onChange={(e) => handleNumberInputChange(e, 'rotation', 'z')}
                                  className="w-20 border border-gray-300 rounded px-2 py-1"
                                />
                              </div>
                            </div>
                          ) : (
                            <span>
                              {component.rotation ? 
                                `X: ${component.rotation.x}°, Y: ${component.rotation.y}°, Z: ${component.rotation.z}°` : 
                                'No rotation'}
                            </span>
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