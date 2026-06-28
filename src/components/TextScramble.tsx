import { useTextScramble } from "../hooks/useTextScramble";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
  triggerOnHover?: boolean;
  triggerOnMount?: boolean;
}

export function TextScramble({
  text,
  className = "",
  duration = 800,
  as: Tag = "span",
  triggerOnHover = false,
  triggerOnMount = true,
}: TextScrambleProps) {
  const { text: displayText, scramble, isAnimating } = useTextScramble(
    text,
    duration
  );

  const handleMouseEnter = () => {
    if (triggerOnHover) scramble();
  };

  if (triggerOnMount && !isAnimating) {
    return (
      <Tag
        className={className}
        onMouseEnter={handleMouseEnter}
        style={{ cursor: triggerOnHover ? "pointer" : "default" }}
      >
        {displayText}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: triggerOnHover ? "pointer" : "default" }}
    >
      {displayText}
    </Tag>
  );
}
