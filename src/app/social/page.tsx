import Image from "next/image";

const clouds = [
  { src: "/images/cloud1.png", alt: "Cloud", width: 100, height: 50, style: { top: 60, left: 200 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 80, height: 40, style: { top: 120, left: 600 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 110, height: 55, style: { top: 300, left: 400 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 90, height: 45, style: { top: 400, left: 800 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 80, height: 40, style: { top: 200, left: 1000 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 60, height: 30, style: { top: 500, left: 100 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 60, height: 30, style: { top: 600, left: 900 } },
];

// Social icons and their pipe positions
const socialIcons = [
  {
    href: "mailto:your@email.com",
    src: "/images/mail.png",
    alt: "Email",
    width: 60,
    height: 45,
    aria: "Send Email",
    pipeLeft: 160,
    pipeHeight: 320,
    iconTop: 180,
    iconLeft: 100,
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
    pipeHeight: 250,
    iconTop: 120,
    iconLeft: 470,
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
    iconTop: 80,
    iconLeft: 720,
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
    pipeHeight: 300,
    iconTop: 200,
    iconLeft: 1000,
    upright: false,
  },
];

// Set the actual height of your pipebranch image here:
const PIPE_BRANCH_HEIGHT = 80; // px, adjust to your actual image height
const PIPE_WIDTH = 120; // px, adjust to your actual image width
const PIPE_HEAD_WIDTH = 160; // px, should be wider than branch for protrusion
const PIPE_HEAD_HEIGHT = 40; // px

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
          style={{ position: "absolute", ...cloud.style }}
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
            {/* Pipe head (protruding) */}
            <Image
              src="/images/pipehead.png"
              alt="Pipe head"
              width={PIPE_HEAD_WIDTH}
              height={PIPE_HEAD_HEIGHT}
              style={{
                width: PIPE_HEAD_WIDTH,
                height: PIPE_HEAD_HEIGHT,
                marginLeft: -(PIPE_HEAD_WIDTH - PIPE_WIDTH) / 2,
                marginRight: -(PIPE_HEAD_WIDTH - PIPE_WIDTH) / 2,
                zIndex: 2,
              }}
            />
          </div>
        );
      })}

      {/* Social Icons */}
      {socialIcons.map((icon, i) => (
        <a
          key={i}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={icon.aria}
          style={{
            position: "absolute",
            top: icon.iconTop,
            left: icon.iconLeft,
            zIndex: 2,
          }}
        >
          <Image src={icon.src} alt={icon.alt} width={icon.width} height={icon.height} />
        </a>
      ))}

      {/* Flappy Bird */}
      <Image
        src="/images/bird.png"
        alt="Flappy Bird"
        width={60}
        height={45}
        style={{ position: "absolute", top: 250, left: 220, zIndex: 2 }}
      />

      {/* Menu Icon */}
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
