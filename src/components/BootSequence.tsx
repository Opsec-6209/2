import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "Phoenix BIOS v4.0 Release 6.0", delay: 50 },
  { text: "Copyright (C) 2006 opsec Systems", delay: 40 },
  { text: "", delay: 60 },
  { text: "CPU: opsec_6209 @ 4.20GHz", delay: 50 },
  { text: "Memory Test: 65536K OK", delay: 40 },
  { text: "Detecting Primary Master ... opsec_SSD", delay: 50 },
  { text: "Initializing Plug and Play...", delay: 60 },
  { text: "Loading Wired Kernel...", delay: 60 },
  { text: "Loading Mebious Engine v2.91", delay: 80 },
  { text: "Initializing Protocol 7", delay: 50 },
  { text: "Connecting to the Wired", delay: 100 },
  { text: "Connection established.", delay: 150 },
  { text: "", delay: 80 },
  { text: "WELCOME TO THE WIRED, opsec_6209", delay: 100 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"bios" | "connecting" | "done">("bios");

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i >= BOOT_LINES.length) {
        setPhase("connecting");
        const start = Date.now();
        const dur = 1200;
        const prog = () => {
          const elapsed = Date.now() - start;
          const p = Math.min((elapsed / dur) * 100, 100);
          setProgress(p);
          if (p < 100) {
            requestAnimationFrame(prog);
          } else {
            setPhase("done");
            setTimeout(onComplete, 400);
          }
        };
        requestAnimationFrame(prog);
        return;
      }
      setLines((prev) => [...prev, BOOT_LINES[i].text]);
      i++;
      setTimeout(tick, BOOT_LINES[i - 1].delay);
    };
    setTimeout(tick, 150);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[300] bg-bg flex items-center justify-center font-mono">
      <div className="w-full max-w-2xl px-6">
        {phase === "bios" && (
          <>
            <pre className="text-[#d0d0d0] text-[12px] sm:text-[14px] leading-[1.4] whitespace-pre-wrap mb-6">
              {lines.join("\n")}
              <span className="cursor-blink text-lain">_</span>
            </pre>
          </>
        )}
        {phase === "connecting" && (
          <div className="flex flex-col items-center gap-4">
            <div className="font-display text-lg text-fg">CONNECTING TO THE WIRED</div>
            <div className="w-72 h-2 bg-bg-soft border border-default">
              <div
                className="h-full bg-lain"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 12px rgba(0, 255, 136, 0.6)",
                  transition: "width 0.1s",
                }}
              />
            </div>
            <div className="font-code text-xs text-mute">
              {Math.floor(progress)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
