import { useEffect } from "react";

export type EasterEggMode = "normal" | "wired" | "lain" | "cyberia" | "aether";

interface UseEasterEggsProps {
  onKonami: () => void;
  onTypeWired: () => void;
  onTypeLain: () => void;
  onTypeCyberia: () => void;
  onTypeAether: () => void;
  onTypePsycho: () => void;
}

export function useEasterEggs(props: UseEasterEggsProps) {
  useEffect(() => {
    const konamiSeq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let konamiIdx = 0;
    let buffer = "";

    const handler = (e: KeyboardEvent) => {
      if (e.key === konamiSeq[konamiIdx] || e.key.toLowerCase() === konamiSeq[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konamiSeq.length) {
          konamiIdx = 0;
          props.onKonami();
        }
      } else {
        konamiIdx = 0;
      }

      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      buffer += e.key.toLowerCase();
      if (buffer.length > 20) buffer = buffer.slice(-20);

      if (buffer.includes("wired")) { props.onTypeWired(); buffer = ""; }
      else if (buffer.includes("lain")) { props.onTypeLain(); buffer = ""; }
      else if (buffer.includes("cyberia")) { props.onTypeCyberia(); buffer = ""; }
      else if (buffer.includes("aether") || buffer.includes("æther")) { props.onTypeAether(); buffer = ""; }
      else if (buffer.includes("psycho")) { props.onTypePsycho(); buffer = ""; }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [props]);
}
