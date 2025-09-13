import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Loader } from '@react-three/drei';
import { Group } from 'three';
import { Button } from '@/components/ui/button';
import { RotateCcw, X, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FullscreenModel3DProps {
  modelPath: string;
  monasteryId?: string;
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

const FullscreenModel3D: React.FC<FullscreenModel3DProps> = ({ modelPath, monasteryId, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<any>(null);

  // Enhanced environment settings for different monasteries
  const getEnvironmentSettings = () => {
    if (monasteryId === "lachung") {
      return {
        background: "from-slate-100 to-white dark:from-slate-800 dark:to-slate-700",
        fogColor: "#ffffff",
        fogNear: 15,
        fogFar: 60,
        ambientIntensity: 0.7,
        environmentPreset: "studio" as const
      };
    }
    return {
      background: "from-monastery-red/10 to-mountain-blue/10",
      fogColor: "#f0f9ff",
      fogNear: 50,
      fogFar: 120,
      ambientIntensity: 0.4,
      environmentPreset: "dawn" as const
    };
  };

  const envSettings = getEnvironmentSettings();

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const closeFullscreen = () => {
    window.close();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
        <div className="flex gap-2">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          {monasteryId && (
            <Link to={`/monastery/${monasteryId}`}>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                Back to Monastery
              </Button>
            </Link>
          )}
        </div>
        
        <div className="flex gap-2">
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
            onClick={closeFullscreen}
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Model Info */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white">
          <h2 className="text-xl font-bold mb-2">
            {monasteryId === "lachung" && "Lachung Monastery"}
            {monasteryId === "tashiding" && "Tashiding Monastery"}
            {monasteryId === "enchey" && "Enchey Monastery"}
            {monasteryId === "rumtek" && "Rumtek Monastery"}
            {monasteryId === "pemayangtse" && "Pemayangtse Monastery"}
            {monasteryId === "phodong" && "Phodong Monastery"}
            {monasteryId === "labrang" && "Labrang Monastery"}
            {!monasteryId && "Sacred Monastery"}
          </h2>
          <p className="text-white/80 text-sm">
            Use mouse/touch to rotate • Scroll to zoom • Drag to pan
          </p>
        </div>
      </div>

      {/* Auto-rotate toggle */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          {autoRotate ? '⏸️ Pause' : '▶️ Auto-rotate'}
        </Button>
      </div>

      <div className={`w-full h-full bg-gradient-to-br ${envSettings.background} ${className}`}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 8, 25], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            onCreated={() => setIsLoaded(true)}
          >
            {/* Enhanced Lighting Setup */}
            <ambientLight intensity={envSettings.ambientIntensity} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={monasteryId === "lachung" ? 0.6 : 1.2} 
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <pointLight 
              position={[-10, 0, -10]} 
              intensity={monasteryId === "lachung" ? 0.15 : 0.3} 
              color="#f97316" 
            />
            <pointLight 
              position={[10, 0, 10]} 
              intensity={monasteryId === "lachung" ? 0.15 : 0.3} 
              color="#0ea5e9" 
            />
            
            {/* Environment for realistic reflections */}
            <Environment preset={envSettings.environmentPreset} />
            
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
            
            {/* Enhanced fog for different monasteries */}
            <fog 
              attach="fog" 
              args={[envSettings.fogColor, envSettings.fogNear, envSettings.fogFar]} 
            />
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
    </div>
  );
};

// Preload both models for better performance
useGLTF.preload('/model.glb');
useGLTF.preload('/lachung.glb');
useGLTF.preload('/enchey.glb');

export default FullscreenModel3D;
