import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';



const YearButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const years = [2021, 2022, 2023, 2024, 2025];

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  // Optional: click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* IMAGE BUTTON */}
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src="/images/tenure.png"
          alt="Year Button"
          width={296}
          height={74}
          className="rounded-full"
        />
      </div>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute mt-2 w-32 rounded bg-white shadow border border-gray-300 z-20 text-black">
          {years.map((year) => (
            <div
              key={year}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => handleYearClick(year)}
            >
              {year}
            </div>
          ))}
        </div>
      )}

      {/* OPTIONAL: Selected Year Overlay */}
      {selectedYear && (
        <div className="text-sm mt-1 text-center">
          Selected: {selectedYear}
        </div>
      )}
    </div>
  );
};

export default YearButton;
