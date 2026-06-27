import { useEffect, useState } from "react";

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
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-bg-soft border-r border-default z-40 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-default flex flex-col items-center">
          <img
            src="/2/mebious_icon_02.gif"
            alt="opsec_6209"
            className="w-20 h-20 gif-pixelated mb-3"
          />
          <div className="font-display text-sm tracking-wider text-lain">
            opsec_6209
          </div>
          <div className="font-mono text-xs text-mute mt-1">NRW, DE</div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full text-left px-6 py-2 font-mono text-base transition-all relative ${
                active === item.id
                  ? "text-lain bg-lain/5"
                  : "text-dim hover:text-text hover:bg-soft"
              }`}
            >
              {active === item.id && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-lain" />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-default space-y-3">
          <div className="font-mono text-xs text-mute">
            <div className="text-dim mb-1">// system time</div>
            <div className="text-cyan font-code">{timeStr}</div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.tiktok.com/@opsec_6209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-pink text-sm"
              title="TikTok"
            >
              TT
            </a>
            <a
              href="https://github.com/Opsec-6209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-fg text-sm"
              title="GitHub"
            >
              GH
            </a>
            <a
              href="https://discord.com/users/868572830269329439"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-cyan text-sm"
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
