'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react'; 


interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Completed' | 'In Progress';
  techStack: string[];
  codeLink?: string;
  demoLink?: string;
  image: string;
  color: string;
  accentColor: string;
}

//  project data 
const projects: Project[] = [
  { 
    id: 1, 
    name: 'Project Name 1', 
    description: 'Brief description of the project goes here. Explain what it does and its purpose.', 
    status: 'In Progress', 
    techStack: ['Tech1', 'Tech2', 'Tech3'], 
    codeLink: '#', 
    demoLink: '#', 
    image: '/images/projects/placeholder.png', 
    color: 'bg-red-500',
    accentColor: 'border-gray-600'
  },
  { 
    id: 2, 
    name: 'Project Name 2', 
    description: 'Brief description of the project goes here. Explain what it does and its purpose.', 
    status: 'Completed', 
    techStack: ['Tech1', 'Tech2'], 
    codeLink: '#', 
    demoLink: '#', 
    image: '/images/projects/placeholder.png', 
    color: 'bg-sky-500',
    accentColor: 'border-gray-600'
  },
  { 
    id: 3, 
    name: 'Project Name 3', 
    description: 'Brief description of the project goes here. Explain what it does and its purpose.', 
    status: 'In Progress', 
    techStack: ['Tech1', 'Tech2'], 
    codeLink: '#', 
    demoLink: '#', 
    image: '/images/projects/placeholder.png', 
    color: 'bg-green-500',
    accentColor: 'border-gray-600'
  },
  { 
    id: 4, 
    name: 'Project Name 4', 
    description: 'Brief description of the project goes here. Explain what it does and its purpose.', 
    status: 'Completed', 
    techStack: ['Tech1', 'Tech2'], 
    codeLink: '#', 
    demoLink: '#', 
    image: '/images/projects/placeholder.png',
    color: 'bg-yellow-500',
    accentColor: 'border-gray-600'
  },
];


interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

  


function useCloudFloat({ baseTop, baseLeft, amplitude = 20, speed = 0.5, phase = 0 }: CloudFloatOptions) {
  const [position, setPosition] = useState({ top: baseTop });
  const frameRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      frameRef.current += 1;
      const verticalOffset = Math.sin((frameRef.current / 60) * speed + phase) * amplitude;
      setPosition({ top: baseTop + verticalOffset });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [baseTop, amplitude, speed, phase]);

  return { top: `${position.top}px`, left: `${baseLeft}px` };
}

const ProjectsPage: React.FC = () => {
  // State to keep track of the currently selected project
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
    const [isDarkMode, setIsDarkMode] = useState(false);
  

  
  
    // Cloud positions
    const cloudPositions = [
      useCloudFloat({ baseTop: 100, baseLeft: -50, amplitude: 25, speed: 0.8, phase: 0 }),
      useCloudFloat({ baseTop: 300, baseLeft: 1200, amplitude: 30, speed: 1.1, phase: 1 }),
      useCloudFloat({ baseTop: 600, baseLeft: 100, amplitude: 35, speed: 0.9, phase: 2 }),
      useCloudFloat({ baseTop: 800, baseLeft: 1000, amplitude: 28, speed: 1.2, phase: 3 }),
      useCloudFloat({ baseTop: 1100, baseLeft: 200, amplitude: 32, speed: 1.0, phase: 4 }),
      useCloudFloat({ baseTop: 1300, baseLeft: 900, amplitude: 27, speed: 1.3, phase: 5 }),
      useCloudFloat({ baseTop: 1500, baseLeft: 50, amplitude: 30, speed: 0.85, phase: 6 }),
    ];

    const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };
  const themeColors = getThemeColors();
  
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
  
    useEffect(() => {
      const style = document.createElement('style');
      
      document.head.appendChild(style);
  
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
  
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
  
      return () => {
        document.removeEventListener('wheel', preventZoom);
        document.removeEventListener('keydown', preventKeyboardZoom);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }, []);

  

  return (
    <>
      {/* Global styles for font and pixelated rendering */}

      <div className="h-screen w-full relative overflow-hidden  font-press-start" style={{
              backgroundImage: `
                linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
                linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
                ${themeColors.background}
              `,
              backgroundSize: "30px 30px, 30px 30px, 100% 100%",
              backgroundRepeat: "repeat, repeat, no-repeat",
              backgroundPosition: "top left, top left, center",
              userSelect: "none",
            }}>
            
            {/* Floating Clouds */}
            {cloudPositions.map((pos, i) => (
              <Image
                key={i}
                src={`/images/cloud${(i % 3) + 1}.png`}
                alt={`Cloud ${i + 1}`}
                width={300}
                height={180}
                className="pointer-events-none"
                style={{ position: 'absolute', ...pos, zIndex: 1, opacity: 0.7 }}
              />
            ))}
        
        

        {/* Main Content Window */}
        <div className="relative z-20 flex items-center justify-center h-full p-4 md:p-8">
          <div className="w-full max-w-7xl h-full bg-[#0F172A] border-4 border-black flex flex-col md:flex-row p-1 shadow-[8px_8px_0px_#000]">
            
            {/* Left Section: Project Details */}
            <div className="flex-[3] text-white p-4 md:p-8 flex flex-col">
              

              {/* Main Display Area */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Box */}
                <div className="relative w-full h-64 lg:h-full">
                   <div className="absolute -top-2 -left-2 w-8 h-1 bg-red-500"></div>
                   <div className="absolute -top-2 -left-2 w-1 h-8 bg-red-500"></div>
                   <div className="absolute -top-2 -right-2 w-8 h-1 bg-red-500"></div>
                   <div className="absolute -top-2 -right-2 w-1 h-8 bg-red-500"></div>
                   <div className="absolute -bottom-2 -left-2 w-8 h-1 bg-red-500"></div>
                   <div className="absolute -bottom-2 -left-2 w-1 h-8 bg-red-500"></div>
                   <div className="absolute -bottom-2 -right-2 w-8 h-1 bg-red-500"></div>
                   <div className="absolute -bottom-2 -right-2 w-1 h-8 bg-red-500"></div>

                  <div className="w-full h-full bg-black border-4 border-white p-2">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.name}
                      layout="fill"
                      objectFit="cover"
                      className="pixelated"
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl text-pink-500 mb-2">{selectedProject.name}</h2>
                    <span className="text-xs bg-black text-white border-2 border-white px-2 py-1">
                      {selectedProject.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {selectedProject.description}
                  </p>
                  <div>
                    <h3 className="text-md text-gray-400 mb-2">Tech Stack:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                        <span key={tech} className="text-xs bg-[#334155] text-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                   <div className="flex flex-wrap gap-3 mt-auto pt-4">
                      {selectedProject.codeLink && (
                        <a href={selectedProject.codeLink} target="_blank" className="bg-gray-700 text-white px-4 py-2 flex items-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                          <Github size={16} /> Code
                        </a>
                      )}
                      {selectedProject.demoLink && (
                        <a href={selectedProject.demoLink} target="_blank" className="bg-pink-200 text-black px-4 py-2 flex items-center gap-2 border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                          <ExternalLink size={16} /> Demo
                        </a>
                      )}
                    </div>
                </div>
              </div>
            </div>

            {/* Right Section: Project List */}
            <div className="flex-[1] bg-[#020617] border-t-4 md:border-t-0 md:border-l-4 border-black p-4">
              <div className="flex flex-col gap-4">
                {projects.map((proj, index) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`relative flex items-center p-4 border-4 ${proj.accentColor} ${proj.color} text-black cursor-pointer shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all`}
                  >
                    {/* Selection Indicator */}
                    {selectedProject.id === proj.id && (
                       <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-yellow-400"></div>
                    )}

                    {/* Decorative Top Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-4 border-b-4 ${proj.accentColor} flex items-center px-2 gap-1`}>
                        <div className="w-2 h-2 bg-black opacity-50"></div>
                        <div className="w-6 h-1 bg-black opacity-50"></div>
                    </div>
                    
                    <span className="text-5xl font-bold">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;