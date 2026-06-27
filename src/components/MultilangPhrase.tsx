import { useMultilang } from "../hooks/useMultilang";

export function MultilangPhrase() {
  const phrase = useMultilang(1200);
  return (
    <h6
      className="phrase-cycle glitch-text"
      style={{
        textAlign: "center",
        color: "var(--color-text-dim)",
        fontSize: "12px",
        fontFamily: "var(--font-mono)",
        margin: "8px 0",
        display: "block",
        height: "20px",
        lineHeight: "20px",
      }}
    >
      {phrase}
    </h6>
  );
}
