interface MarqueeProps {
  gifs: string[];
  speed?: number;
}

export function Marquee({ gifs, speed = 60 }: MarqueeProps) {
  const items = [...gifs, ...gifs];

  return (
    <div className="relative overflow-hidden border-y border-default py-4 bg-soft/30">
      <div
        className="flex gap-6 marquee-track w-max"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((gif, i) => (
          <img
            key={i}
            src={gif}
            alt=""
            loading="lazy"
            className="gif-pixelated h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
}
