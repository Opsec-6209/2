import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import type { Command } from "../hooks/useCommandPalette";

interface CommandPaletteProps {
  isOpen: boolean;
  query: string;
  setQuery: (q: string) => void;
  filtered: Command[];
  selectedIdx: number;
  setSelectedIdx: (n: number) => void;
  execute: (id: string) => void;
  close: () => void;
}

export function CommandPalette({
  isOpen,
  query,
  setQuery,
  filtered,
  selectedIdx,
  setSelectedIdx,
  execute,
  close,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx(Math.min(selectedIdx + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx(Math.max(selectedIdx - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIdx]) {
          execute(filtered[selectedIdx].id);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, selectedIdx, filtered, execute, setSelectedIdx]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={close}
    >
      <div
        className="glass border border-lain/30 w-full max-w-lg shadow-2xl"
        style={{ boxShadow: "0 0 40px rgba(0, 255, 136, 0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-default">
          <Search size={16} className="text-mute" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="type a command..."
            className="flex-1 bg-transparent outline-none text-fg font-mono text-sm placeholder-mute"
          />
          <kbd className="text-[10px] text-mute font-code border border-default px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-mute font-mono text-sm">
              no commands found
            </li>
          ) : (
            filtered.map((cmd, i) => (
              <li
                key={cmd.id}
                onClick={() => execute(cmd.id)}
                onMouseEnter={() => setSelectedIdx(i)}
                className={`px-4 py-2 cursor-pointer font-mono text-sm flex items-center justify-between ${
                  i === selectedIdx
                    ? "bg-lain/10 text-lain"
                    : "text-fg hover:bg-bg-soft"
                }`}
              >
                <span>{cmd.label}</span>
                {cmd.shortcut && (
                  <span className="text-[10px] text-mute font-code">
                    {cmd.shortcut}
                  </span>
                )}
              </li>
            ))
          )}
        </ul>
        <div className="px-4 py-2 border-t border-default text-[10px] text-mute font-mono flex justify-between">
          <span>// wired v2.5</span>
          <span>↑↓ navigate · ↵ select</span>
        </div>
      </div>
    </div>
  );
}
