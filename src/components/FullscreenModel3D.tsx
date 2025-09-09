import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Loader } from '@react-three/drei';
import { Group } from 'three';

interface FullscreenModel3DProps {
  modelPath: string;
  className?: string;
}

function ModelComponent({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(modelPath);
  const [scale, setScale] = useState(5.0);

  useEffect(() => {
    // Model starts at full size
  }, []);

  // Simple floating motion
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef} 
      scale={[scale, scale, scale]}
    >
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-monastery-red/10 to-mountain-blue/10 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-monastery-red/20 border-t-monastery-red mx-auto"></div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">Loading Sacred Architecture...</h3>
          <p className="text-lg text-white/80">Preparing your immersive experience</p>
        </div>
      </div>
    </div>
  );
}

const FullscreenModel3D: React.FC<FullscreenModel3DProps> = ({ modelPath, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);

  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 8, 25], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
          onCreated={() => setIsLoaded(true)}
        >
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-10, 0, -10]} intensity={0.3} color="#f97316" />
          <pointLight position={[10, 0, 10]} intensity={0.3} color="#0ea5e9" />
          
          {/* Environment for realistic reflections */}
          <Environment preset="dawn" />
          
          {/* 3D Model */}
          <ModelComponent modelPath={modelPath} />
          
          {/* Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={100}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
          
          {/* Add fog for depth */}
          <fog attach="fog" args={['#f0f9ff', 50, 120]} />
        </Canvas>
      </Suspense>
      
      {/* Loading Progress */}
      <Loader
        containerStyles={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
        innerStyles={{
          backgroundColor: '#dc2626',
        }}
        barStyles={{
          backgroundColor: '#fbbf24',
        }}
        dataStyles={{
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '600',
        }}
      />
    </div>
  );
};

// Preload the model for better performance
useGLTF.preload('/model.glb');

export default FullscreenModel3D;
