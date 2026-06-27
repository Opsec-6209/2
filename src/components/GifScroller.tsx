import { useState, useEffect, useRef } from "react";

interface GifScrollerProps {
  gifs: string[];
}

export function GifScroller({ gifs }: GifScrollerProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setOffset((o) => o + 1);
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "12px 0",
        background: "rgba(0, 255, 136, 0.05)",
        borderTop: "1px solid var(--color-hr)",
        borderBottom: "1px solid var(--color-hr)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: "8px",
          transform: `translateX(-${offset}px)`,
        }}
      >
        {[...gifs, ...gifs, ...gifs].map((gif, i) => (
          <img
            key={i}
            src={gif}
            alt=""
            loading="lazy"
            style={{
              height: "32px",
              width: "auto",
              imageRendering: "pixelated",
            }}
          />
        ))}
      </div>
    </div>
  );
}
