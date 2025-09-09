import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Loader } from '@react-three/drei';
import { Group } from 'three';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn } from 'lucide-react';

interface Model3DProps {
  modelPath: string;
  className?: string;
}

function ModelComponent({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(modelPath);
  const [scale, setScale] = useState(5.0); // Start at maximum size immediately

  // No scale animation needed - starts at full size
  useEffect(() => {
    // Model starts at full size, no animation needed
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
    <div className="w-full h-96 bg-gradient-to-br from-monastery-red/10 to-mountain-blue/10 rounded-lg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-monastery-red mx-auto"></div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Loading 3D Monastery...</h3>
          <p className="text-sm text-muted-foreground">Preparing your virtual tour experience</p>
        </div>
      </div>
    </div>
  );
}

const Model3D: React.FC<Model3DProps> = ({ modelPath, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const openInNewTab = () => {
    window.open('/model-viewer', '_blank');
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Control Panel */}
      <div className="flex justify-center gap-2 flex-wrap">
        <Button
          variant="monastery"
          size="sm"
          onClick={openInNewTab}
          className="text-xs"
        >
          <ZoomIn className="h-3 w-3 mr-1" />
          View in New Tab
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="text-xs"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset View
        </Button>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-96 rounded-lg overflow-hidden border border-border bg-gradient-to-br from-sky-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
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
            
            {/* Enhanced Controls */}
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
      </div>

      {/* Interactive Instructions */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2 text-center">Interactive Controls</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-1">
            <span>🖱️</span>
            <span>Left-click + drag to rotate</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span>�</span>
            <span>Scroll wheel to zoom (get super close!)</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <span>🤏</span>
            <span>Right-click + drag to pan</span>
          </div>
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs font-medium text-monastery-red">
            💡 Zoom in close to explore intricate architectural details!
          </span>
        </div>
      </div>
      
      {/* Loading Progress */}
      <Loader
        containerStyles={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
        innerStyles={{
          backgroundColor: '#dc2626',
        }}
        barStyles={{
          backgroundColor: '#fbbf24',
        }}
        dataStyles={{
          color: '#374151',
          fontSize: '12px',
          fontWeight: '600',
        }}
      />
    </div>
  );
};

// Preload the model for better performance
useGLTF.preload('/model.glb');

export default Model3D;
