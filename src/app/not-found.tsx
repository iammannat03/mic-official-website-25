"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// --- Cloud Animation Hook (copied from meetttheboardpage/page.tsx) ---
interface CloudFloatOptions {
  baseTop: number;
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
      setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, [baseTop, amplitude, speed, phase]);
  return { top, left: baseLeft };
}

const menuButtonSvg = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#0F3" stroke="#000" strokeWidth="4"/>
    <rect x="12" y="16" width="24" height="4" rx="2" fill="#222"/>
    <rect x="12" y="24" width="24" height="4" rx="2" fill="#222"/>
    <rect x="12" y="32" width="24" height="4" rx="2" fill="#222"/>
  </svg>
);

const buttonSvg = (
  <svg width="596" height="111" viewBox="0 0 596 111" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="2.66455" width="596" height="108.336" fill="black"/>
    <rect width="592" height="102" fill="#82D0D8"/>
    <path d="M53 65V37H77V41H81V53H73V57H77V61H81V65H69V61H65V57H61V65H53ZM61 53H69V49H73V41H61V53ZM85 65V37H113V41H93V49H109V53H93V61H113V65H85ZM121 65V61H117V57H125V61H137V53H121V49H117V41H121V37H141V41H145V45H137V41H125V49H141V53H145V61H141V65H121ZM149 65V37H173V41H177V53H173V57H157V65H149ZM157 53H169V41H157V53ZM181 65V45H185V41H189V37H201V41H205V45H209V65H201V57H189V65H181ZM189 53H201V45H197V41H193V45H189V53ZM217 65V61H213V37H221V53H225V37H229V53H233V37H241V61H237V65H233V61H229V57H225V61H221V65H217ZM245 65V37H253V41H257V45H261V49H265V37H273V65H265V57H261V53H257V49H253V65H245ZM321 65V41H313V37H337V41H329V65H321ZM345 65V61H341V41H345V37H365V41H369V61H365V65H345ZM349 61H361V41H349V61ZM405 65V37H413V49H425V37H433V65H425V53H413V65H405ZM441 65V61H437V41H441V37H461V41H465V61H461V65H441ZM445 61H457V41H445V61ZM469 65V37H477V41H481V45H485V41H489V37H497V65H489V49H485V57H481V49H477V65H469ZM501 65V37H529V41H509V49H525V53H509V61H529V65H501Z" fill="black"/>
  </svg>
);

const whiteDotsSvg = (
  <svg width="1159" height="364" viewBox="0 0 1159 364" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
    <circle cx="1155" cy="55" r="4" fill="white"/>
    <circle cx="954" cy="19" r="4" fill="white"/>
    <circle cx="204" cy="4" r="4" fill="white"/>
    <circle cx="135" cy="211" r="4" fill="white"/>
    <circle cx="4" cy="360" r="4" fill="white"/>
    <circle cx="489" cy="95" r="4" fill="white"/>
    <circle cx="680" cy="47" r="4" fill="white"/>
    <circle cx="1089" cy="299" r="4" fill="white"/>
  </svg>
);

const logoUrl = "/images/mic-logo.png"; // Place your logo PNG in public/images/mic-logo.png
const textPngUrl = "/images/you-died-404.png"; // Place your PNG text in public/images/you-died-404.png

const NotFoundPage: React.FC = () => {
  // Cloud positions and animation (match sizes/positions from screenshot)
  const c1 = useCloudFloat({ baseTop: 60, baseLeft: 60, amplitude: 20, speed: 0.8, phase: 0 });
  const c2 = useCloudFloat({ baseTop: 120, baseLeft: 900, amplitude: 25, speed: 1.1, phase: 1 });
  const c3 = useCloudFloat({ baseTop: 300, baseLeft: 100, amplitude: 18, speed: 0.9, phase: 2 });
  const c4 = useCloudFloat({ baseTop: 320, baseLeft: 900, amplitude: 22, speed: 1.2, phase: 3 });
  const c5 = useCloudFloat({ baseTop: 200, baseLeft: 1100, amplitude: 15, speed: 1.0, phase: 4 });
  const c6 = useCloudFloat({ baseTop: 30, baseLeft: 700, amplitude: 17, speed: 1.3, phase: 5 });
  const c7 = useCloudFloat({ baseTop: 10, baseLeft: 400, amplitude: 12, speed: 1.05, phase: 6 });

  const [menuOpen, setMenuOpen] = useState(false);
  // Theme detection
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
      };
    }
  }, []);

  // Choose gradient based on theme
  const gradientBg = isDark
    ? "linear-gradient(180deg, rgba(0,8,16,0.95) 0%, rgba(23,72,98,0.95) 34%, rgba(17,51,115,0.95) 71%, rgba(25,44,85,0.95) 100%)"
    : "linear-gradient(180deg, rgba(179,217,255,0.85) 0%, rgba(179,229,255,0.85) 34%, rgba(177,240,252,0.85) 71%, rgba(176,249,250,0.85) 100%) repeat-y";

  return (
    <>
      {/* Grid background at the very bottom */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundColor: 'transparent'
        }}
      />
      {/* Gradient overlay */}
      <div className="pointer-events-none fixed inset-0 z-10" style={{
        background: gradientBg,
        mixBlendMode: "multiply"
      }} />
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center z-20" style={{ fontFamily: 'Press Start 2P, monospace' }}>
        {/* White dots */}
        {whiteDotsSvg}
        {/* Clouds */}
        <Image src="/images/cloud1.png" alt="Cloud 1" width={355} height={228} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }), zIndex: 2 }} />
        <Image src="/images/cloud2.png" alt="Cloud 2" width={367} height={219} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }), zIndex: 2 }} />
        <Image src="/images/cloud1.png" alt="Cloud 3" width={355} height={228} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 772.98, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }), zIndex: 2 }} />
        <Image src="/images/cloud3.png" alt="Cloud 4" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }), zIndex: 2 }} />
        <Image src="/images/cloud3.png" alt="Cloud 5" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }), zIndex: 2 }} />
        <Image src="/images/cloud2.png" alt="Cloud 6" width={388} height={254} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }), zIndex: 2 }} />
        <Image src="/images/cloud1.png" alt="Cloud 7" width={355} height={228} style={{ position: 'absolute', ...useCloudFloat({ baseTop: -23, baseLeft: 847, amplitude: 22, speed: 1.05, phase: 6 }), zIndex: 2 }} />
        {/* Logo */}
        <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}>
          <Image src={logoUrl} alt="MIC Logo" width={64} height={64} />
        </div>
        {/* Dot on right edge above clouds */}
        <div style={{ position: 'absolute', top: 80, right: 40, zIndex: 10 }}>
          <Image src="/images/dot.png" alt="Star" width={8} height={8} />
        </div>
        {/* Cloud above YOU DIED! 404 (animated) */}
        <Image src="/images/cloud3.png" alt="Cloud Above 404" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 80, baseLeft: 500, amplitude: 18, speed: 1.1, phase: 7 }), zIndex: 11 }} />
        {/* Main PNG text */}
        <div style={{ position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <Image src={textPngUrl} alt="YOU DIED! 404" width={1000} height={258} />
        </div>
        {/* Button */}
        <button
          type="button"
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(45% + 129px)', // 45% (new center) + half image height (129px) + margin (8px)
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: 340,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => {
            // TODO: Add navigation or logic for respawn button here
          }}
        >
          <Image src="/images/respawn-button.png" alt="RESPAWN TO HOME" width={340} height={70} />
        </button>
        {/* Cloud under and bottom right to RESPWAN button (animated) */}
        <Image src="/images/cloud3.png" alt="Cloud Bottom Right Respawn" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 520, baseLeft: 950, amplitude: 20, speed: 1.15, phase: 8 }), zIndex: 2 }} />
        {/* Green menu button */}
        <button
          style={{ position: 'absolute', right: 32, bottom: 32, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          {menuButtonSvg}
        </button>
        {/* Placeholder menu */}
        {menuOpen && (
          <div style={{ position: 'absolute', right: 90, bottom: 90, zIndex: 30, background: '#222', color: '#fff', padding: 24, borderRadius: 12, minWidth: 200, fontSize: 16 }}>
            <div>Menu placeholder</div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotFoundPage; 