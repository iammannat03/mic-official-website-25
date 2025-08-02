import Image from "next/image";

const clouds = [
  // Fewer, larger, and more spaced-out clouds
  { src: "/images/cloud1.png", alt: "Cloud", width: 300, height: 150, style: { top: 60, left: 120, zIndex: 0 } },    // behind
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: 180, left: 700, zIndex: 2 } },   // front
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: 350, left: 400, zIndex: 0 } },   // behind
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: 500, left: 950, zIndex: 2 } },   // front
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: 600, left: 200, zIndex: 0 } },   // behind
  // Additional clouds for more coverage and spacing
  { src: "/images/cloud1.png", alt: "Cloud", width: 260, height: 130, style: { top: 80, left: 500, zIndex: 0 } },    // behind
  { src: "/images/cloud2.png", alt: "Cloud", width: 210, height: 105, style: { top: 250, left: 1000, zIndex: 2 } },  // front
  { src: "/images/cloud3.png", alt: "Cloud", width: 280, height: 140, style: { top: 420, left: 700, zIndex: 0 } },   // behind
  { src: "/images/cloud1.png", alt: "Cloud", width: 240, height: 120, style: { top: 150, left: 300, zIndex: 2 } },   // front
  { src: "/images/cloud2.png", alt: "Cloud", width: 230, height: 115, style: { top: 520, left: 400, zIndex: 0 } },   // behind
  { src: "/images/cloud3.png", alt: "Cloud", width: 250, height: 125, style: { top: 80, left: 900, zIndex: 2 } },    // front

  // --- Added clouds to the right side ---
  { src: "/images/cloud1.png", alt: "Cloud", width: 300, height: 150, style: { top: 100, left: 1100, zIndex: 0 } },   // behind
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: 250, left: 1300, zIndex: 2 } },   // front
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: 400, left: 1100, zIndex: 0 } },   // behind
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: 550, left: 1400, zIndex: 2 } },   // front
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: 650, left: 1200, zIndex: 0 } },   // behind
];

const socialIcons = [
  {
    href: "https://mail.google.com/mail/u/0/#inbox?compose=CllgCKHRLsSBsQdMlSszGrlrxQxSjHMzgMBpLTXMjRKBQHhRTQQtMhZxDcbgbTbXNpPNhzVcTcL",
    src: "/images/mail.png",
    alt: "Email",
    width: 60,
    height: 45,
    aria: "Send Email",
    pipeLeft: 160,
    pipeHeight: 320,
    upright: true,
  },
  {
    href: "https://www.instagram.com/microsoft.innovations.vitc/?hl=en",
    src: "/images/instagram.png",
    alt: "Instagram",
    width: 60,
    height: 60,
    aria: "Instagram",
    pipeLeft: 470,
    pipeHeight: 220,
    upright: false,
  },
  {
    href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in",
    src: "/images/linkedin.png",
    alt: "LinkedIn",
    width: 60,
    height: 60,
    aria: "LinkedIn",
    pipeLeft: 720,
    pipeHeight: 180,
    upright: true,
  },
  {
    href: "#",
    src: "/images/menu.png",
    alt: "Menu",
    width: 60,
    height: 60,
    aria: "Menu",
    pipeLeft: 1000,
    pipeHeight: 270,
    upright: false,
  },
];

const PIPE_BRANCH_HEIGHT = 80;
const PIPE_WIDTH = 120;
const PIPE_HEAD_WIDTH = 160;
const PIPE_HEAD_HEIGHT = 60;

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

      {/* Logo */}
      <Image
        src="/images/logo.png"
        alt="MIC Logo"
        width={70}
        height={70}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 2 }}
        priority
      />

      {/* Pipes below icons */}
      {socialIcons.map((icon, i) => {
        const branchCount = Math.ceil(icon.pipeHeight / PIPE_BRANCH_HEIGHT);
        const isUpright = icon.upright;
        // Overturn pipehead for 1st and 3rd pipe (i === 0 or i === 2)
        const overturnPipeHead = i === 0 || i === 2;
        // Calculate iconTop so icon is centered on the pipe head
        const iconTop = isUpright
          ? icon.pipeHeight + PIPE_HEAD_HEIGHT / 2 - icon.height / 2
          : undefined;
        const iconBottom = !isUpright
          ? icon.pipeHeight + PIPE_HEAD_HEIGHT / 2 - icon.height / 2
          : undefined;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: icon.pipeLeft,
              top: isUpright ? 0 : undefined,
              bottom: !isUpright ? 0 : undefined,
              width: PIPE_WIDTH,
              height: icon.pipeHeight + PIPE_HEAD_HEIGHT,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 1,
              transform: isUpright ? "none" : "scaleY(-1)",
            }}
          >
            {/* Pipe branches */}
            {Array.from({ length: branchCount }).map((_, idx) => (
              <Image
                key={idx}
                src="/images/pipebranch.png"
                alt="Pipe body"
                width={PIPE_WIDTH}
                height={PIPE_BRANCH_HEIGHT}
                style={{ width: "100%", height: PIPE_BRANCH_HEIGHT }}
              />
            ))}
            {/* Pipe head */}
            <div
              style={{
                width: PIPE_HEAD_WIDTH,
                height: PIPE_HEAD_HEIGHT,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // Overturn the pipehead if needed
                transform: `${isUpright ? "none" : "scaleY(-1)"} ${overturnPipeHead ? "rotate(180deg)" : ""}`,
                marginTop: -5,
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
            {/* Social Icon aligned with pipe head */}
            <a
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.aria}
              style={{
                position: "absolute",
                left: (PIPE_HEAD_WIDTH - icon.width) / 2,
                top: isUpright
                  ? icon.pipeHeight + PIPE_HEAD_HEIGHT / 2 - icon.height / 2
                  : undefined,
                bottom: !isUpright
                  ? icon.pipeHeight + PIPE_HEAD_HEIGHT / 2 - icon.height / 2
                  : undefined,
                zIndex: 2,
                transform: !isUpright ? "scaleY(-1)" : "none",
              }}
            >
              <Image src={icon.src} alt={icon.alt} width={icon.width} height={icon.height} />
            </a>
          </div>
        );
      })}

      {/* Flappy Bird */}
      <Image
        src="/images/bird.png"
        alt="Flappy Bird"
        width={60}
        height={45}
        style={{ position: "absolute", top: 250, left: 220, zIndex: 2 }}
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
        <Image src="/images/menu.png" alt="Menu" width={40} height={40} />
      </button>
    </div>
  );
}
