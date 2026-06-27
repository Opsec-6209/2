import { useEffect, useState } from "react";

export function StaticOverlay() {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("#00ff88");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setColor(detail?.color || "#00ff88");
      setActive(true);
      const dur = detail?.duration || 4000;
      setTimeout(() => setActive(false), dur);
    };
    window.addEventListener("wired-static", handler as EventListener);
    return () => window.removeEventListener("wired-static", handler as EventListener);
  }, []);

  if (!active) return null;
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[150] animate-pulse-soft"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, ${color}22 1px, ${color}22 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, ${color}22 1px, ${color}22 2px)`,
        backgroundSize: "3px 3px",
        mixBlendMode: "screen",
      }}
    />
  );
}
