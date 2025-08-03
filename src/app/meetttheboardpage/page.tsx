'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import RedCard from './components/RedCard';
import BlueCard from './components/BlueCard';
import GreenCard from './components/GreenCard';
import YellowCard from './components/YellowCard';
import YearButton from './components/YearButton';
import { useRouter } from 'next/navigation';

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

const dummyData = [
  { name: 'Sanjay Dinesh', title: 'AIML', imageSrc: '/images/mic_departments/aiml_sanjay.jpg' },
  { name: 'Abhinav Kumar V', title: 'AIML', imageSrc: '/images/mic_departments/aiml_abhinav.jpg' },
  { name: 'Aman', title: 'CP', imageSrc: '/images/mic_departments/cp_aman.jpg' },
  { name: 'Anmol Singh', title: 'CP', imageSrc: '/images/mic_departments/cp_anmol.jpg' },
  { name: 'Aagney', title: 'Content', imageSrc: '/images/mic_departments/content_aagney.jpg' },
  { name: 'Shambhavi', title: 'Content', imageSrc: '/images/mic_departments/content_shambhavi.jpg' },
  { name: 'Pranjal Mitra', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_pranjal.jpg' },
  { name: 'Mohammed Tahir', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_mohammed.jpg' },
  { name: 'Gladwin Daniel', title: 'Design', imageSrc: '/images/mic_departments/design_Gladwin.jpg' },
  { name: 'Jahnavi Nair', title: 'Design', imageSrc: '/images/mic_departments/' },
  { name: 'Rakshana V', title: 'Development', imageSrc: '/images/mic_departments/dev_rakshana.jpg' },
  { name: 'Mithil Girish', title: 'Development', imageSrc: '/images/mic_departments/dev_mithil.jpg' },
  { name: 'Samyak Srijan', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_samyak.jpg' },
  { name: 'Abishek B S', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_abhishek.jpg' },
  { name: 'Jefrey Jose D', title: 'Management', imageSrc: '/images/mic_departments/man_jefrey.jpg' },
  { name: 'Namita Sathish', title: 'Management', imageSrc: '/images/mic_departments/man_namitha.jpg' },
  { name: 'Bhargavi Deshmukh', title: 'Management', imageSrc: '/images/mic_departments/man_bhargavi.jpg' },
  { name: 'Anjum Sana', title: 'Social Media & Outreach', imageSrc: '/images/mic_departments/so_sana.jpg' },
  { name: 'Mithun Miras', title: 'Social Media & Outreach', imageSrc: '/images/mic_departments/so_mithun.jpg' },
  { name: 'Sravan Kowsik G', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_shravan.jpg' },
  { name: 'Richika Rani', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_richika.jpg' },


];

const cardOrder = [RedCard, BlueCard, GreenCard, YellowCard];

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
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

const MeetTheBoardPage: React.FC = () => {
  const [view, setView] = useState<'board' | 'departments'>('departments');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const rows = [];
  const cardsPerRow = 4;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = isDarkMode
    ? {
      background: 'linear-gradient(to bottom, #00040d 0%, #002855 100%)',
      gridOpacity: 'rgba(255, 255, 255, 0.05)',
      headingColor: 'text-white',
    }
    : {
      background: 'linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)',
      gridOpacity: 'rgba(255, 255, 255, 0.25)',
      headingColor: 'text-black',
    };

  for (let i = 0; i < dummyData.length; i += cardsPerRow) {
    rows.push(dummyData.slice(i, i + cardsPerRow));
  }

  const handleBoardClick = () => router.push('/leads');

  return (
    <div
      className="min-h-screen flex flex-col items-center p-8 relative font-sans"
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
      }}
    >
      {/* Clouds */}
      {(() => {
        const clouds = [
          useCloudFloat({ baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
          useCloudFloat({ baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
          useCloudFloat({ baseTop: 772.98, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
          useCloudFloat({ baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
          useCloudFloat({ baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
          useCloudFloat({ baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
          useCloudFloat({ baseTop: -23, baseLeft: 847, amplitude: 22, speed: 1.05, phase: 6 }),
        ];
        const cloudImages = [
          '/images/cloud1.png',
          '/images/cloud2.png',
          '/images/cloud1.png',
          '/images/cloud3.png',
          '/images/cloud3.png',
          '/images/cloud2.png',
          '/images/cloud1.png',
        ];
        return clouds.map((pos, i) => (
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

      {/* Stars / Dots */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1154, height: 364, zIndex: 2 }}>
        <svg width="1154" height="364" viewBox="0 0 1154 364" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="1150.02" cy="55" rx="3.98" ry="4" fill="white" />
          <ellipse cx="949.88" cy="19" rx="3.98" ry="4" fill="white" />
          <ellipse cx="203.12" cy="4" rx="3.98" ry="4" fill="white" />
          <ellipse cx="134.42" cy="211" rx="3.98" ry="4" fill="white" />
          <ellipse cx="3.98" cy="360" rx="3.98" ry="4" fill="white" />
          <ellipse cx="486.89" cy="95" rx="3.98" ry="4" fill="white" />
          <ellipse cx="677.07" cy="47" rx="3.98" ry="4" fill="white" />
          <ellipse cx="1084.3" cy="299" rx="3.98" ry="4" fill="white" />
        </svg>
      </div>

      {/* Year Selector */}
      <div className="mb-8 z-10 flex ">
        {view === 'departments' && <div className="absolute left-0 ml-32
        "><YearButton /></div>}
      </div>

      {/* Heading */}
      <h1 className={`${theme.headingColor} font-press-start z-10 text-center mb-2`} style={{ fontSize: 'min(6vw, 4rem)' }}>
        Meet the Team
      </h1>

      {/* Toggle Tabs */}
      <div className="flex space-x-4 mb-8 relative z-10">
        <button
          className="relative w-[345px] h-[81px] flex items-center justify-center bg-transparent"
          onClick={handleBoardClick}
        >
          <img src="/images/button-gold.svg" alt="Board" className="absolute inset-0 w-full h-full pointer-events-none select-none" />
          <span className="font-press-start text-[24px] text-black z-10">BOARD</span>
        </button>
        <button
          className="relative w-[345px] h-[81px] flex items-center justify-center bg-transparent"
          onClick={() => setView('departments')}
        >
          <img src="/images/button-gold.svg" alt="Departments" className="absolute inset-0 w-full h-full pointer-events-none select-none" />
          <span className="font-press-start text-[24px] text-black z-10">DEPARTMENTS</span>
        </button>
      </div>

      {/* Cards */}
      {view === 'departments' && (
        <div className="flex flex-col items-center space-y-8 relative z-10">
          {rows.map((rowData, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-8">
              {rowData.map((data, index) => {
                const CardComponent = cardOrder[index % cardOrder.length];
                return (
                  <CardComponent
                    key={index}
                    name={data.name}
                    title={data.title}
                    imageSrc={data.imageSrc}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetTheBoardPage;
