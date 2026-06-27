import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  text: string;
  label?: string;
  className?: string;
}

export function CodeBlock({ text, label, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className={`relative group ${className}`}>
      {label && (
        <div className="font-mono text-xs text-mute mb-1.5 tracking-wider">
          // {label}
        </div>
      )}
      <div className="code-block flex items-center gap-3 pr-12">
        <span className="text-lain font-code text-xs select-none">{">"}</span>
        <span className="text-cyan font-code">{text}</span>
      </div>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-1/2 -translate-y-1/2 mt-3 p-1.5 text-mute hover:text-lain transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check size={14} className="text-lain" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}
