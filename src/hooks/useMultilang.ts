import { useState, useEffect } from "react";
import { phrases } from "../data/phrases";

export function useMultilang(interval = 1200) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return phrases[index];
}
