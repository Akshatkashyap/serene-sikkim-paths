import React, { lazy, Suspense } from 'react';

// Lazy load the Model3D component for better performance
const LazyModel3D = lazy(() => import('./Model3D'));

interface LazyModel3DWrapperProps {
  modelPath: string;
  monasteryId?: string;
  className?: string;
}

function Model3DLoadingFallback() {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-monastery-red/5 to-mountain-blue/5 rounded-lg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-monastery-red/20 border-t-monastery-red mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🏛️</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Initializing Virtual Tour</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Loading high-quality 3D monastery model for your immersive experience...
          </p>
          <div className="flex justify-center gap-2 text-xs text-muted-foreground">
            <span>📱 Mobile friendly</span>
            <span>🎮 Interactive controls</span>
            <span>🔄 360° exploration</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const LazyModel3DWrapper: React.FC<LazyModel3DWrapperProps> = ({ modelPath, monasteryId, className }) => {
  return (
    <Suspense fallback={<Model3DLoadingFallback />}>
      <LazyModel3D modelPath={modelPath} monasteryId={monasteryId} className={className} />
    </Suspense>
  );
};

export default LazyModel3DWrapper;
