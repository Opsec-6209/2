import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<{ x: number; y: number; alpha: number; color: string }[]>([]);
  const lastColorRef = useRef("#00ff88");

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    setIsVisible(true);

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a, button, input") !== null
      );

      const color = target.tagName === "BUTTON" || target.closest("button")
        ? "#00ff88"
        : target.closest("a")
        ? "#ff0080"
        : target.closest("input")
        ? "#00ddff"
        : "#00ff88";
      lastColorRef.current = color;

      trail.current.push({ x: e.clientX, y: e.clientY, alpha: 1, color });
      if (trail.current.length > 16) trail.current.shift();
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = trailRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i];
        p.alpha = i / trail.current.length;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (i + 2) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(p.alpha * 80)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      }

      trail.current = trail.current.map((p) => ({ ...p, alpha: p.alpha * 0.95 }));
      trail.current = trail.current.filter((p) => p.alpha > 0.05);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <canvas
        ref={trailRef}
        className="fixed inset-0 pointer-events-none z-[199]"
      />
      <div
        className="fixed pointer-events-none z-[200] mix-blend-difference"
        style={{ left: pos.x - 10, top: pos.y - 10, width: 20, height: 20 }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: isHovering ? "scale(1.5) rotate(45deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <div className="w-0.5 h-4 bg-lain absolute top-0" />
          <div className="w-0.5 h-4 bg-lain absolute bottom-0" />
          <div className="w-4 h-0.5 bg-lain absolute left-0" />
          <div className="w-4 h-0.5 bg-lain absolute right-0" />
          {isHovering && (
            <div className="absolute inset-0 border border-pink" style={{ width: 28, height: 28, left: -4, top: -4 }} />
          )}
        </div>
      </div>
    </>
  );
}
