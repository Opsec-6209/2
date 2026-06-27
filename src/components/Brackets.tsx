export function Brackets({ position }: { position: "top" | "bottom" }) {
  const className = position === "top" ? "bracket-blink" : "bracket-blink-delay";
  const char1 = position === "top" ? "\u2308" : "\u230A";
  const char2 = position === "top" ? "\u2309" : "\u230B";

  return (
    <>
      <p className={className} style={{ textAlign: "center", color: "var(--color-brackets)", fontSize: "14px", margin: 0 }}>
        {char1}
      </p>
      <p className={className} style={{ textAlign: "center", color: "var(--color-brackets)", fontSize: "14px", margin: 0 }}>
        {char2}
      </p>
    </>
  );
}
