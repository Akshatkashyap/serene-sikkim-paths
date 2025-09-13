import React from 'react';
import { useSearchParams } from 'react-router-dom';
import FullscreenModel3D from '@/components/FullscreenModel3D';

const ModelViewer = () => {
  const [searchParams] = useSearchParams();
  const model = searchParams.get('model');
  
  const modelPath = model === 'lachung' ? '/lachung.glb' 
                  : model === 'tashiding' ? '/tashiding.glb'
                  : model === 'enchey' ? '/enchey.glb'
                  : model === 'rumtek' ? '/model.glb'
                  : model === 'pemayangtse' ? '/model.glb'
                  : model === 'phodong' ? '/lachung.glb'
                  : model === 'labrang' ? '/enchey.glb'
                  : '/model.glb';
  const monasteryId = model || 'rumtek';

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-sky-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <FullscreenModel3D 
        modelPath={modelPath}
        monasteryId={monasteryId}
        className="w-full h-full"
      />
    </div>
  );
};

export default ModelViewer;
