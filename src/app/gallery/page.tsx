"use client";

import React from "react";
import { useThemeBackground } from "@/app/gallery/hooks/useThemeBackground";
import Image from "next/image";
import next from "next";

const GalleryPage = () => {
  const { background, gridOpacity, textColor } = useThemeBackground();

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
      <div className="absolute top-4 left-4 z-50 w-full h-screen">
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
          width={710}
          height={684}
          className="h-[780px]"
        />
      </div>

      <div className="absolute z-100" style={{ top: "55px", left: "730px" }}>
        <div className="relative h-[780px] w-[53px] z-100">
          <Image
            src="/Rectangle 15273.png"
            alt="galleryPage"
            fill
            className="absolute"
          />
        </div>
      </div>

      <div className="absolute" style={{ top: "55px", right: "34px" }}>
        <Image
          src="/SubtractRight.png"
          alt=""
          width={710}
          height={684}
          className="h-[780px]"
        />
      </div>

      <div className="absolute top-[88px] left-[695px] z-50">
        <Image
          src="/Group 415.png"
          alt="galleryPage"
          width={120}
          height={400}
          className="h-[720px]"
        />
      </div>

      <h1 className="text-4xl font-bold"></h1>
    </div>
  );
};

export default GalleryPage;
