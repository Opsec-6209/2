import { useEffect } from "react";
import { useMultilang } from "../hooks/useMultilang";
import { useTextScramble } from "../hooks/useTextScramble";

export function Header() {
  const phrase = useMultilang(1800);
  const { text: navText, scramble: scrambleNav } = useTextScramble("> ls ./opsec_6209", 600);
  const { text: statusText, scramble: scrambleStatus } = useTextScramble(
    "online · 13 projects · 26 tracks",
    600
  );

  useEffect(() => {
    scrambleNav();
    scrambleStatus();
  }, [scrambleNav, scrambleStatus]);

  return (
    <div className="text-center mb-12">
      <div className="font-mono text-xs text-mute tracking-widest mb-2">
        <span className="text-pink">//</span> mebious engine v2.91 <span className="text-pink">//</span> protocol 7 <span className="text-pink">//</span> knight online
      </div>
      <div className="font-code text-sm text-cyan text-glow-cyan mt-3">
        {phrase}
      </div>
      <div className="font-code text-xs text-mute mt-3">
        {navText}
      </div>
      <div className="font-code text-xs text-lain mt-1">
        {statusText}
      </div>
    </div>
  );
}
