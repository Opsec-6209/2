import { useState, useEffect } from "react";
import { useMultilang } from "../hooks/useMultilang";

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  const phrase = useMultilang(1800);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 gif-pixelated"
        style={{
          backgroundImage: "url(/2/lain_wall.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/50 to-bg" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.02) 2px, rgba(0,255,136,0.02) 3px)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div
          className={`transition-all duration-1000 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="font-display text-xs tracking-[0.4em] text-mute mb-4">
            ⌈
          </div>
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight glitch-hover cursor-default"
            style={{ lineHeight: 0.95 }}
          >
            <span className="block text-fg">WIRED</span>
            <span className="block text-lain text-glow-lain text-4xl md:text-5xl lg:text-6xl mt-2">
              sound for wired people
            </span>
          </h1>
          <div className="font-display text-xs tracking-[0.4em] text-mute mt-4">
            ⌋
          </div>
        </div>

        <div
          className={`mt-12 transition-all duration-1000 delay-300 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src="/2/mebious_icon_02.gif"
            alt="mebious"
            className="w-24 h-24 md:w-32 md:h-32 mx-auto gif-pixelated float-slow"
          />
        </div>

        <div
          className={`mt-8 transition-all duration-1000 delay-500 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="font-mono text-base md:text-lg text-cyan text-glow-cyan">
            {phrase}
          </div>
        </div>

        <div
          className={`mt-12 transition-all duration-1000 delay-700 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <button onClick={onEnter} className="btn-lain group">
            <span>▷ enter the wired</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        <div
          className={`mt-16 transition-all duration-1000 delay-1000 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="font-mono text-xs text-mute tracking-widest">
            ⌐ scroll to descend ⌐
          </div>
        </div>
      </div>
    </section>
  );
}
