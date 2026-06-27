import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    setIsVisible(true);
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a, button") !== null
      );
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[200] mix-blend-difference"
        style={{
          left: pos.x - 8,
          top: pos.y - 8,
          width: 16,
          height: 16,
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: isHovering ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.15s",
          }}
        >
          <div className="w-0.5 h-3 bg-lain absolute top-0" />
          <div className="w-0.5 h-3 bg-lain absolute bottom-0" />
          <div className="w-3 h-0.5 bg-lain absolute left-0" />
          <div className="w-3 h-0.5 bg-lain absolute right-0" />
        </div>
      </div>
    </>
  );
}
