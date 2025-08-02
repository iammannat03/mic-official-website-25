"use client"; //client side only 
import React, { useState, useEffect } from "react";
import Image from "next/image";

const clouds = [
  { src: "/images/cloud1.png", alt: "Cloud", width: 310, height: 150, style: { top: 270, left: 0, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: 180, left: 700, zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: 350, left: 400, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: 500, left: 950, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: 600, left: 200, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 260, height: 130, style: { top: 80, left: 500, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 260, height: 130, style: { top: 480, left: 50, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 210, height: 105, style: { top: 250, left: 1000, zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 280, height: 140, style: { top: 420, left: 700, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 240, height: 120, style: { top: 50, left: 120, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 230, height: 115, style: { top: 520, left: 510, zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 250, height: 125, style: { top: 80, left: 900, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 300, height: 150, style: { top: 100, left: 1100, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: 250, left: 1300, zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: 400, left: 1100, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: 550, left: 1400, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: 650, left: 1200, zIndex: 0 } },
];

const pipes = [
  {
    pipeLeft: 200,
    pipeTop: 320,
    pipeHeight: 80,
    upright: true,
  },
  {
    pipeLeft: 500,
    pipeTop: 180,
    pipeHeight: 80,
    upright: false,
  },
  {
    pipeLeft: 760,
    pipeTop: 380,
    pipeHeight: 80,
    upright: true,
  },
  {
    pipeLeft: 1080,
    pipeTop: 300,
    pipeHeight: 80,
    upright: false,
  },
];

const PIPE_BRANCH_HEIGHT = 80;
const PIPE_WIDTH = 120;
const PIPE_HEAD_WIDTH = 160;
const PIPE_HEAD_HEIGHT = 60;

const icons = [
  {
    href: "https://mail.google.com/mail/u/0/#inbox?compose=CllgCKHRLsSBsQdMlSszGrlrxQxSjHMzgMBpLTXMjRKBQHhRTQQtMhZxDcbgbTbXNpPNhzVcTcL",
    src: "/images/mail.png",
    alt: "Email",
    width: 95,
    height: 60,
    left: 213,
    top: 230,
    aria: "Send Email",
  },
  {
    href: "https://www.instagram.com/microsoft.innovations.vitc/?hl=en",
    src: "/images/instagram.png",
    alt: "Instagram",
    width: 80,
    height: 60,
    left: 1100,
    top: 385,
    aria: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in",
    src: "/images/linkedin.png",
    alt: "LinkedIn",
    width: 80,
    height: 60,
    left: 780,
    top: 275,
    aria: "LinkedIn",
  },
];

const bird = {
  src: "/images/bird.png",
  alt: "Flappy Bird",
  width: 100,
  height: 45,
  left: 510,
  top: 265,
};

const STAR_COUNT = 60;
const STAR_POSITIONS = Array.from({ length: STAR_COUNT }).map((_, i) => ({
  top: Math.floor((i * 123) % 700) + Math.floor(i * 17) % 40,
  left: Math.floor((i * 337) % 1500) + Math.floor(i * 31) % 40,
  size: Math.random() * 2 + 1,
}));

export default function SocialPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [fade, setFade] = useState(false);
  const [pageHeight, setPageHeight] = useState<number | null>(null);

  useEffect(() => {
    setPageHeight(window.innerHeight);
    const handleResize = () => setPageHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const background = darkMode
    ? "linear-gradient(to bottom, #0a2540 60%, #1e3c72 100%)"
    : "linear-gradient(to bottom, #eaf1fb 60%, #b5d0f7 100%)";

  const handleToggle = () => {
    setFade(true);
    setDarkMode((d) => !d);
    setTimeout(() => {
      setFade(false);
    }, 400);
  };

  function getBranchCount(isUpright: boolean, pipeTop: number, pipeHeight: number) {
    if (pageHeight === null) return 0;
    return Math.ceil(
      (isUpright
        ? pageHeight - (pipeTop + pipeHeight)
        : pipeTop) / PIPE_BRANCH_HEIGHT
    );
  }

  function getBranchLength(isUpright: boolean, pipeTop: number, pipeHeight: number) {
    if (pageHeight === null) return 0;
    return isUpright
      ? pageHeight - (pipeTop + pipeHeight)
      : pipeTop;
  }

  if (pageHeight === null) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background,
        overflow: "hidden",
        transition: "background 0.4s",
        filter: fade ? "brightness(0.7)" : "none",
        transitionProperty: "background, filter",
        transitionDuration: "0.4s",
      }}
    >
      {/* star dots */}
      {STAR_POSITIONS.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "white",
            opacity: 0.85,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* grid background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* clouds */}
      {clouds.map((cloud, i) => (
        <Image
          key={i}
          src={cloud.src}
          alt={cloud.alt}
          width={cloud.width}
          height={cloud.height}
          style={{
            position: "absolute",
            ...cloud.style,
            pointerEvents: "none",
            zIndex: cloud.style.zIndex ?? 1,
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
            opacity: fade ? 0.7 : 1,
            transition: "opacity 0.4s",
          }}
          priority
        />
      ))}

      {/* logo as a button to home */}
      <a
        href="/main"
        aria-label="Go to home"
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 2,
          display: "inline-block",
        }}
      >
        <Image
          src="/images/mic-logo.png"
          alt="MIC Logo"
          width={50}
          height={50}
          priority
        />
      </a>

      {/* pipes */}
      {pipes.map((pipe, i) => {
        const isUpright = pipe.upright;
        const branchCount = getBranchCount(isUpright, pipe.pipeTop, pipe.pipeHeight);
        const branchLength = getBranchLength(isUpright, pipe.pipeTop, pipe.pipeHeight);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pipe.pipeLeft,
              top: isUpright ? pipe.pipeTop : 0,
              bottom: !isUpright ? `calc(100vh - ${pipe.pipeTop + PIPE_HEAD_HEIGHT}px)` : undefined,
              width: PIPE_WIDTH,
              zIndex: 1,
              display: "flex",
              flexDirection: isUpright ? "column" : "column-reverse",
              alignItems: "center",
              pointerEvents: "none",
              opacity: fade ? 0.7 : 1,
              transition: "opacity 0.4s",
            }}
          >
            {/* pipe head */}
            <div
              style={{
                width: PIPE_HEAD_WIDTH,
                height: PIPE_HEAD_HEIGHT,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: isUpright ? 0 : -5,
                marginTop: isUpright ? -5 : 0,
                transform: isUpright ? "none" : "scaleY(-1)",
                pointerEvents: "auto",
              }}
            >
              <Image
                src="/images/pipehead.png"
                alt="Pipe head"
                width={PIPE_HEAD_WIDTH}
                height={PIPE_HEAD_HEIGHT}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            {/* pipe branches */}
            <div
              style={{
                width: PIPE_WIDTH,
                height: branchLength,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                pointerEvents: "auto",
              }}
            >
              {Array.from({ length: branchCount }).map((_, idx) => (
                <Image
                  key={idx}
                  src="/images/pipebranch.png"
                  alt="Pipe body"
                  width={PIPE_WIDTH}
                  height={PIPE_BRANCH_HEIGHT}
                  style={{
                    width: "100%",
                    height: PIPE_BRANCH_HEIGHT,
                    position: "absolute",
                    top: isUpright ? idx * PIPE_BRANCH_HEIGHT : undefined,
                    bottom: !isUpright ? idx * PIPE_BRANCH_HEIGHT : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* social icons */}
      {icons.map((icon, i) => (
        <a
          key={i}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={icon.aria}
          style={{
            position: "absolute",
            left: icon.left,
            top: icon.top,
            zIndex: 2,
            opacity: fade ? 0.7 : 1,
            transition: "opacity 0.4s",
          }}
        >
          <Image src={icon.src} alt={icon.alt} width={icon.width} height={icon.height} />
        </a>
      ))}

      {/* flappy bird with toggle switch */}
      <div
        style={{
          position: "absolute",
          left: bird.left,
          top: bird.top,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={bird.src}
          alt={bird.alt}
          width={bird.width}
          height={bird.height}
          style={{
            cursor: "pointer",
            filter: fade ? "brightness(0.7)" : "none",
            transition: "filter 0.4s",
          }}
          onClick={handleToggle}
          title="Toggle light/dark mode"
        />
      </div>

      {/* pacman style menu button,can be hooked to an actual nav later */}
      <button
        aria-label="Open menu"
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 10,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        tabIndex={0}
      >
        <Image src="/PacMan.gif" alt="Menu" width={40} height={50} />           
      </button>                         
    </div>
  );
}
