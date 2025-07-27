


// "use client";

// import React, { useState } from "react";
// import { useThemeBackground } from "@/app/gallery/hooks/useThemeBackground";
// import Image from "next/image";
// import NavArrow from "./NavArrow";

// const galleryPages = [
//   ["/blueghost.png", "/ghost.png", "/greenghost.png"],
//   ["/ghost.png", "/blueghost.png", "/greenghost.png"],
//   ["/greenghost.png", "/ghost.png", "/blueghost.png"],
// ];

// const GalleryPage = () => {
//   const { background, gridOpacity, textColor } = useThemeBackground();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedImage, setSelectedImage] = useState(galleryPages[0][0]);

//   const handlePageChange = (index: number) => {
//     if (index >= 0 && index < galleryPages.length) {
//       setCurrentPage(index);
//       setSelectedImage(galleryPages[index][0]); // Reset to first image of the new page
//     }
//   };

//   const handleImageClick = (src: string) => {
//     setSelectedImage(src);
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
//       <div className="absolute top-4 left-4 z-50">
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

//       {/* Green Arrows */}
//       <div className="absolute right-1 top-[60px] flex flex-col gap-10 z-10">
//         {galleryPages.map((_, index) => (
//           <NavArrow
//             key={index}
//             isActive={currentPage === index}
//             onClick={() => handlePageChange(index)}
//           />
//         ))}
//       </div>

//       {/* Right Page Background */}
//       <div
//         className="absolute z-20 pointer-events-none"
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
//       <div className="absolute top-[88px] left-[685px] z-30 pointer-events-none">
//         <Image
//           src="/Group 415.png"
//           alt="galleryPage"
//           width={120}
//           height={400}
//           className="h-[720px]"
//         />
//       </div>

//       {/* Main Image Display Window */}
//       <div className="absolute top-[100px] left-[80px] z-30 grid grid-cols-2 gap-[40px]">
//         <div>
//           <Image
//             src="/plane.svg"
//             alt="plane"
//             width={104}
//             height={61}
//             className="absolute z-50 top-[-20px]"
//           />
//           <Image
//             src="/galleryWindow.svg"
//             alt="gallery frame"
//             width={522}
//             height={474}
//             className="relative top-[-2px] left-[20px] w-[550px]"
//           />
//           <Image
//             src={selectedImage}
//             alt="selected"
//             width={510}
//             height={500}
//             className="absolute top-[13px] left-[40px]"
//             style={{ height: "375px" }}
//           />
//           <Image
//             src="/mushroom.svg"
//             alt="mushroom"
//             width={46}
//             height={33}
//             className="absolute top-[360px] left-[540px] w-[46px]"
//           />
//         </div>

//         {/* Polaroid Gallery */}
//         <div className="relative w-[600px] h-[300px] mx-auto mt-[450px] ml-[-600px]">
//           {/* Left Polaroid */}
//           <div className="absolute left-10 top-0 z-10 w-[200px] h-[250px] cursor-pointer">
//             <Image
//               src="/polaroidFrame.svg"
//               alt="frame"
//               width={200}
//               height={250}
//             />
//             <div
//               className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
//               onClick={() => handleImageClick(galleryPages[currentPage][0])}
//             >
//               <Image
//                 src={galleryPages[currentPage][0]}
//                 alt="Thumbnail 1"
//                 width={160}
//                 height={160}
//               />
//             </div>
//             <Image
//               src="/track.svg"
//               alt="track"
//               width={100}
//               height={150}
//               className="absolute top-[210px] left-[-30px]"
//             />
//           </div>

//           {/* Center Polaroid */}
//           <div className="absolute left-1/2 top-[-40px] -translate-x-1/2 z-20 w-[200px] h-[250px] cursor-pointer">
//             <Image
//               src="/polaroidFrame.svg"
//               alt="frame"
//               width={200}
//               height={250}
//             />
//             <div
//               className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
//               onClick={() => handleImageClick(galleryPages[currentPage][1])}
//             >
//               <Image
//                 src={galleryPages[currentPage][1]}
//                 alt="Thumbnail 2"
//                 width={160}
//                 height={160}
//               />
//             </div>
//           </div>

//           {/* Right Polaroid */}
//           <div className="absolute right-10 top-0 z-10 w-[200px] h-[250px] cursor-pointer">
//             <Image
//               src="/polaroidFrame.svg"
//               alt="frame"
//               width={200}
//               height={250}
//             />
//             <div
//               className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
//               onClick={() => handleImageClick(galleryPages[currentPage][2])}
//             >
//               <Image
//                 src={galleryPages[currentPage][2]}
//                 alt="Thumbnail 3"
//                 width={160}
//                 height={160}
//               />
//             </div>
//           </div>
//         </div>
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
  ["/blueghost.png", "/ghost.png", "/greenghost.png"],
  ["/ghost.png", "/blueghost.png", "/greenghost.png"],
  ["/greenghost.png", "/ghost.png", "/blueghost.png"],
];

const GalleryPage = () => {
  const { background, gridOpacity, textColor } = useThemeBackground();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(galleryPages[0][0]);

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < galleryPages.length) {
      setCurrentPage(index);
      setSelectedImage(galleryPages[index][0]);
    }
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
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
          <Image
            src="/Rectangle 15273.png"
            alt="galleryPage"
            fill
            className="pointer-events-none"
          />
        </div>
      </div>

      {/* Green Arrows */}
      <div className="absolute right-1 top-[60px] flex flex-col gap-10 z-10">
        {galleryPages.map((_, index) => (
          <NavArrow
            key={index}
            isActive={currentPage === index}
            onClick={() => handlePageChange(index)}
          />
        ))}
      </div>

      {/* Right Page Background */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "55px", right: "64px" }}
      >
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

      {/* Main Display Window */}
      <div className="absolute top-[100px] left-[80px] z-30 grid grid-cols-2 gap-[40px]">
        <div>
          <Image
            src="/plane.svg"
            alt="plane"
            width={104}
            height={61}
            className="absolute z-50 top-[-20px]"
          />
          <Image
            src="/galleryWindow.svg"
            alt="gallery frame"
            width={522}
            height={474}
            className="relative top-[-2px] left-[20px] w-[550px]"
          />
          <Image
            src={selectedImage}
            alt="selected"
            width={510}
            height={500}
            className="absolute top-[13px] left-[40px]"
            style={{ height: "375px" }}
          />
          <Image
            src="/mushroom.svg"
            alt="mushroom"
            width={46}
            height={33}
            className="absolute top-[360px] left-[540px] w-[46px]"
          />
        </div>
      </div>

      {/* All Polaroid Galleries */}
      <div className="absolute top-[450px] left-0 right-0 flex flex-col gap-[80px] items-end px-[80px] z-30">
        {/* Top Right Polaroid Gallery */}
        <div className="relative w-[600px] h-[300px] mt-[-320px]">
          {galleryPages[currentPage].map((img, idx) => (
            <div
              key={`right-${idx}`}
              className={`absolute w-[200px] h-[250px] cursor-pointer ${
                idx === 0
                  ? "left-10 top-0 z-10"
                  : idx === 1
                  ? "left-1/2 top-[-40px] -translate-x-1/2 z-20"
                  : "right-10 top-0 z-10"
              }`}
            >
              <Image src="/polaroidFrame.svg" alt="frame" width={200} height={250} />
              <div
                className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
                onClick={() => handleImageClick(img)}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} width={160} height={160} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Right Polaroid Gallery */}
        <div className="relative w-[600px] h-[300px]">
          {galleryPages[currentPage].map((img, idx) => (
            <div
              key={`bottom-${idx}`}
              className={`absolute w-[200px] h-[250px] cursor-pointer ${
                idx === 0
                  ? "left-10 top-0 z-10"
                  : idx === 1
                  ? "left-1/2 top-[-40px] -translate-x-1/2 z-20"
                  : "right-10 top-0 z-10"
              }`}
            >
              <Image src="/polaroidFrame.svg" alt="frame" width={200} height={250} />
              <div
                className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
                onClick={() => handleImageClick(img)}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} width={160} height={160} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Polaroid Gallery */}
      <div className="absolute top-[450px] left-0 ml-[75px] z-30">
        <div className="relative w-[600px] h-[300px] mt-[100px]">
          {galleryPages[currentPage].map((img, idx) => (
            <div
              key={`left-${idx}`}
              className={`absolute w-[200px] h-[250px] cursor-pointer ${
                idx === 0
                  ? "left-10 top-0 z-10"
                  : idx === 1
                  ? "left-1/2 top-[-40px] -translate-x-1/2 z-20"
                  : "right-10 top-0 z-10"
              }`}
            >
              <Image src="/polaroidFrame.svg" alt="frame" width={200} height={250} />
              <div
                className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
                onClick={() => handleImageClick(img)}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} width={160} height={160} />
              </div>
              {idx === 0 && (
                <Image
                  src="/track.svg"
                  alt="track"
                  width={100}
                  height={150}
                  className="absolute top-[210px] left-[-30px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
