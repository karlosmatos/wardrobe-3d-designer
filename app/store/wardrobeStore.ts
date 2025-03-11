"use client";

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { 
  WardrobeConfiguration, 
  WardrobeType, 
  WardrobeDimensions, 
  WardrobeComponent,
  Material
} from '../types/wardrobe';

// Default materials
const defaultMaterials: Material[] = [
  { id: 'mat1', name: 'White Melamine', color: '#ffffff', price: 100 },
  { id: 'mat2', name: 'Oak Veneer', color: '#d2b48c', price: 200 },
  { id: 'mat3', name: 'Walnut Veneer', color: '#654321', price: 250 },
  { id: 'mat4', name: 'Black Melamine', color: '#222222', price: 120 },
  { id: 'mat5', name: 'Gray Melamine', color: '#808080', price: 110 },
  { id: 'mat6', name: 'Chrome', color: '#c0c0c0', price: 80 },
];

// Default dimensions based on wardrobe type
const defaultDimensions: Record<WardrobeType, WardrobeDimensions> = {
  'standard': { width: 200, height: 220, depth: 60 },
  'corner': { width: 200, height: 220, depth: 200 },
  'sliding': { width: 250, height: 240, depth: 65 },
  'walk-in': { width: 300, height: 240, depth: 300 },
};

interface WardrobeState {
  configuration: WardrobeConfiguration;
  availableMaterials: Material[];
  setWardrobeType: (type: WardrobeType) => void;
  setDimensions: (dimensions: Partial<WardrobeDimensions>) => void;
  addComponent: (component: Omit<WardrobeComponent, 'id'>) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<Omit<WardrobeComponent, 'id'>>) => void;
  setMaterial: (part: keyof WardrobeConfiguration['materials'], materialId: string) => void;
  calculatePrice: () => number;
  resetConfiguration: () => void;
}

// Create the store
const useWardrobeStore = create<WardrobeState>((set, get) => ({
  // Initial configuration
  configuration: {
    id: uuidv4(),
    type: 'standard',
    dimensions: defaultDimensions['standard'],
    components: [],
    materials: {
      body: 'mat1',
      doors: 'mat2',
      handles: 'mat6',
    },
    price: 0,
  },
  
  availableMaterials: defaultMaterials,
  
  // Set wardrobe type and update dimensions to default for that type
  setWardrobeType: (type) => set((state) => ({
    configuration: {
      ...state.configuration,
      type,
      dimensions: defaultDimensions[type],
    }
  })),
  
  // Update dimensions
  setDimensions: (dimensions) => set((state) => ({
    configuration: {
      ...state.configuration,
      dimensions: {
        ...state.configuration.dimensions,
        ...dimensions,
      }
    }
  })),
  
  // Add a new component
  addComponent: (component) => set((state) => ({
    configuration: {
      ...state.configuration,
      components: [
        ...state.configuration.components,
        {
          ...component,
          id: uuidv4(),
        }
      ]
    }
  })),
  
  // Remove a component
  removeComponent: (id) => set((state) => ({
    configuration: {
      ...state.configuration,
      components: state.configuration.components.filter(
        (component) => component.id !== id
      )
    }
  })),
  
  // Update a component
  updateComponent: (id, updates) => set((state) => ({
    configuration: {
      ...state.configuration,
      components: state.configuration.components.map((component) => 
        component.id === id 
          ? { ...component, ...updates } 
          : component
      )
    }
  })),
  
  // Set material for a specific part
  setMaterial: (part, materialId) => set((state) => ({
    configuration: {
      ...state.configuration,
      materials: {
        ...state.configuration.materials,
        [part]: materialId,
      }
    }
  })),
  
  // Calculate the total price
  calculatePrice: () => {
    const state = get();
    const { configuration, availableMaterials } = state;
    
    // Base price based on dimensions
    const volumePrice = (
      configuration.dimensions.width * 
      configuration.dimensions.height * 
      configuration.dimensions.depth
    ) * 0.01;
    
    // Materials price
    const bodyMaterial = availableMaterials.find(m => m.id === configuration.materials.body);
    const doorsMaterial = availableMaterials.find(m => m.id === configuration.materials.doors);
    const handlesMaterial = availableMaterials.find(m => m.id === configuration.materials.handles);
    
    const materialsPrice = 
      (bodyMaterial?.price || 0) + 
      (doorsMaterial?.price || 0) + 
      (handlesMaterial?.price || 0);
    
    // Components price (simplified)
    const componentsPrice = configuration.components.length * 50;
    
    // Total price
    const totalPrice = volumePrice + materialsPrice + componentsPrice;
    
    // Update the price in the configuration
    set((state) => ({
      configuration: {
        ...state.configuration,
        price: Math.round(totalPrice),
      }
    }));
    
    return Math.round(totalPrice);
  },
  
  // Reset to default configuration
  resetConfiguration: () => set({
    configuration: {
      id: uuidv4(),
      type: 'standard',
      dimensions: defaultDimensions['standard'],
      components: [],
      materials: {
        body: 'mat1',
        doors: 'mat2',
        handles: 'mat6',
      },
      price: 0,
    }
  }),
}));

export default useWardrobeStore; 