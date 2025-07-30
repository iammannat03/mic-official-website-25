'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const [left, setLeft] = useState(baseLeft);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const vw = window.innerWidth;
      const scale = vw / 1920;
      setLeft(baseLeft * scale);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      running = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [baseTop, baseLeft, amplitude, speed, phase]);

  return { top, left };
}

const themeStyles = (isDarkMode: boolean) => ({
  background: isDarkMode
    ? 'linear-gradient(to bottom, #00040d 0%, #002855 100%)'
    : 'linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)',
  gridOpacity: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
});

const Logo = () => (
  <Link href="/" passHref>
    <Image
      src="/images/mic-logo.png"
      alt="MIC Logo"
      width={80}
      height={80}
      style={{ position: 'absolute', top: 20, left: 20, zIndex: 50, cursor: 'pointer' }}
      priority
    />
  </Link>
);

const ClubLogo = () => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: 100,
      transform: 'translateX(-50%)',
      zIndex: 11,
    }}
  >
    <Image
      src="/images/Group 204.png"
      alt="Microsoft Innovations Club Logo"
      width={700}
      height={180}
      style={{ width: '90vw', maxWidth: 700, height: 'auto', display: 'block' }}
      priority
    />
  </div>
);

const ContentBox = ({ inputText, setInputText }: { inputText: string; setInputText: (val: string) => void }) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: 312,
      transform: 'translateX(-50%)',
      width: '90vw',
      maxWidth: 1011,
      aspectRatio: '1011 / 321.15',
      zIndex: 10,
      textAlign: 'center',
      background: '#ccc',
      border: '2px solid #222',
      borderRadius: 8,
      boxShadow: '4px 4px 0 #222',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}
  >
    <div
      style={{
        fontSize: 'clamp(18px, 2vw, 32px)',
        fontFamily: "'Press Start 2P', monospace",
        color: '#222',
        padding: '24px 0 0 0',
      }}
    >
      Generating World
    </div>
    <div
      style={{
        background: '#111',
        color: '#fff',
        width: '90%',
        maxWidth: 958,
        minHeight: 160,
        borderRadius: '0 0 8px 8px',
        marginTop: 20,
        fontSize: 'clamp(16px, 1.5vw, 22px)',
        fontFamily: "'Press Start 2P', monospace",
        letterSpacing: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'inherit',
          outline: 'none',
          width: '90%',
          textAlign: 'center',
          marginBottom: 24,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            style={{ width: 32, height: 12, background: '#abffe2', borderRadius: 5 }}
          />
        ))}
      </div>
    </div>
  </div>
);

const Clouds = ({ clouds }: { clouds: { top: number; left: number }[] }) => (
  <>
    {clouds.map((cloud, idx) => (
      <Image
        key={idx}
        src={`/images/cloud${(idx % 3) + 1}.png`}
        alt={`Cloud ${idx + 1}`}
        width={idx % 3 === 2 ? 204 : idx % 3 === 1 ? 367 : 355}
        height={idx % 3 === 2 ? 125 : idx % 3 === 1 ? 219 : 228}
        style={{ position: 'absolute', top: `${cloud.top}px`, left: `${cloud.left}px`, zIndex: 2 }}
        priority
      />
    ))}
  </>
);

const LoadingPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputText, setInputText] = useState('Lorem ipsum dolor sit amet');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();
    const preventZoom = (e: WheelEvent) => { if (e.ctrlKey) e.preventDefault(); };
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && ['+', '-', '0'].includes(e.key)) e.preventDefault();
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const cloudPositions = [
    { baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 },
    { baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 },
    { baseTop: 700, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 },
    { baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 },
    { baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 },
    { baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 },
    { baseTop: -23, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 },
    { baseTop: 604.98, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 },
    { baseTop: 127.98, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 },
    { baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 },
  ].map(useCloudFloat);

  const theme = themeStyles(isDarkMode);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${theme.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${theme.gridOpacity} 1px, transparent 1px),
          ${theme.background}
        `,
        backgroundSize: '30px 30px, 30px 30px, 100% 100%',
        backgroundRepeat: 'repeat, repeat, no-repeat',
        backgroundPosition: 'top left, top left, center',
        userSelect: 'none',
        touchAction: 'none',
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      <Logo />
      <ClubLogo />
      <ContentBox inputText={inputText} setInputText={setInputText} />
      <Clouds clouds={cloudPositions} />
    </div>
  );
};

export default LoadingPage;
