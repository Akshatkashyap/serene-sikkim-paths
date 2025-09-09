import React from 'react';
import FullscreenModel3D from '@/components/FullscreenModel3D';

const ModelViewer = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <FullscreenModel3D 
        modelPath="/model.glb" 
        className="w-full h-full"
      />
    </div>
  );
};

export default ModelViewer;
