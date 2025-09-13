import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Loader } from '@react-three/drei';
import { Group } from 'three';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn } from 'lucide-react';

interface Model3DProps {
  modelPath: string;
  monasteryId?: string;
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
    <div className="w-full h-[500px] bg-gradient-to-br from-monastery-red/10 to-mountain-blue/10 rounded-lg flex items-center justify-center">
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

const Model3D: React.FC<Model3DProps> = ({ modelPath, monasteryId, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<OrbitControls | null>(null);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const openInNewTab = () => {
    const url = monasteryId === "lachung" 
      ? '/model-viewer?model=lachung' 
      : monasteryId === "tashiding"
      ? '/model-viewer?model=tashiding'
      : monasteryId === "enchey"
      ? '/model-viewer?model=enchey'
      : monasteryId === "rumtek"
      ? '/model-viewer?model=rumtek'
      : monasteryId === "pemayangtse"
      ? '/model-viewer?model=pemayangtse'
      : monasteryId === "phodong"
      ? '/model-viewer?model=phodong'
      : monasteryId === "labrang"
      ? '/model-viewer?model=labrang'
      : '/model-viewer';
    window.open(url, '_blank');
  };

  return (
    <div className={`relative h-[500px] ${className}`}>
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={openInNewTab}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      <Canvas
        camera={{ 
          position: [3, 2, 5], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        className="rounded-lg"
        onCreated={() => setIsLoaded(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <Suspense fallback={null}>
          <ModelComponent modelPath={modelPath} />
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={2}
          maxDistance={15}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      {!isLoaded && <Loader />}
      
      <div className="absolute bottom-4 left-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          {autoRotate ? '⏸️' : '▶️'}
        </Button>
      </div>
    </div>
  );
};

export default Model3D;
