'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CloudFloatOptions {
  baseTop: string | number;
  baseLeft: string | number;
  amplitude?: number;
  speed?: number;
  phase?: number; 
}

// Sample gallery data - replace with your actual images
const galleryImages = [
  { id: 1, src: '/images/gallery/event1.jpg', alt: 'Tech Event 2024' },
  { id: 2, src: '/images/gallery/workshop1.jpg', alt: 'AI Workshop' },
  { id: 3, src: '/images/gallery/hackathon1.jpg', alt: 'Hackathon Winners' },
  { id: 4, src: '/images/gallery/team1.jpg', alt: 'Team Building' },
  { id: 5, src: '/images/gallery/conference1.jpg', alt: 'Tech Conference'},
  { id: 6, src: '/images/gallery/project1.jpg', alt: 'Project Showcase'},
  { id: 7, src: '/images/gallery/workshop2.jpg', alt: 'Web Dev Workshop' },
  { id: 8, src: '/images/gallery/event2.jpg', alt: 'Annual Meet' },
  { id: 9, src: '/images/gallery/hackathon2.jpg', alt: 'Code Sprint' },
  { id: 10, src: '/images/gallery/team2.jpg', alt: 'Department Heads' },
  { id: 11, src: '/images/gallery/project2.jpg', alt: 'Innovation Fair' },
  { id: 12, src: '/images/gallery/workshop3.jpg', alt: 'ML Workshop'},
];

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

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 8;

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

  const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        notebookBg: "#FCF3E3",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        notebookBg: "#FCF3E3",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };

  const themeColors = getThemeColors();

  // Calculate pagination
  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = galleryImages.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden"
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

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        {/* Notebook/Gallery Container */}
        <div 
          className="relative w-full max-w-6xl h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col"
          style={{
            backgroundColor: themeColors.notebookBg,
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4b996' fill-opacity='0.1'%3E%3Cpath d='M0 0h30v30H0V0zm15 15h15v15H15V15z'/%3E%3C/g%3E%3C/svg%3E")
            `,
            border: "8px solid #8b4513",
            borderRadius: "15px",
          }}
        >
          {/* Spiral Binding */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-700 to-amber-600 flex flex-col items-center justify-start pt-8 space-y-6 z-10">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-amber-800 rounded-full shadow-inner border-2 border-amber-900"></div>
            ))}
          </div>

          {/* Page Content */}
          <div className="ml-12 p-6 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center mb-6">
              <h1 className="font-press-start text-2xl md:text-4xl text-amber-900">
                GALLERY
              </h1>
              <div className="ml-6 flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Photo Gallery Grid - Fixed height container */}
            <div className="flex-1 flex items-center justify-center mb-6 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {currentImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => setSelectedImage(image.id)}
                  >
                    {/* Polaroid Frame */}
                    <div 
                      className="bg-white p-2 pb-8 shadow-lg transition-transform duration-300"
                      style={{
                        transform: `rotate(${(index % 4 - 1.5) * 2}deg)`,
                        width: '200px', // Increased size
                        height: '250px' // Increased size
                      }}
                    >
                      <div className="w-full h-48 bg-gray-200 overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={200} // Increased size
                          height={160} // Increased size
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                          }}
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <p className="font-press-start text-gray-700 text-sm leading-tight">{image.alt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center space-x-4 mt-auto">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-press-start text-xs transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600 text-white hover:bg-amber-700 transform hover:scale-105'
                }`}
              >
                ← PREV
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-press-start text-xs transition-all duration-300 transform hover:scale-105 ${
                        currentPage === page
                          ? 'bg-amber-600 text-white shadow-lg'
                          : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-press-start text-xs transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600 text-white hover:bg-amber-700 transform hover:scale-105'
                }`}
              >
                NEXT →
              </button>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-400 rounded-full shadow-lg"></div>
          <div className="absolute bottom-4 left-16 w-6 h-6 bg-green-400 rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full bg-white p-4 rounded-lg">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-600 z-10"
            >
              ×
            </button>
            {(() => {
              const image = galleryImages.find(img => img.id === selectedImage);
              return image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded" // Adjusted max height for modal
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                  }}
                />
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;