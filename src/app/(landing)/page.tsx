"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cartridge from "./Cartridge";
import Console from "./Console";

export default function Landing() {
  const [inserted, setInserted] = useState(false);
  const [poweredOn, setPoweredOn] = useState(false);
  const [showSplash, setShowSplash] = useState(false); // NEW

  const router = useRouter();

  const handleInsert = () => {
    setInserted(true);
  };

  const handlePower = () => {
    if (inserted && !poweredOn) {
      setPoweredOn(true);

      // After 1 second of booting up, show splash
      setTimeout(() => {
        setShowSplash(true);
      }, 1000);

      // After another 2 seconds, go to /main
      setTimeout(() => {
        router.push("/Loading");
      }, 3000);
    }
  };

  const handleReset = () => {
    if (inserted) {
      setInserted(false);
      setPoweredOn(false);
      setShowSplash(false); // reset splash too
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-black opacity-50 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Centered container with fixed aspect ratio */}
      <div className="relative w-full max-w-[400px] aspect-[3/2] z-10">
        <Console
          onPower={handlePower}
          onReset={handleReset}
          showButtons={inserted}
        />
        <Cartridge inserted={inserted} onClick={handleInsert} />

        {/* Power and Reset buttons */}
        {inserted && (
          <>
            <div
              onClick={handlePower}
              className="absolute top-[27%] left-[66%] w-[10%] h-[10%] cursor-pointer z-50"
              title="Power"
            />
            <div
              onClick={handleReset}
              className="absolute top-[37%] left-[66%] w-[10%] h-[10%] cursor-pointer z-50"
              title="Reset"
            />
          </>
        )}
      </div>

      {/* Instruction text */}
      {!inserted && (
        <p className="text-white text-sm absolute top-10 left-1/2 -translate-x-1/2 animate-pulse z-50">
          Click to insert cartridge
        </p>
      )}

      {/* Status messages */}
      {inserted && !poweredOn && (
        <p className="text-green-400 text-sm absolute bottom-24 left-1/2 -translate-x-1/2 animate-pulse z-50">
          Press Power to start
        </p>
      )}
      {poweredOn && !showSplash && (
        <p className="text-yellow-400 text-sm absolute bottom-24 left-1/2 -translate-x-1/2 z-50">
          Booting up...
        </p>
      )}

      {/* Splash screen overlay */}
      {showSplash && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
          <img
            src="/images/mic-logo.png"
            alt="MIC Logo"
            className="w-24 h-24 animate-spin-slow mb-4"
          />
          <p className="text-white text-sm animate-pulse">Welcome to MIC</p>
        </div>
      )}
    </div>
  );
}
