import { useEffect, useState, useCallback } from "react";

export interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

export function useCommandPalette(commands: Command[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((s) => !s);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIdx(0);
    }
  }, [isOpen]);

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.id.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback(
    (id: string) => {
      const cmd = commands.find((c) => c.id === id);
      if (cmd) {
        cmd.action();
        setIsOpen(false);
      }
    },
    [commands]
  );

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    selectedIdx,
    setSelectedIdx,
    filtered,
    execute,
  };
}
