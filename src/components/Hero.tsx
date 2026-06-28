import { Suspense, lazy, useState, useEffect } from "react";
import { useMultilang } from "../hooks/useMultilang";
import { TextScramble } from "./TextScramble";
import { ErrorBoundary } from "./ErrorBoundary";
import { ChevronDown } from "lucide-react";

const Hero3D = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));

interface HeroProps {
  onEnter: () => void;
}

export function Hero({ onEnter }: HeroProps) {
  const phrase = useMultilang(1800);
  const [loaded, setLoaded] = useState(false);
  const [supports3D, setSupports3D] = useState(true);

  useEffect(() => {
    setLoaded(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setSupports3D(false);
    } catch {
      setSupports3D(false);
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {supports3D && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </ErrorBoundary>
      )}

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.02) 2px, rgba(0,255,136,0.02) 3px)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="font-display text-xs tracking-[0.4em] text-mute mb-4 glitch-rgb">
            ⌈ ENTERING THE WIRED ⌉
          </div>
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight cursor-default mb-4"
            style={{ lineHeight: 0.95 }}
          >
            <TextScramble
              text="WIRED"
              as="span"
              className="block text-fg glitch-hover"
            />
            <TextScramble
              text="for wired people"
              as="span"
              className="block text-2xl md:text-3xl lg:text-4xl mt-2 text-cyan text-glow-cyan glitch-hover"
            />
          </h1>
          <div className="font-display text-xs tracking-[0.4em] text-mute mt-4">
            ⌋
          </div>
        </div>

        <div
          className={`mt-10 transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="font-mono text-xs text-mute tracking-widest">
            <span className="text-pink">//</span> mebious engine v2.91 <span className="text-pink">//</span> protocol 7 <span className="text-pink">//</span> knight online
          </div>
        </div>

        <div
          className={`mt-6 transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="font-mono text-base md:text-lg text-lain text-glow-lain">
            {phrase}
          </div>
        </div>

        <div
          className={`mt-12 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={onEnter}
            className="btn-lain group relative"
          >
            <span>▷ enter the wired</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
            <span
              className="absolute inset-0 -z-10 blur-xl bg-lain/30 group-hover:bg-lain/50 transition-colors"
            />
          </button>
          <div className="mt-3 font-mono text-[10px] text-mute">
            or press <kbd className="border border-default px-1.5 py-0.5">⌘K</kbd> for commands
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-1 text-mute font-mono text-xs">
            <span>scroll to descend</span>
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
