"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, Environment } from '@react-three/drei';
import WardrobeModel from './WardrobeModel';

const WardrobeScene: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [200, 200, 200], fov: 50 }}
        style={{ background: '#f0f0f0' }}
      >
        <Suspense fallback={null}>
          <WardrobeModel />
          <Environment preset="apartment" />
        </Suspense>
        <Stats />
      </Canvas>
    </div>
  );
};

export default WardrobeScene; 