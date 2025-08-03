'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ✅ for navigation
import TeamMemberCard from './components/TeamMemberCard';
import PresidentCard from './components/PresidentCard';
import VicePresidentCard from './components/VicePresidentCard';
import ManagementSecCard from './components/ManagementSecCard';
import TechSecCard from './components/TechSecCard';
import NonTechSecCard from './components/NonTechSecCard';

interface CloudFloatOptions {
  baseTop: string | number;
  baseLeft: string | number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(Number(baseTop) + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

const MeetTheBoardPage: React.FC = () => {
  const [view, setView] = useState<'board' | 'departments'>('board');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter(); // ✅ for navigation

  // Define cloud positions using hooks at the top level
  const cloudPositions = [
    useCloudFloat({ baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 700, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -23, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
    };
  }, []);

  const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        lineColor: "#0B3A79",
        borderColor: "#1e40af",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        lineColor: "#1e88e5",
        borderColor: "#3b82f6",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };

  const themeColors = getThemeColors();

  return (
    <div className="full-screen-container">
      <div className="content-wrapper">
        <div
          className="min-h-screen flex flex-col items-center p-5 relative"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
              linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
              ${themeColors.background}
            `,
            backgroundSize: "30px 30px, 30px 30px, 100% 100%",
            backgroundRepeat: "repeat, repeat, no-repeat",
            backgroundPosition: "top left, top left, center",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {/* Clouds */}
          {(() => {
            const cloudImages = [
              '/images/cloud1.png', '/images/cloud2.png', '/images/cloud1.png',
              '/images/cloud3.png', '/images/cloud3.png', '/images/cloud2.png',
              '/images/cloud1.png', '/images/cloud3.png', '/images/cloud2.png',
              '/images/cloud1.png'
            ];

            return cloudPositions.map((pos, i) => (
              <Image
                key={i}
                src={cloudImages[i]}
                alt={`Cloud ${i + 1}`}
                width={355}
                height={228}
                style={{ position: 'absolute', ...pos, zIndex: 2 }}
              />
            ));
          })()}

          {/* Heading */}
          <h1 className={`${themeColors.textColor} font-press-start z-10 text-center mb-2`}
            style={{ fontSize: "min(6vw, 4rem)" }}>
            Meet the Team
          </h1>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 mb-8 relative z-10">
            {/* Board Button */}
            <button
              className={`relative w-[345px] h-[81px] flex items-center justify-center border-none bg-transparent p-0 focus:outline-none transition-all duration-1000`}
              onClick={() => setView('board')}
              aria-pressed={view === 'board'}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span className="font-press-start text-[24px] text-black z-10">BOARD</span>
            </button>

            {/* Departments Button (with router.push) */}
            <button
              className={`relative w-[345px] h-[81px] flex items-center justify-center border-none bg-transparent p-0 focus:outline-none transition-all duration-1000`}
              onClick={() => router.push('/meetttheboardpage')} // ✅ Navigates to a new page
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span className="font-press-start text-[24px] text-black z-10">DEPARTMENTS</span>
            </button>
          </div>

          {/* Board View */}
          {view === 'board' && (
            <div className="flex flex-col items-center space-y-8 relative z-10">
              <div className="flex justify-center space-x-8">
                <PresidentCard name="NAME" />
                <VicePresidentCard name="NAME" />
                <ManagementSecCard name="NAME" />
              </div>
              <div className="flex justify-center space-x-8">
                <TechSecCard name="NAME" />
                <NonTechSecCard name="NAME" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetTheBoardPage;
