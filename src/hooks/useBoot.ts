import { useState, useEffect } from "react";

const STORAGE_KEY = "wired-booted";

const BOOT_SEQUENCE = [
  { text: "Phoenix BIOS v4.0 Release 6.0", delay: 80 },
  { text: "Copyright (C) 2006 opsec Systems", delay: 60 },
  { text: "", delay: 100 },
  { text: "CPU: opsec_6209 @ 4.20GHz", delay: 70 },
  { text: "Memory Test: 65536K OK", delay: 60 },
  { text: "Detecting Primary Master ... opsec_SSD", delay: 80 },
  { text: "Initializing Plug and Play...", delay: 100 },
  { text: "Loading Wired Kernel...", delay: 100 },
  { text: "Loading Mebious Engine v2.91", delay: 120 },
  { text: "Initializing Protocol 7", delay: 80 },
  { text: "Connecting to the Wired", delay: 150 },
  { text: "Connection established.", delay: 200 },
  { text: "", delay: 100 },
  { text: "WELCOME TO THE WIRED, opsec_6209", delay: 100 },
];

export function useBoot() {
  const [booted, setBooted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [bootLines, setBootLines] = useState<string[]>(
    booted ? BOOT_SEQUENCE.map((l) => l.text) : []
  );
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(booted);

  useEffect(() => {
    if (booted) {
      setShowContent(true);
      return;
    }

    setPhase("bios");
    setBootLines([]);
    setProgress(0);

    let i = 0;
    const tick = () => {
      if (i >= BOOT_SEQUENCE.length) {
        setPhase("connecting");
        let p = 0;
        const startTime = Date.now();
        const dur = 1500;
        const progressTick = () => {
          const elapsed = Date.now() - startTime;
          p = Math.min((elapsed / dur) * 100, 100);
          setProgress(p);
          if (p < 100) {
            requestAnimationFrame(progressTick);
          } else {
            setPhase("done");
            try {
              localStorage.setItem(STORAGE_KEY, "1");
            } catch {}
            setTimeout(() => {
              setShowContent(true);
              setBooted(true);
            }, 400);
          }
        };
        requestAnimationFrame(progressTick);
        return;
      }
      setBootLines((prev) => [...prev, BOOT_SEQUENCE[i].text]);
      i++;
      setTimeout(tick, BOOT_SEQUENCE[i - 1].delay);
    };
    const start = setTimeout(tick, 200);

    return () => clearTimeout(start);
  }, [booted]);

  const [phase, setPhase] = useState<"bios" | "connecting" | "done">(
    booted ? "done" : "bios"
  );

  return { booted, showContent, phase, progress, bootLines };
}
