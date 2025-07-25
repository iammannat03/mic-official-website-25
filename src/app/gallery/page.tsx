"use client";

import React from "react";
import { useThemeBackground } from "@/app/gallery/hooks/useThemeBackground";
import Image from "next/image";
import next from "next";

const GalleryPage = () => {
  const { background, gridOpacity, textColor } = useThemeBackground();

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${textColor}`}
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
      <div className="absolute top-4 left-4 z-50">
        <Image
          src="/Logo.svg"
          alt="MIC Logo"
          width={63}
          height={63}
          className="z-50"
        />
      </div>

      <div className="absolute" style={{ top: "55px", left: "34px" }}>
        <Image
          src="/Subtract.png"
          alt="galleryPage"
          width={684}
          height={684}
          className="h-[780px]"
        />
      </div>

      <h1 className="text-4xl font-bold"></h1>
    </div>
  );
};

export default GalleryPage;
