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

const pipes = [
  { left: 160 },
  { left: 420 },
  { left: 650 },
  { left: 900 },
];

const socialIcons = [
  {
    href: "https://mail.google.com/mail/u/0/#inbox?compose=CllgCKHRLsSBsQdMlSszGrlrxQxSjHMzgMBpLTXMjRKBQHhRTQQtMhZxDcbgbTbXNpPNhzVcTcL ",
    src: "/images/mail.png",
    alt: "Email",
    width: 60,
    height: 45,
    style: { top: 180, left: 100, zIndex: 2 },
    aria: "Send Email",
  },
  {
    href: "https://www.instagram.com/microsoft.innovations.vitc/?hl=en",
    src: "/images/instagram.png",
    alt: "Instagram",
    width: 60,
    height: 60,
    style: { top: 120, left: 470, zIndex: 2 },
    aria: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in ",
    src: "/images/linkedin.png",
    alt: "LinkedIn",
    width: 60,
    height: 60,
    style: { top: 80, left: 720, zIndex: 2 },
    aria: "LinkedIn",
  },
];

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

      {/* Pipes */}
      {pipes.map((pipe, i) => (
        <Image
          key={i}
          src="/images/pipe.png"
          alt="Pipe"
          width={120}
          height={400}
          style={{ position: "absolute", top: 0, left: pipe.left }}
        />
      ))}

      {/* Social Icons */}
      {socialIcons.map((icon, i) => (
        <a
          key={i}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={icon.aria}
          style={{ position: "absolute", ...icon.style }}
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
