"use client";

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import useWardrobeStore from '../../store/wardrobeStore';
import { WardrobeComponent } from '../../types/wardrobe';

// Basic wardrobe frame
const WardrobeFrame: React.FC = () => {
  const { configuration, availableMaterials } = useWardrobeStore();
  const { dimensions, materials } = configuration;
  
  // Find the material objects
  const bodyMaterial = availableMaterials.find(m => m.id === materials.body);
  
  // Create a Three.js material
  const material = new THREE.MeshStandardMaterial({
    color: bodyMaterial?.color || '#ffffff',
    roughness: 0.5,
    metalness: 0.1,
  });
  
  return (
    <group>
      {/* Back panel */}
      <mesh 
        position={[0, dimensions.height / 2, -dimensions.depth / 2]} 
        material={material}
      >
        <boxGeometry args={[dimensions.width, dimensions.height, 2]} />
      </mesh>
      
      {/* Left side panel */}
      <mesh 
        position={[-dimensions.width / 2, dimensions.height / 2, 0]} 
        material={material}
      >
        <boxGeometry args={[2, dimensions.height, dimensions.depth]} />
      </mesh>
      
      {/* Right side panel */}
      <mesh 
        position={[dimensions.width / 2, dimensions.height / 2, 0]} 
        material={material}
      >
        <boxGeometry args={[2, dimensions.height, dimensions.depth]} />
      </mesh>
      
      {/* Top panel */}
      <mesh 
        position={[0, dimensions.height, 0]} 
        material={material}
      >
        <boxGeometry args={[dimensions.width, 2, dimensions.depth]} />
      </mesh>
      
      {/* Bottom panel */}
      <mesh 
        position={[0, 0, 0]} 
        material={material}
      >
        <boxGeometry args={[dimensions.width, 2, dimensions.depth]} />
      </mesh>
    </group>
  );
};

// Component for rendering a shelf
const Shelf: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { availableMaterials } = useWardrobeStore();
  const { position, dimensions, material: materialId } = component;
  
  // Find the material object
  const materialObj = availableMaterials.find(m => m.id === materialId);
  
  // Create a Three.js material
  const material = new THREE.MeshStandardMaterial({
    color: materialObj?.color || '#ffffff',
    roughness: 0.5,
    metalness: 0.1,
  });
  
  return (
    <mesh 
      position={[position.x, position.y, position.z]} 
      material={material}
    >
      <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
    </mesh>
  );
};

// Component for rendering a drawer
const Drawer: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { availableMaterials } = useWardrobeStore();
  const { position, dimensions, material: materialId } = component;
  
  // Find the material object
  const materialObj = availableMaterials.find(m => m.id === materialId);
  
  // Create a Three.js material
  const material = new THREE.MeshStandardMaterial({
    color: materialObj?.color || '#ffffff',
    roughness: 0.5,
    metalness: 0.1,
  });
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Drawer front */}
      <mesh 
        position={[0, 0, dimensions.depth / 2]} 
        material={material}
      >
        <boxGeometry args={[dimensions.width, dimensions.height, 2]} />
      </mesh>
      
      {/* Drawer body */}
      <mesh 
        position={[0, -dimensions.height / 4, 0]} 
        material={material}
      >
        <boxGeometry args={[dimensions.width - 4, dimensions.height / 2, dimensions.depth - 4]} />
      </mesh>
      
      {/* Drawer handle */}
      <mesh 
        position={[0, 0, dimensions.depth / 2 + 2]} 
        material={new THREE.MeshStandardMaterial({ color: '#c0c0c0', metalness: 0.8 })}
      >
        <boxGeometry args={[dimensions.width / 4, 2, 1]} />
      </mesh>
    </group>
  );
};

// Component for rendering a rail
const Rail: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { position, dimensions } = component;
  
  return (
    <mesh 
      position={[position.x, position.y, position.z]} 
      material={new THREE.MeshStandardMaterial({ color: '#c0c0c0', metalness: 0.8 })}
    >
      <cylinderGeometry args={[1, 1, dimensions.width, 16]} />
    </mesh>
  );
};

// Component for rendering a door
const Door: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { availableMaterials, configuration } = useWardrobeStore();
  const { position, dimensions } = component;
  const { materials } = configuration;
  
  // Find the material objects
  const doorMaterial = availableMaterials.find(m => m.id === materials.doors);
  const handleMaterial = availableMaterials.find(m => m.id === materials.handles);
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Door panel */}
      <mesh 
        position={[0, 0, 0]} 
        material={new THREE.MeshStandardMaterial({
          color: doorMaterial?.color || '#d2b48c',
          roughness: 0.5,
          metalness: 0.1,
        })}
      >
        <boxGeometry args={[dimensions.width, dimensions.height, 2]} />
      </mesh>
      
      {/* Door handle */}
      <mesh 
        position={[dimensions.width / 3, 0, 2]} 
        material={new THREE.MeshStandardMaterial({
          color: handleMaterial?.color || '#c0c0c0',
          metalness: 0.8,
        })}
      >
        <cylinderGeometry args={[1, 1, 10, 16]} />
      </mesh>
    </group>
  );
};

// Main wardrobe model component
const WardrobeModel: React.FC = () => {
  const { configuration } = useWardrobeStore();
  const { components } = configuration;
  
  // Render the wardrobe components based on their type
  const renderComponent = (component: WardrobeComponent) => {
    switch (component.type) {
      case 'shelf':
        return <Shelf key={component.id} component={component} />;
      case 'drawer':
        return <Drawer key={component.id} component={component} />;
      case 'rail':
        return <Rail key={component.id} component={component} />;
      case 'door':
        return <Door key={component.id} component={component} />;
      default:
        return null;
    }
  };
  
  return (
    <>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      {/* Wardrobe frame */}
      <WardrobeFrame />
      
      {/* Render all components */}
      {components.map(renderComponent)}
      
      {/* Floor grid for reference */}
      <gridHelper args={[1000, 100]} position={[0, -1, 0]} />
    </>
  );
};

export default WardrobeModel; 