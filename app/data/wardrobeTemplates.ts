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
    id: 'template-classic-walk-in',
    name: 'Classic Walk-in Closet',
    description: 'A spacious walk-in closet with ample hanging space, drawers, and shelving.',
    imageUrl: '/images/templates/classic-walk-in.jpg',
    configuration: {
      type: 'walk-in',
      dimensions: { width: 300, height: 240, depth: 300 },
      components: [
        // Left section - hanging rails
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -120, y: 180, z: 0 },
          dimensions: { width: 60, height: 3, depth: 60 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -120, y: 120, z: 0 },
          dimensions: { width: 60, height: 3, depth: 60 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Center section - drawers
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: 0, y: 40, z: 0 },
          dimensions: { width: 100, height: 20, depth: 55 },
          material: 'mat2',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: 0, y: 65, z: 0 },
          dimensions: { width: 100, height: 20, depth: 55 },
          material: 'mat2',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: 0, y: 90, z: 0 },
          dimensions: { width: 100, height: 20, depth: 55 },
          material: 'mat2',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Right section - shelves
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 120, y: 60, z: 0 },
          dimensions: { width: 60, height: 2, depth: 55 },
          material: 'mat2',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 120, y: 120, z: 0 },
          dimensions: { width: 60, height: 2, depth: 55 },
          material: 'mat2',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 120, y: 180, z: 0 },
          dimensions: { width: 60, height: 2, depth: 55 },
          material: 'mat2',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Shoe rack
        {
          id: uuidv4(),
          type: 'shoe_rack',
          position: { x: 120, y: 20, z: 0 },
          dimensions: { width: 60, height: 30, depth: 55 },
          material: 'mat2',
          rotation: { x: 0, y: 0, z: 0 }
        }
      ],
      materials: {
        body: 'mat2',
        doors: 'mat2',
        handles: 'mat6'
      },
      price: 0
    }
  },
  {
    id: 'template-modern-sliding',
    name: 'Modern Sliding Wardrobe',
    description: 'A contemporary wardrobe with sliding doors, perfect for bedrooms with limited space.',
    imageUrl: '/images/templates/modern-sliding.jpg',
    configuration: {
      type: 'sliding',
      dimensions: { width: 250, height: 240, depth: 65 },
      components: [
        // Left section - hanging rails
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -80, y: 180, z: 0 },
          dimensions: { width: 80, height: 3, depth: 55 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Center divider
        {
          id: uuidv4(),
          type: 'divider',
          position: { x: 0, y: 120, z: 0 },
          dimensions: { width: 2, height: 240, depth: 60 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Right section - shelves
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 80, y: 60, z: 0 },
          dimensions: { width: 80, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 80, y: 120, z: 0 },
          dimensions: { width: 80, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 80, y: 180, z: 0 },
          dimensions: { width: 80, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Drawers
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -80, y: 40, z: 0 },
          dimensions: { width: 80, height: 20, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -80, y: 65, z: 0 },
          dimensions: { width: 80, height: 20, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        }
      ],
      materials: {
        body: 'mat5',
        doors: 'mat4',
        handles: 'mat6'
      },
      price: 0
    }
  },
  {
    id: 'template-luxury-dressing-room',
    name: 'Luxury Dressing Room',
    description: 'An elegant dressing room with a central island, mirror, and specialized storage for accessories.',
    imageUrl: '/images/templates/luxury-dressing.jpg',
    configuration: {
      type: 'walk-in',
      dimensions: { width: 350, height: 240, depth: 350 },
      components: [
        // Central island with drawers
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: 0, y: 40, z: 0 },
          dimensions: { width: 120, height: 20, depth: 80 },
          material: 'mat3',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: 0, y: 65, z: 0 },
          dimensions: { width: 120, height: 20, depth: 80 },
          material: 'mat3',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Jewelry tray
        {
          id: uuidv4(),
          type: 'jewelry_tray',
          position: { x: 0, y: 90, z: 0 },
          dimensions: { width: 120, height: 10, depth: 80 },
          material: 'mat3',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Left wall - hanging rails
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -150, y: 180, z: 0 },
          dimensions: { width: 100, height: 3, depth: 60 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -150, y: 120, z: 0 },
          dimensions: { width: 100, height: 3, depth: 60 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Right wall - shelves
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 150, y: 60, z: 0 },
          dimensions: { width: 100, height: 2, depth: 55 },
          material: 'mat3',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 150, y: 120, z: 0 },
          dimensions: { width: 100, height: 2, depth: 55 },
          material: 'mat3',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 150, y: 180, z: 0 },
          dimensions: { width: 100, height: 2, depth: 55 },
          material: 'mat3',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Shoe racks
        {
          id: uuidv4(),
          type: 'shoe_rack',
          position: { x: 150, y: 20, z: 0 },
          dimensions: { width: 100, height: 30, depth: 55 },
          material: 'mat3',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Mirror
        {
          id: uuidv4(),
          type: 'mirror',
          position: { x: -150, y: 60, z: 30 },
          dimensions: { width: 60, height: 120, depth: 2 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Lighting
        {
          id: uuidv4(),
          type: 'lighting',
          position: { x: 0, y: 230, z: 0 },
          dimensions: { width: 100, height: 5, depth: 100 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        }
      ],
      materials: {
        body: 'mat3',
        doors: 'mat3',
        handles: 'mat6'
      },
      price: 0
    }
  },
  {
    id: 'template-family-wardrobe',
    name: 'Family Wardrobe',
    description: 'A practical wardrobe design with sections for different family members and varied storage options.',
    imageUrl: '/images/templates/family-wardrobe.jpg',
    configuration: {
      type: 'standard',
      dimensions: { width: 300, height: 220, depth: 60 },
      components: [
        // Dividers to create sections
        {
          id: uuidv4(),
          type: 'divider',
          position: { x: -100, y: 110, z: 0 },
          dimensions: { width: 2, height: 220, depth: 60 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'divider',
          position: { x: 100, y: 110, z: 0 },
          dimensions: { width: 2, height: 220, depth: 60 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Left section - adult clothes
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -150, y: 180, z: 0 },
          dimensions: { width: 90, height: 3, depth: 55 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -150, y: 40, z: 0 },
          dimensions: { width: 90, height: 20, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -150, y: 65, z: 0 },
          dimensions: { width: 90, height: 20, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Middle section - shared/seasonal
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 0, y: 60, z: 0 },
          dimensions: { width: 190, height: 2, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 0, y: 120, z: 0 },
          dimensions: { width: 190, height: 2, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 0, y: 180, z: 0 },
          dimensions: { width: 190, height: 2, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Right section - children
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: 150, y: 150, z: 0 },
          dimensions: { width: 90, height: 3, depth: 55 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: 150, y: 40, z: 0 },
          dimensions: { width: 90, height: 20, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: 150, y: 65, z: 0 },
          dimensions: { width: 90, height: 20, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 150, y: 100, z: 0 },
          dimensions: { width: 90, height: 2, depth: 55 },
          material: 'mat1',
          rotation: { x: 0, y: 0, z: 0 }
        }
      ],
      materials: {
        body: 'mat1',
        doors: 'mat1',
        handles: 'mat6'
      },
      price: 0
    }
  },
  {
    id: 'template-minimalist',
    name: 'Minimalist Wardrobe',
    description: 'A clean, simple design with essential storage for a minimalist lifestyle.',
    imageUrl: '/images/templates/minimalist.jpg',
    configuration: {
      type: 'standard',
      dimensions: { width: 200, height: 220, depth: 60 },
      components: [
        // Rail for hanging clothes
        {
          id: uuidv4(),
          type: 'rail',
          position: { x: -50, y: 180, z: 0 },
          dimensions: { width: 90, height: 3, depth: 55 },
          material: 'mat6',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Shelves for folded items
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 50, y: 60, z: 0 },
          dimensions: { width: 90, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 50, y: 120, z: 0 },
          dimensions: { width: 90, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'shelf',
          position: { x: 50, y: 180, z: 0 },
          dimensions: { width: 90, height: 2, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        // Two essential drawers
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -50, y: 40, z: 0 },
          dimensions: { width: 90, height: 20, depth: 55 },
          material: 'mat5',
          rotation: { x: 0, y: 0, z: 0 }
        },
        {
          id: uuidv4(),
          type: 'drawer',
          position: { x: -50, y: 65, z: 0 },
          dimensions: { width: 90, height: 20, depth: 55 },
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