"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MysteryCard = ({
  frameColor,
  innerColor,
  dotColor,
  title,
  desc,
  style,
}: {
  frameColor: string;
  innerColor: string;
  dotColor: string;
  title: string;
  desc: string;
  style?: React.CSSProperties;
}) => (
  <div
    className="mystery-card group relative"
    style={{ background: frameColor, borderColor: frameColor, boxShadow: `0 0 0 4px ${dotColor}50`, ...style }}
  >
    <div className="inner-panel" style={{ background: innerColor }} />
    <div className="corner-dot top-left" style={{ background: dotColor }} />
    <div className="corner-dot top-right" style={{ background: dotColor }} />
    <div className="corner-dot bottom-left" style={{ background: dotColor }} />
    <div className="corner-dot bottom-right" style={{ background: dotColor }} />
    <div className="hover-question">
      <span style={{ color: dotColor }}>?</span>
    </div>
    <div className="hover-details" style={{ color: dotColor }}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
    <style jsx>{`
      .mystery-card {
        width: 300px;
        height: 280px;
        border: 10px solid;
        border-radius: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 16px;
        position: relative;
        opacity: 1;
        cursor: default;
        transition: all 0.3s ease;
        box-shadow: 0 0 0 4px var(--dot-color-transparent, #00000050);
      }
      .inner-panel {
        position: absolute;
        left: 5px;
        top: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 15px;
        z-index: 8;
      }
      .corner-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        z-index: 3;
      }
      .top-left {
        top: 26px;
        left: 26px;
      }
      .top-right {
        top: 26px;
        right: 26px;
      }
      .bottom-left {
        bottom: 26px;
        left: 26px;
      }
      .bottom-right {
        bottom: 26px;
        right: 26px;
      }
      .hover-question {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4.5rem;
        font-weight: 900;
        font-family: 'Press Start 2P', monospace;
        letter-spacing: 2px;
        user-select: none;
        margin-top: 10px;
        transition: opacity 0.3s ease;
        z-index: 20;
        pointer-events: none;
      }
      .hover-details {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 30;
        pointer-events: none;
      }
      .group:hover .hover-question {
        opacity: 0;
      }
      .group:hover .hover-details {
        opacity: 1;
      }
      .hover-details h3 {
        font-family: 'Press Start 2P', monospace;
        font-weight: 700;
        font-size: 1.15rem;
        text-transform: capitalize;
        text-shadow: 2px 2px 0 #fff, 4px 4px 0 #000;
        margin: 0 0 12px;
        letter-spacing: 1px;
      }
      .hover-details p {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 0.875rem;
        color: #444;
        line-height: 1.4;
        margin: 0;
      }
      @media (max-width: 1200px) {
        .mystery-card {
          width: 250px;
          height: 235px;
          margin: 14px;
        }
        .hover-question {
          font-size: 4rem;
        }
        .hover-details h3 {
          font-size: 1rem;
        }
        .hover-details p {
          font-size: 0.8rem;
        }
      }
      @media (max-width: 900px) {
        .mystery-card {
          width: 200px;
          height: 190px;
          margin: 12px;
        }
        .hover-question {
          font-size: 3rem;
        }
        .hover-details h3 {
          font-size: 0.85rem;
        }
        .hover-details p {
          font-size: 0.7rem;
        }
      }
      @media (max-width: 600px) {
        .mystery-card {
          width: 100%;
          max-width: 300px;
          height: auto;
          margin: 12px auto;
        }
      }
    `}</style>
  </div>
);


interface CloudFloatOptions {
  baseTop: number;  // changed to number for calculation
  baseLeft: number; 
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

      // Modify top calculation so cloud never goes below  window height - footer height - cloud height offset 
      // Let's assume footer height ~172px and cloud height offset conservatively 130px
      // So maxTop = window.innerHeight - 172 - 130 = window.innerHeight - 302 approx.
      // We'll min-limit top to maxTop: if computed top > maxTop, clamp it

      const maxTop = window.innerHeight - 302;

      let newTop = baseTop + Math.sin(t * speed + phase) * amplitude;
      if (newTop > maxTop) {
        newTop = maxTop;
      }

      setTop(newTop);

      if (running) requestAnimationFrame(animate);
    }

    animate();

    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}


const AboutUsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    document.body.style.minHeight = '100vh';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.minHeight = '100vh';
    document.documentElement.style.overflowX = 'hidden';

    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };

    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && ['+', '-', '0'].includes(e.key)) e.preventDefault();
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
    };
  }, []);

  const themeColors = isDarkMode
    ? {
      background: 'linear-gradient(to bottom, #00040d 0%, #002855 100%)',
      gridOpacity: 'rgba(255, 255, 255, 0.1)',
    }
    : {
      background: 'linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)',
      gridOpacity: 'rgba(255, 255, 255, 0.3)',
    };


  // Adjusted clouds positions by making sure clouds Y start higher (reduce some baseTop to leave space)
  const cloudPositions = [
    useCloudFloat({ baseTop: 130, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 440, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 655, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 730, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -10, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  const cloudImages = [
    '/images/cloud1.png',
    '/images/cloud2.png',
    '/images/cloud1.png',
    '/images/cloud3.png',
    '/images/cloud3.png',
    '/images/cloud2.png',
    '/images/cloud1.png',
    '/images/cloud3.png',
    '/images/cloud2.png',
    '/images/cloud1.png',
  ];

  const lift = 36;

  return (
    <>
      <div
        className="page-container"
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
          overflowX: 'hidden',
          minHeight: '100vh',
          paddingBottom: '190px',  // <-- increased paddingBottom to avoid overlap with footer
        }}
      >
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

        {cloudPositions.map((pos, idx) => (
          <Image
            key={idx}
            src={cloudImages[idx]}
            alt={`Cloud ${idx + 1}`}
            width={idx % 2 === 0 ? 355 : 204}
            height={idx % 2 === 0 ? 228 : 125}
            style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 2 }}
            priority
          />
        ))}

        <div className="about-heading">
          <h1>About us</h1>
        </div>

        <div className="cards-container">
          <MysteryCard frameColor="#ffdd67" innerColor="#fff6de" dotColor="#8f6200" title="T@rang" desc="dev" style={{ marginTop: lift }} />
          <MysteryCard frameColor="#f7a8a8" innerColor="#ffe5ed" dotColor="#a13b48" title="Helloo There" desc=" system development." style={{ marginTop: 0 }} />
          <MysteryCard frameColor="#7faee3" innerColor="#d1f1ff" dotColor="#294771" title="Hello World!" desc=" MIC events." style={{ marginTop: lift }} />
        </div>
      </div>

      {/* Mario Footer */}
      <div className="mario-footer">
        <Image
          src="/images/Mario.png"
          alt="Mario Footer"
          width={1512}
          height={172}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          priority
        />
      </div>

      <style jsx>{`
        .page-container {
          position: relative;
          width: 100%;
          max-width: 100vw;
          margin: 0 auto;
        }
        .about-heading {
          position: relative;
          width: 90%;
          max-width: 650px;
          margin: 180px auto 40px auto;
          text-align: center;
          user-select: none;
          pointer-events: none;
        }
        .about-heading h1 {
          font-family: 'Press Start 2P', monospace;
          color: #fff;
          font-size: clamp(2rem, 5vw, 3.5rem);
          letter-spacing: 2px;
          text-shadow: 4px 4px 0 #000, 0 2px 8px #000;
          text-transform: capitalize;
          margin: 0;
          line-height: 1;
        }
        .cards-container {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
          padding: 0 12px;
          margin-bottom: 48px;
        }
        @media (max-width: 900px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
            margin-bottom: 24px;
          }
          .mystery-card {
            margin: 12px 0 !important;
          }
        }
        /* Mario Footer styles */
        .mario-footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100vw;
          z-index: 100;
          pointer-events: none;
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default AboutUsPage;
