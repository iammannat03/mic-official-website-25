'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import Image from 'next/image';

// Types
interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
  width: number;
  height: number;
  src: string;
  alt: string;
}

interface ThemeColors {
  background: string;
  lineColor: string;
  borderColor: string;
  textColor: string;
  gridOpacity: string;
}

// Custom hook for cloud animation
function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    const animate = () => {
      frame.current += 1;
      const t = frame.current / 60; // 60fps
      setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

// Cloud configuration
const cloudConfig: CloudFloatOptions[] = [
  { baseTop: 150, baseLeft: -10, amplitude: 25, speed: 0.8, phase: 0, width: 355, height: 228, src: '/images/cloud1.png', alt: 'Cloud 1' },
  { baseTop: 460, baseLeft: 20, amplitude: 35, speed: 1.1, phase: 1, width: 367, height: 219, src: '/images/cloud2.png', alt: 'Cloud 2' },
  { baseTop: 700, baseLeft: 230, amplitude: 30, speed: 0.9, phase: 2, width: 355, height: 228, src: '/images/cloud1.png', alt: 'Cloud 3' },
  { baseTop: 790, baseLeft: 1000, amplitude: 28, speed: 1.2, phase: 3, width: 204, height: 125, src: '/images/cloud3.png', alt: 'Cloud 4' },
  { baseTop: 600, baseLeft: 1330, amplitude: 32, speed: 1.0, phase: 4, width: 204, height: 125, src: '/images/cloud3.png', alt: 'Cloud 5' },
  { baseTop: 120, baseLeft: 1140, amplitude: 27, speed: 1.3, phase: 5, width: 388, height: 254, src: '/images/cloud2.png', alt: 'Cloud 6' },
  { baseTop: -20, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6, width: 355, height: 228, src: '/images/cloud1.png', alt: 'Cloud 7' },
  { baseTop: 600, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4, width: 204, height: 125, src: '/images/cloud3.png', alt: 'Cloud 8' },
  { baseTop: 120, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5, width: 388, height: 254, src: '/images/cloud2.png', alt: 'Cloud 9' },
  { baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6, width: 355, height: 228, src: '/images/cloud1.png', alt: 'Cloud 10' },
];

// Memoized Cloud component
const Cloud = memo(({ config }: { config: CloudFloatOptions }) => {
  const { top, left } = useCloudFloat(config);
  const [imageError, setImageError] = useState(false);
  
  return (
    <Image
      src={imageError ? '/images/fallback-cloud.png' : config.src}
      alt={config.alt}
      width={config.width}
      height={config.height}
      className="absolute z-10 transition-transform duration-100"
      style={{ 
        top: `${top}px`, 
        left: `${left}px`, 
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
      loading="lazy"
      onError={() => setImageError(true)}
      priority={false}
    />
  );
});

Cloud.displayName = 'Cloud';

// Main component
const ProjectsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Prevent scroll and zoom
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';
    document.documentElement.style.overflow = 'hidden';

    const preventScroll = (e: Event) => e.preventDefault();
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);
    document.addEventListener('touchmove', preventScroll, { passive: false });

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  const getThemeColors = (): ThemeColors => ({
    background: isDarkMode
      ? 'linear-gradient(to bottom, #00040d 0%, #002855 100%)'
      : 'linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)',
    lineColor: isDarkMode ? '#0B3A79' : '#1e88e5',
    borderColor: isDarkMode ? '#1e40af' : '#3b82f6',
    textColor: isDarkMode ? 'text-white' : 'text-gray-900',
    gridOpacity: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
  });

  const themeColors = getThemeColors();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
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
      {isLoading ? (
        <div className="animate-pulse text-center">
          <div className={`h-8 w-48 ${themeColors.textColor} bg-opacity-20 bg-current rounded mb-4`} />
          <div className={`h-6 w-64 ${themeColors.textColor} bg-opacity-20 bg-current rounded`} />
        </div>
      ) : (
        <>
          {cloudConfig.map((config, index) => (
            <Cloud key={index} config={config} />
          ))}
          <h1
            className={`font-press-start ${themeColors.textColor} z-20 text-center mb-4 tracking-tight transition-colors duration-300`}
            style={{ fontSize: 'min(6vw, 3.5rem)' }}
            role="heading"
            aria-level={1}
          >
            Projects
          </h1>
          <p
            className={`font-press-start ${themeColors.textColor} text-lg sm:text-xl md:text-2xl z-20 transition-colors duration-300`}
            aria-live="polite"
          >
            Under Construction
          </p>
        </>
      )}
    </div>
  );
};

export default memo(ProjectsPage);