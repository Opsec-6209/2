import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: "hero", label: "/home" },
  { id: "about", label: "/about" },
  { id: "tech", label: "/tech" },
  { id: "projects", label: "/projects" },
  { id: "social", label: "/social" },
  { id: "crypto", label: "/crypto" },
  { id: "now-wired", label: "/wired" },
  { id: "aether", label: "/aether" },
];

const terminalLines = [
  "$ init connection",
  "> ok",
  "$ ls ./opsec_6209",
  "> about.tech.projects.social",
  "$ status",
  "> online · wired",
  "$ whoami",
  "> opsec_6209",
  "$ uptime",
  "> since 2013",
  "$ load mind",
  "> reading...",
];

function LiveTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [cmd, setCmd] = useState("");
  const idxRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (idxRef.current >= terminalLines.length) {
        idxRef.current = 0;
        setLines([]);
        setCmd("");
        return;
      }
      const line = terminalLines[idxRef.current];
      idxRef.current += 1;
      if (line.startsWith("$")) {
        setCmd(line);
      } else {
        setLines((prev) => [...prev, line]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-code text-[10px] leading-tight">
      <div className="text-dim">
        {lines.map((l, i) => (
          <div key={i} className="text-cyan">
            {l}
          </div>
        ))}
      </div>
      {cmd && (
        <div className="text-lain flex">
          <span>{cmd}</span>
          <span className="cursor-blink ml-1">_</span>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ active, onNavigate, isOpen, onClose }: SidebarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 glass border-r border-default z-40 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-mute hover:text-fg md:hidden"
          aria-label="Close menu"
        >
          <X size={16} />
        </button>

        <div className="p-6 border-b border-default flex flex-col items-center">
          <div className="relative">
            <img
              src="/2/mebious_icon_02.gif"
              alt="opsec_6209"
              className="w-20 h-20 gif-pixelated float-slow"
            />
            <div className="absolute inset-0 rounded-full bg-lain/10 blur-xl -z-10" />
          </div>
          <div className="font-display text-sm tracking-wider text-lain mt-3 glitch-rgb">
            opsec_6209
          </div>
          <div className="font-mono text-[10px] text-mute mt-1 tracking-widest">
            NRW · DE
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full text-left px-6 py-2 font-mono text-base transition-all relative group ${
                active === item.id
                  ? "text-lain bg-lain/5"
                  : "text-dim hover:text-fg hover:bg-soft"
              }`}
            >
              {active === item.id && (
                <>
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-lain" />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-lain -translate-x-0.5" />
                </>
              )}
              <span className="group-hover:translate-x-0.5 transition-transform">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-default space-y-3">
          <div className="font-mono text-[10px] text-mute">
            <div className="text-dim mb-1">// system time</div>
            <div className="text-cyan font-code text-[11px]">{timeStr}</div>
          </div>

          <div className="font-mono text-[10px] text-mute">
            <div className="text-dim mb-1">// terminal</div>
            <div className="bg-bg/40 border border-default p-2 max-h-32 overflow-hidden">
              <LiveTerminal />
            </div>
          </div>

          <div className="flex gap-3 pt-1 font-mono text-xs">
            <a
              href="https://www.tiktok.com/@opsec_6209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-pink"
              title="TikTok"
            >
              TT
            </a>
            <a
              href="https://github.com/Opsec-6209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-fg"
              title="GitHub"
            >
              GH
            </a>
            <a
              href="https://discord.com/users/868572830269329439"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-cyan"
              title="Discord"
            >
              DC
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
