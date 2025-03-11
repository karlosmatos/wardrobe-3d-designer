"use client";

import React from 'react';
import { OrbitControls } from '@react-three/drei';
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

// Component for rendering a vertical divider
const Divider: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
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

// Component for rendering a shoe rack
const ShoeRack: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
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
      {/* Main shelf */}
      <mesh position={[0, 0, 0]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
      </mesh>
      
      {/* Dividers for shoes (3 sections) */}
      {[-dimensions.width/3, 0, dimensions.width/3].map((x, index) => (
        <mesh key={index} position={[x, dimensions.height/2, 0]} material={material}>
          <boxGeometry args={[1, dimensions.height, dimensions.depth]} />
        </mesh>
      ))}
    </group>
  );
};

// Component for rendering a trouser rack
const TrouserRack: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { availableMaterials } = useWardrobeStore();
  const { position, dimensions, material: materialId } = component;
  
  // Find the material object
  const materialObj = availableMaterials.find(m => m.id === materialId);
  
  // Create a Three.js material
  const material = new THREE.MeshStandardMaterial({
    color: materialObj?.color || '#c0c0c0',
    metalness: 0.8,
  });
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Main rail */}
      <mesh position={[0, 0, 0]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth/4]} />
      </mesh>
      
      {/* Individual trouser hangers */}
      {Array.from({ length: 5 }).map((_, index) => {
        const x = -dimensions.width/2 + (dimensions.width/5) * (index + 0.5);
        return (
          <mesh key={index} position={[x, -dimensions.height*2, dimensions.depth/3]} material={material}>
            <boxGeometry args={[dimensions.width/10, dimensions.height*4, dimensions.depth/10]} />
          </mesh>
        );
      })}
    </group>
  );
};

// Component for rendering a tie/belt rack
const TieRack: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { availableMaterials } = useWardrobeStore();
  const { position, dimensions, material: materialId } = component;
  
  // Find the material object
  const materialObj = availableMaterials.find(m => m.id === materialId);
  
  // Create a Three.js material
  const material = new THREE.MeshStandardMaterial({
    color: materialObj?.color || '#c0c0c0',
    metalness: 0.8,
  });
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Main bar */}
      <mesh position={[0, 0, 0]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
      </mesh>
      
      {/* Hooks for ties/belts */}
      {Array.from({ length: 6 }).map((_, index) => {
        const x = -dimensions.width/2 + (dimensions.width/6) * (index + 0.5);
        return (
          <mesh key={index} position={[x, -dimensions.height*1.5, 0]} material={material}>
            <cylinderGeometry args={[0.5, 0.5, dimensions.height*2, 8]} />
          </mesh>
        );
      })}
    </group>
  );
};

// Component for rendering a mirror
const Mirror: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { position, dimensions } = component;
  
  // Create a Three.js material for mirror
  const mirrorMaterial = new THREE.MeshStandardMaterial({
    color: '#e0e0e0',
    metalness: 0.9,
    roughness: 0.1,
  });
  
  // Create a Three.js material for frame
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: '#a0a0a0',
    metalness: 0.5,
    roughness: 0.5,
  });
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Mirror surface */}
      <mesh position={[0, 0, 0]} material={mirrorMaterial}>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth/2]} />
      </mesh>
      
      {/* Mirror frame */}
      <mesh position={[0, 0, -dimensions.depth/4]} material={frameMaterial}>
        <boxGeometry args={[dimensions.width + 4, dimensions.height + 4, dimensions.depth/2]} />
      </mesh>
    </group>
  );
};

// Component for rendering LED lighting
const Lighting: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
  const { position, dimensions } = component;
  
  // Create a Three.js material for the light fixture
  const fixtureMaterial = new THREE.MeshStandardMaterial({
    color: '#c0c0c0',
    metalness: 0.8,
  });
  
  // Create a Three.js material for the light glow
  const lightMaterial = new THREE.MeshBasicMaterial({
    color: '#ffffff',
  });
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Light fixture */}
      <mesh position={[0, 0, 0]} material={fixtureMaterial}>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
      </mesh>
      
      {/* Light glow */}
      <mesh position={[0, -dimensions.height, 0]} material={lightMaterial}>
        <boxGeometry args={[dimensions.width, 0.5, dimensions.depth]} />
      </mesh>
      
      {/* Add a point light */}
      <pointLight position={[0, -5, 0]} intensity={0.5} color="#ffffff" />
    </group>
  );
};

// Component for rendering a jewelry tray
const JewelryTray: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
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
      {/* Tray base */}
      <mesh position={[0, 0, 0]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height/2, dimensions.depth]} />
      </mesh>
      
      {/* Tray dividers */}
      <mesh position={[0, dimensions.height/2, 0]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height/2, 1]} />
      </mesh>
      <mesh position={[0, dimensions.height/2, -dimensions.depth/3]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height/2, 1]} />
      </mesh>
      <mesh position={[0, dimensions.height/2, dimensions.depth/3]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height/2, 1]} />
      </mesh>
    </group>
  );
};

// Component for rendering a pull-out basket
const PullOut: React.FC<{ component: WardrobeComponent }> = ({ component }) => {
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
  
  // Create a Three.js material for rails
  const railMaterial = new THREE.MeshStandardMaterial({
    color: '#c0c0c0',
    metalness: 0.8,
  });
  
  return (
    <group position={[position.x, position.y, position.z]}>
      {/* Basket base */}
      <mesh position={[0, 0, 0]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height/2, dimensions.depth]} />
      </mesh>
      
      {/* Basket sides */}
      <mesh position={[0, dimensions.height/2, dimensions.depth/2]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height/2, 1]} />
      </mesh>
      <mesh position={[0, dimensions.height/2, -dimensions.depth/2]} material={material}>
        <boxGeometry args={[dimensions.width, dimensions.height/2, 1]} />
      </mesh>
      <mesh position={[dimensions.width/2, dimensions.height/2, 0]} material={material}>
        <boxGeometry args={[1, dimensions.height/2, dimensions.depth]} />
      </mesh>
      <mesh position={[-dimensions.width/2, dimensions.height/2, 0]} material={material}>
        <boxGeometry args={[1, dimensions.height/2, dimensions.depth]} />
      </mesh>
      
      {/* Rails */}
      <mesh position={[-dimensions.width/2 - 1, 0, 0]} material={railMaterial}>
        <boxGeometry args={[1, 1, dimensions.depth]} />
      </mesh>
      <mesh position={[dimensions.width/2 + 1, 0, 0]} material={railMaterial}>
        <boxGeometry args={[1, 1, dimensions.depth]} />
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
      case 'divider':
        return <Divider key={component.id} component={component} />;
      case 'shoe_rack':
        return <ShoeRack key={component.id} component={component} />;
      case 'trouser_rack':
        return <TrouserRack key={component.id} component={component} />;
      case 'tie_rack':
        return <TieRack key={component.id} component={component} />;
      case 'mirror':
        return <Mirror key={component.id} component={component} />;
      case 'lighting':
        return <Lighting key={component.id} component={component} />;
      case 'jewelry_tray':
        return <JewelryTray key={component.id} component={component} />;
      case 'pull_out':
        return <PullOut key={component.id} component={component} />;
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