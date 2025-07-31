import Image from "next/image";

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
      <Image src="/images/cloud1.png" alt="cloud" width={70} height={40} style={{ position: "absolute", top: 60, left: 200 }} />
      <Image src="/images/cloud2.png" alt="cloud" width={50} height={30} style={{ position: "absolute", top: 120, left: 600 }} />
      <Image src="/images/cloud3.png" alt="cloud" width={60} height={35} style={{ position: "absolute", top: 300, left: 400 }} />
      <Image src="/images/cloud1.png" alt="cloud" width={40} height={25} style={{ position: "absolute", top: 400, left: 800 }} />
      <Image src="/images/cloud2.png" alt="cloud" width={50} height={30} style={{ position: "absolute", top: 200, left: 1000 }} />

      {/* Logo */}
      <Image src="/images/logo.png" alt="logo" width={70} height={70} style={{ position: "absolute", top: 20, left: 20, zIndex: 2 }} />

      {/* Pipes */}
      <Image src="/images/pipe.png" alt="pipe" width={120} height={400} style={{ position: "absolute", top: 0, left: 160 }} />
      <Image src="/images/pipe.png" alt="pipe" width={120} height={400} style={{ position: "absolute", top: 0, left: 420 }} />
      <Image src="/images/pipe.png" alt="pipe" width={120} height={400} style={{ position: "absolute", top: 0, left: 650 }} />
      <Image src="/images/pipe.png" alt="pipe" width={120} height={400} style={{ position: "absolute", top: 0, left: 900 }} />

      {/* Social Icons */}
      <a href="mailto:your@email.com" target="_blank" rel="noopener noreferrer">
        <Image src="/images/mail.png" alt="mail" width={60} height={45} style={{ position: "absolute", top: 180, left: 100, zIndex: 2 }} />
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
        <Image src="/images/instagram.png" alt="instagram" width={60} height={60} style={{ position: "absolute", top: 120, left: 470, zIndex: 2 }} />
      </a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
        <Image src="/images/linkedin.png" alt="linkedin" width={60} height={60} style={{ position: "absolute", top: 80, left: 720, zIndex: 2 }} />
      </a>

      {/* Flappy Bird */}
      <Image src="/images/bird.png" alt="bird" width={60} height={45} style={{ position: "absolute", top: 250, left: 220, zIndex: 2 }} />

      {/* Menu Icon */}
      <Image src="/images/menu.png" alt="menu" width={40} height={40} style={{ position: "absolute", bottom: 30, right: 30, zIndex: 2 }} />
    </div>
  );
}