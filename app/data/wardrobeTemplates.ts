"use client";

import { v4 as uuidv4 } from 'uuid';
import { WardrobeConfiguration, WardrobeType } from '../types/wardrobe';

// Template wardrobe configurations
export const wardrobeTemplates: {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  configuration: Omit<WardrobeConfiguration, 'id'>;
}[] = [
  {
    id: 'template-minimalist',
    name: 'Minimalist Wardrobe',
    description: 'A clean, simple design with essential storage for a minimalist lifestyle.',
    imageUrl: '/images/templates/minimalist.png',
    configuration: {
      type: 'standard',
      dimensions: { width: 200, height: 220, depth: 60 },
      components: [
        // Rail for hanging clothes
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -49, y: 180, z: 0 },
          dimensions: { width: 100, height: 5, depth: 55 },
          material: 'mat6',
          rotation: { x: 90, y: 0, z: 90 }
        },
        // Shelves for folded items
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 51, y: 60, z: 0 },
          dimensions: { width: 95, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 51, y: 120, z: 0 },
          dimensions: { width: 95, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 51, y: 180, z: 0 },
          dimensions: { width: 95, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Drawers
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -49, y: 40, z: 0 },
          dimensions: { width: 100, height: 20, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -49, y: 65, z: 0 },
          dimensions: { width: 100, height: 20, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Center divider
        {
          id: uuidv4(),
          type: 'divider',
          position: { x: 2, y: 110, z: 0 },
          dimensions: { width: 2, height: 218, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Additional shelf
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: -49, y: 80, z: 0 },
          dimensions: { width: 100, height: 2, depth: 50 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        }
      ],
      materials: {
        body: 'mat5',
        doors: 'mat5',
        handles: 'mat6'
      },
      price: 0
    }
  }
];

export default wardrobeTemplates; 