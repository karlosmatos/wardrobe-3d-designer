"use client";

import React from 'react';
import { RadioGroup } from '@headlessui/react';
import useWardrobeStore from '../../store/wardrobeStore';

const MaterialSelector: React.FC = () => {
  const { configuration, availableMaterials, setMaterial } = useWardrobeStore();
  const { materials } = configuration;
  
  // Material categories
  const categories = [
    { key: 'body', label: 'Body Material' },
    { key: 'doors', label: 'Door Material' },
    { key: 'handles', label: 'Handle Material' },
  ] as const;
  
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Materials</h2>
      
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.key} className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-gray-800">{category.label}</h3>
            <RadioGroup 
              value={materials[category.key]} 
              onChange={(materialId) => setMaterial(category.key, materialId)}
              className="mt-2"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {availableMaterials.map((material) => (
                  <RadioGroup.Option
                    key={material.id}
                    value={material.id}
                    className={({ active, checked }) =>
                      `${
                        active ? 'ring-2 ring-blue-600 ring-opacity-60 ring-offset-2' : ''
                      }
                      ${
                        checked ? 'bg-blue-700 text-white' : 'bg-white'
                      }
                      relative flex cursor-pointer rounded-lg p-2 shadow-md focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-12 h-12 rounded-md border border-gray-300" 
                          style={{ backgroundColor: material.color }}
                        />
                        <RadioGroup.Label
                          as="p"
                          className={`mt-1 text-xs font-medium ${
                            checked ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {material.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`text-xs ${
                            checked ? 'text-blue-100' : 'text-gray-700'
                          }`}
                        >
                          ${material.price}
                        </RadioGroup.Description>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialSelector; 