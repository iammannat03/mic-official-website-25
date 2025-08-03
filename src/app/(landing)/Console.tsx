"use client";

import Image from "next/image";
import consoleImg from "./assets/console.png";

export default function Console() {
  return (
    <div className="w-full h-full relative ">
      <Image
        src={consoleImg}
        alt="Console"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
