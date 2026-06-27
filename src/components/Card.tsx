import type { ReactNode } from "react";

interface CardProps {
  id?: string;
  accent?: "lain" | "pink" | "cyan" | "cyberia";
  children: ReactNode;
  className?: string;
}

export function Card({ id, accent = "lain", children, className = "" }: CardProps) {
  return (
    <div
      id={id}
      className={`card ${accent === "pink" ? "card-pink" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
