import { useRef, type ReactNode, type MouseEvent } from "react";

interface CardProps {
  id?: string;
  accent?: "lain" | "pink" | "cyan" | "cyberia" | "violet";
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

export function Card({
  id,
  accent = "lain",
  children,
  className = "",
  tilt = true,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  };

  const accentClass =
    accent === "pink"
      ? "card-pink"
      : accent === "violet"
      ? "card-violet"
      : "";

  return (
    <div
      ref={ref}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card ${accentClass} ${className} tilt-3d transition-transform duration-200`}
    >
      {children}
    </div>
  );
}
