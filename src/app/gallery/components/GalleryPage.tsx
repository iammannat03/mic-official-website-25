// "use client";

// import React, { useState } from "react";
// import { useThemeBackground } from "@/app/gallery/hooks/useThemeBackground";
// import Image from "next/image";
// import NavArrow from "./NavArrow";

// const galleryPages = [
//   ["/cloud1.png", "/cloud2.png", "/cloud3.png", "/cloud4.png"],
//   ["/cloud5.png", "/cloud6.png", "/cloud7.png", "/cloud8.png"],
//   ["/cloud9.png", "/cloud10.png", "/cloud11.png", "/cloud12.png"],
// ];

// const GalleryPage = () => {
//   const { background, gridOpacity, textColor } = useThemeBackground();
//   const [currentPage, setCurrentPage] = useState(0);

//   const handlePageChange = (index: number) => {
//     if (index >= 0 && index < galleryPages.length) {
//       setCurrentPage(index);
//     }
//   };

//   return (
//     <div
//       className={`fixed inset-0 overflow-hidden flex items-center justify-center ${textColor}`}
//       style={{
//         backgroundImage: `
//           linear-gradient(to right, ${gridOpacity} 1px, transparent 1px),
//           linear-gradient(to bottom, ${gridOpacity} 1px, transparent 1px),
//           ${background}
//         `,
//         backgroundSize: "30px 30px, 30px 30px, 100% 100%",
//         backgroundRepeat: "repeat, repeat, no-repeat",
//         backgroundPosition: "top left, top left, center",
//       }}
//     >
//       {/* Logo */}
//       <div className="absolute top-4 left-4 z-50 w-full h-screen">
//         <Image src="/Logo.svg" alt="MIC Logo" width={63} height={63} />
//       </div>

//       {/* Left Page Background */}
//       <div className="absolute" style={{ top: "55px", left: "34px" }}>
//         <Image
//           src="/Subtract.png"
//           alt="galleryPage"
//           width={690}
//           height={684}
//           className="h-[780px]"
//         />
//       </div>

//       {/* Left Strip */}
//       <div className="absolute z-100" style={{ top: "55px", left: "719px" }}>
//         <div className="relative h-[780px] w-[53px]">
//           <Image src="/Rectangle 15273.png" alt="galleryPage" fill />
//         </div>
//       </div>

//       {/* Right Page Background */}
//       <div className="absolute " style={{ top: "55px", right: "64px" }}>
//         <Image
//           src="/SubtractRight.png"
//           alt=""
//           width={690}
//           height={684}
//           className="h-[780px]"
//         />
//       </div>

//       {/* Right Decorations */}
//       <div className="absolute top-[88px] left-[685px] z-50">
//         <Image
//           src="/Group 415.png"
//           alt="galleryPage"
//           width={120}
//           height={400}
//           className="h-[720px]"
//         />
//       </div>

//       {/* Green Arrows */}
//       <div className="absolute right-1 top-[60px] flex flex-col gap-10 overflow-visible z-50">
//         {galleryPages.map((_, index) => (
//           <NavArrow
//             key={index}
//             isActive={currentPage === index}
//             onClick={() => handlePageChange(index)}
//           />
//         ))}
//       </div>

//       {/* Gallery Images */}
//       <div className="absolute top-[100px] left-[80px] z-30 grid grid-cols-2 gap-[40px]">
//         {galleryPages[currentPage].map((src, idx) => (
//           <div
//             key={idx}
//             className="w-[160px] h-[160px] bg-white rounded-md border-[5px] border-black relative"
//           >
//             <Image src={src} alt={`img-${idx}`} fill className="rounded" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GalleryPage;




// "use client";

// import React, { useState } from "react";
// import { useThemeBackground } from "@/app/gallery/hooks/useThemeBackground";
// import Image from "next/image";
// import NavArrow from "./NavArrow";

// const galleryPages = [
//   ["/cloud1.png", "/cloud2.png", "/cloud3.png", "/cloud4.png"],
//   ["/cloud5.png", "/cloud6.png", "/cloud7.png", "/cloud8.png"],
//   ["/cloud9.png", "/cloud10.png", "/cloud11.png", "/cloud12.png"],
// ];

// const GalleryPage = () => {
//   const { background, gridOpacity, textColor } = useThemeBackground();
//   const [currentPage, setCurrentPage] = useState(0);

//   const handlePageChange = (index: number) => {
//     if (index >= 0 && index < galleryPages.length) {
//       setCurrentPage(index);
//     }
//   };

//   return (
//     <div
//       className={`fixed inset-0 overflow-hidden flex items-center justify-center ${textColor}`}
//       style={{
//         backgroundImage: `
//           linear-gradient(to right, ${gridOpacity} 1px, transparent 1px),
//           linear-gradient(to bottom, ${gridOpacity} 1px, transparent 1px),
//           ${background}
//         `,
//         backgroundSize: "30px 30px, 30px 30px, 100% 100%",
//         backgroundRepeat: "repeat, repeat, no-repeat",
//         backgroundPosition: "top left, top left, center",
//       }}
//     >
//       {/* Logo */}
//       <div className="absolute top-4 left-4 z-50 w-full h-screen">
//         <Image src="/Logo.svg" alt="MIC Logo" width={63} height={63} />
//       </div>

//       {/* Left Page Background */}
//       <div className="absolute" style={{ top: "55px", left: "34px" }}>
//         <Image
//           src="/Subtract.png"
//           alt="galleryPage"
//           width={690}
//           height={684}
//           className="h-[780px] pointer-events-none"
//         />
//       </div>

//       {/* Left Strip */}
//       <div className="absolute z-10" style={{ top: "55px", left: "719px" }}>
//         <div className="relative h-[780px] w-[53px] pointer-events-none">
//           <Image
//             src="/Rectangle 15273.png"
//             alt="galleryPage"
//             fill
//             className="pointer-events-none"
//           />
//         </div>
//       </div>

//       {/* Right Page Background */}
//       <div
//         className="absolute z-0 pointer-events-none"
//         style={{ top: "55px", right: "64px" }}
//       >
//         <Image
//           src="/SubtractRight.png"
//           alt=""
//           width={690}
//           height={684}
//           className="h-[780px]"
//         />
//       </div>

//       {/* Right Decorations */}
//       <div className="absolute top-[88px] left-[685px] z-10">
//         <Image
//           src="/Group 415.png"
//           alt="galleryPage"
//           width={120}
//           height={400}
//           className="h-[720px] pointer-events-none"
//         />
//       </div>

//       {/* Green Arrows (clickable even under SubtractRight.png) */}
//       <div className="absolute right-1 top-[60px] flex flex-col gap-10 z-50">
//         {galleryPages.map((_, index) => (
//           <NavArrow
//             key={index}
//             isActive={currentPage === index}
//             onClick={() => handlePageChange(index)}
//           />
//         ))}
//       </div>

//       {/* Gallery Images */}
//       <div className="absolute top-[100px] left-[80px] z-30 grid grid-cols-2 gap-[40px]">
//         {galleryPages[currentPage].map((src, idx) => (
//           <div
//             key={idx}
//             className="w-[160px] h-[160px] bg-white rounded-md border-[5px] border-black relative"
//           >
//             <Image src={src} alt={`img-${idx}`} fill className="rounded" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GalleryPage;




"use client";

import React, { useState } from "react";
import { useThemeBackground } from "@/app/gallery/hooks/useThemeBackground";
import Image from "next/image";
import NavArrow from "./NavArrow";

const galleryPages = [
  ["/cloud1.png", "/cloud2.png", "/cloud3.png", "/cloud4.png"],
  ["/cloud5.png", "/cloud6.png", "/cloud7.png", "/cloud8.png"],
  ["/cloud9.png", "/cloud10.png", "/cloud11.png", "/cloud12.png"],
];

const GalleryPage = () => {
  const { background, gridOpacity, textColor } = useThemeBackground();
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < galleryPages.length) {
      setCurrentPage(index);
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden flex items-center justify-center ${textColor}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridOpacity} 1px, transparent 1px),
          ${background}
        `,
        backgroundSize: "30px 30px, 30px 30px, 100% 100%",
        backgroundRepeat: "repeat, repeat, no-repeat",
        backgroundPosition: "top left, top left, center",
      }}
    >
      {/* Logo */}
      <div className="absolute top-4 left-4 z-50">
        <Image src="/Logo.svg" alt="MIC Logo" width={63} height={63} />
      </div>

      {/* Left Page Background */}
      <div className="absolute" style={{ top: "55px", left: "34px" }}>
        <Image
          src="/Subtract.png"
          alt="galleryPage"
          width={690}
          height={684}
          className="h-[780px] pointer-events-none"
        />
      </div>

      {/* Left Strip */}
      <div className="absolute z-10" style={{ top: "55px", left: "719px" }}>
        <div className="relative h-[780px] w-[53px] pointer-events-none">
          <Image src="/Rectangle 15273.png" alt="galleryPage" fill className="pointer-events-none" />
        </div>
      </div>

      {/* Green Arrows - Placed first so they're behind but still clickable */}
      <div className="absolute right-1 top-[60px] flex flex-col gap-10 z-10">
        {galleryPages.map((_, index) => (
          <NavArrow
            key={index}
            isActive={currentPage === index}
            onClick={() => handlePageChange(index)}
          />
        ))}
      </div>

      {/* Right Page Background - Covers arrows visually but allows clicks through */}
      <div className="absolute z-20 pointer-events-none" style={{ top: "55px", right: "64px" }}>
        <Image
          src="/SubtractRight.png"
          alt=""
          width={690}
          height={684}
          className="h-[780px]"
        />
      </div>

      {/* Right Decorations */}
      <div className="absolute top-[88px] left-[685px] z-30 pointer-events-none">
        <Image
          src="/Group 415.png"
          alt="galleryPage"
          width={120}
          height={400}
          className="h-[720px]"
        />
      </div>

      {/* Gallery Images */}
      <div className="absolute top-[100px] left-[80px] z-30 grid grid-cols-2 gap-[40px]">
        {galleryPages[currentPage].map((src, idx) => (
          <div
            key={idx}
            className="w-[160px] h-[160px] bg-white rounded-md border-[5px] border-black relative"
          >
            <Image src={src} alt={`img-${idx}`} fill className="rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;