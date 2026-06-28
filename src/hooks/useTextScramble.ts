import { useState, useEffect, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01アイウエオカキクケコサシスセソタチツテト";

export function useTextScramble(target: string, duration = 800) {
  const [text, setText] = useState(target);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    frameRef.current = 0;
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let result = "";
      for (let i = 0; i < target.length; i++) {
        const threshold = i / target.length;
        if (progress > threshold + 0.1) {
          result += target[i];
        } else if (progress > threshold) {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setText(result);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      } else {
        setText(target);
        setIsAnimating(false);
      }
    };

    rafRef.current = requestAnimationFrame(update);
  }, [target, duration, isAnimating]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { text, scramble, isAnimating };
}

function useCallback<T extends (...args: any[]) => any>(fn: T, _deps: any[]): T {
  return useState(() => fn)[0] as any;
}
