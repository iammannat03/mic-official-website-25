'use client';

import React from 'react';
import { 
  ArcadeCabinet, 
  Clouds, 
  useResponsiveScale, 
  useDarkMode, 
  getThemeColors,
  SANS_FONT 
} from './_components';

export default function LeaderboardArcade() {
  const scale = useResponsiveScale();
  const isDarkMode = useDarkMode();
  const themeColors = getThemeColors(isDarkMode);

  return (
    <div
      className="min-h-screen w-full h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        fontFamily: SANS_FONT,
        backgroundImage: `
          linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
          ${themeColors.background}
        `,
        backgroundSize: '30px 30px, 30px 30px, 100% 100%',
        backgroundRepeat: 'repeat, repeat, no-repeat',
        backgroundPosition: 'top left, top left, center',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <Clouds />
      <ArcadeCabinet scale={scale} />
    </div>
  );
}
