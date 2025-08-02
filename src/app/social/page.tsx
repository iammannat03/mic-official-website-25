import Image from "next/image";

const clouds = [
  // Clouds repositioned to the leftmost side and all zIndex set to 0 (behind)
  { src: "/images/cloud1.png", alt: "Cloud", width: 310, height: 150, style: { top: 270, left: 0, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: 180, left: 700, zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: 350, left: 400, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: 500, left: 950, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: 600, left: 200, zIndex: 0 } },
  // Additional clouds for more coverage and spacing, all behind
  { src: "/images/cloud1.png", alt: "Cloud", width: 260, height: 130, style: { top: 80, left: 500, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 260, height: 130, style: { top: 480, left: 50, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 210, height: 105, style: { top: 250, left: 1000, zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 280, height: 140, style: { top: 420, left: 700, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 240, height: 120, style: { top: 50, left: 120, zIndex: 0 } }, // moved to left
  { src: "/images/cloud2.png", alt: "Cloud", width: 230, height: 115, style: { top: 520, left: 510, zIndex: 0 } }, // moved to left
  { src: "/images/cloud3.png", alt: "Cloud", width: 250, height: 125, style: { top: 80, left: 900, zIndex: 0 } },

  // --- Clouds to the right side, all behind ---
  { src: "/images/cloud1.png", alt: "Cloud", width: 300, height: 150, style: { top: 100, left: 1100, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: 250, left: 1300, zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: 400, left: 1100, zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: 550, left: 1400, zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: 650, left: 1200, zIndex: 0 } },
];

// Pipes: position and size are now independent from icons
const pipes = [
  {
    pipeLeft: 200,
    pipeTop: 320,      // moved down
    pipeHeight: 80,    // shortened
    upright: true,
  },
  {
    pipeLeft: 500,
    pipeTop: 180,      // moved down
    pipeHeight: 80,    // shortened
    upright: false,
  },
  {
    pipeLeft: 760,
    pipeTop: 380,      // moved down
    pipeHeight: 80,    // shortened
    upright: true,
  },
  {
    pipeLeft: 1080,
    pipeTop: 320,      // moved down
    pipeHeight: 80,    // shortened
    upright: false,
  },
];

const PIPE_BRANCH_HEIGHT = 80;
const PIPE_WIDTH = 120;
const PIPE_HEAD_WIDTH = 160;
const PIPE_HEAD_HEIGHT = 60;

// Icons: position is now fully independent
const icons = [
  {
    href: "https://mail.google.com/mail/u/0/#inbox?compose=CllgCKHRLsSBsQdMlSszGrlrxQxSjHMzgMBpLTXMjRKBQHhRTQQtMhZxDcbgbTbXNpPNhzVcTcL",
    src: "/images/mail.png",
    alt: "Email",
    width: 95,
    height: 60,
    left: 213,
    top: 220,
    aria: "Send Email",
  },
  {
    href: "https://www.instagram.com/microsoft.innovations.vitc/?hl=en",
    src: "/images/instagram.png",
    alt: "Instagram",
    width: 80,
    height: 60,
    left: 1100,
    top: 410,
    aria: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in",
    src: "/images/linkedin.png",
    alt: "LinkedIn",
    width: 80,
    height: 60,
    left: 780,
    top: 270,
    aria: "LinkedIn",
  },
];

// Bird icon, also independently positioned
const bird = {
  src: "/images/bird.png",
  alt: "Flappy Bird",
  width: 100,
  height: 45,
  left: 510,
  top: 275,
};

function getBranchCount(isUpright: boolean, pipeTop: number, pipeHeight: number) {
  // Use 100vh as a fallback for SSR
  const pageHeight =
    typeof window !== "undefined"
      ? window.innerHeight
      : 1000;
  return Math.ceil(
    (isUpright
      ? pageHeight - (pipeTop + pipeHeight)
      : pipeTop) / PIPE_BRANCH_HEIGHT
  );
}

function getBranchLength(isUpright: boolean, pipeTop: number, pipeHeight: number) {
  const pageHeight =
    typeof window !== "undefined"
      ? window.innerHeight
      : 1000;
  // Upright: branch from bottom of pipe to bottom of page
  // Overturned: branch from top of page to top of pipe
  return isUpright
    ? pageHeight - (pipeTop + pipeHeight)
    : pipeTop;
}

export default function SocialPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #0a2540 60%, #1e3c72 100%)",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
        }}
      />

      {/* Clouds */}
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
          }}
          priority
        />
      ))}

      {/* Logo as a button to home */}
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

      {/* Pipes */}
      {pipes.map((pipe, i) => {
        const isUpright = pipe.upright;
        // For upright: branch starts at pipeTop + pipeHeight (bottom of pipe)
        // For overturned: branch from top to pipeTop (top of pipe)
        const branchCount = getBranchCount(isUpright, pipe.pipeTop, pipe.pipeHeight);
        const branchLength = getBranchLength(isUpright, pipe.pipeTop, pipe.pipeHeight);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pipe.pipeLeft,
              top: isUpright ? pipe.pipeTop : 0,
              // For overturned, position the pipe at the bottom of the pipe (so head is at pipeTop)
              // and flip the column so the head is at the bottom and branches go up
              bottom: !isUpright ? `calc(100vh - ${pipe.pipeTop + PIPE_HEAD_HEIGHT}px)` : undefined,
              width: PIPE_WIDTH,
              zIndex: 1,
              display: "flex",
              flexDirection: isUpright ? "column" : "column-reverse",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {/* Pipe head */}
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
            {/* Pipe branches */}
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

      {/* Social Icons - now fully independent */}
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
          }}
        >
          <Image src={icon.src} alt={icon.alt} width={icon.width} height={icon.height} />
        </a>
      ))}

      {/* Flappy Bird - also independent */}
      <Image
        src={bird.src}
        alt={bird.alt}
        width={bird.width}
        height={bird.height}
        style={{
          position: "absolute",
          left: bird.left,
          top: bird.top,
          zIndex: 2,
        }}
      />

      {/* Menu Button */}
      <button
        aria-label="Open menu"
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          zIndex: 2,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        tabIndex={0}
      >
        <Image src="/PacMan.gif" alt="Menu" width={40} height={40} />
      </button>
    </div>
  );
}
