import React, { useMemo } from 'react';
import { CloudImageProps } from './types';
import { STATIC_CLOUDS } from './constants';
import { CloudComponent } from './Cloud';
import { useViewportSize } from '@/hooks/useViewportSize';

export function Clouds() {
  const viewportSize = useViewportSize();

  // Memoized clouds with responsive positioning
  const clouds = useMemo(() => {
    if (viewportSize.width === 0) return STATIC_CLOUDS.map((cloud, index) => ({ ...cloud, baseLeft: 120 }));
    
    const baseLeftPositions = [
      120, // Fixed position for first cloud
      55,  // Fixed position for second cloud
      Math.max(1150, viewportSize.width - 390),
      333, // Fixed position for fourth cloud
      Math.max(1200, viewportSize.width - 280),
      Math.max(1250, viewportSize.width - 374),
    ];

    return STATIC_CLOUDS.map((cloud, index) => ({
      ...cloud,
      baseLeft: baseLeftPositions[index],
      baseTop: index === 3 ? Math.min(760, viewportSize.height - 125) :
               index === 4 ? Math.min(640, viewportSize.height - 200) :
               index === 5 ? Math.max(-13, -50) :
               cloud.baseTop,
    }));
  }, [viewportSize.width, viewportSize.height]);

  return (
    <>
      {clouds.map((cloud, i) => (
        <CloudComponent 
          key={i} 
          cloud={cloud} 
          viewportSize={viewportSize}
        />
      ))}
    </>
  );
} 