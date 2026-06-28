import { useEffect, useState, useRef, useCallback } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { Article } from "./components/Article";
import { CodeBlock } from "./components/CodeBlock";
import { Footer } from "./components/Footer";
import { MiniPlayer } from "./components/MiniPlayer";
import { Scanlines } from "./components/Scanlines";
import { CustomCursor } from "./components/CustomCursor";
import { StaticOverlay } from "./components/StaticOverlay";
import { Marquee } from "./components/Marquee";
import { BootSequence } from "./components/BootSequence";
import { CommandPalette } from "./components/CommandPalette";
import { Header } from "./components/Header";
import { useEasterEggs } from "./hooks/useEasterEggs";
import { useCommandPalette, type Command } from "./hooks/useCommandPalette";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { articles } from "./data/articles";

const MARQUEE_GIFS = [
  "/2/smallLain2.gif",
  "/2/video.gif",
  "/2/presentday.gif",
  "/2/Lainpt3.gif",
  "/2/lainsmall2.gif",
  "/2/promo9th.gif",
  "/2/27.gif",
  "/2/whoid.gif",
];

const PROJECT_LIST = [
  { name: "opsec-playground", desc: "Code playground with live HTML/CSS/JS preview" },
  { name: "opsec_6209-studio", desc: "VS Code-like editor with Monaco" },
  { name: "tts-reader", desc: "Text-to-speech with Web Speech API" },
  { name: "cybervault", desc: "Password generator & local vault" },
  { name: "weather-dashboard", desc: "Weather UI with glassmorphism" },
  { name: "github-profile-analyzer", desc: "GitHub profile explorer" },
  { name: "travel-tracker", desc: "Interactive world map tracker" },
  { name: "crypto-live-dashboard", desc: "Real-time crypto prices" },
  { name: "cineverse", desc: "Movie database search" },
  { name: "pixel-art-editor", desc: "16x16 pixel art editor" },
  { name: "recipe-generator", desc: "AI recipe generator" },
  { name: "Kahoot-Bot", desc: "Kahoot game bot" },
];

const SKILL_GROUPS = [
  { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "HTML5", "CSS3"] },
  { name: "Frameworks", items: ["React", "Vite", "Electron", "Tailwind CSS", "Framer Motion"] },
  { name: "Tools", items: ["Git", "GitHub", "VS Code", "Node.js", "Arch Linux", "Lenis"] },
  { name: "Libraries", items: ["Monaco Editor", "Recharts", "Three.js", "Lucide", "Motion Canvas"] },
];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [psycho, setPsycho] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const player = useAudioPlayer();

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-10% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((el) => {
      if (el.id) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [booted]);

  useEasterEggs({
    onKonami: () => {
      window.dispatchEvent(
        new CustomEvent("wired-static", {
          detail: { color: "#00ff88", duration: 8000 },
        })
      );
    },
    onTypeWired: () => {
      window.dispatchEvent(
        new CustomEvent("wired-static", {
          detail: { color: "#00ff88", duration: 4000 },
        })
      );
    },
    onTypeLain: () => {
      const el = containerRef.current;
      if (el) {
        el.style.transition = "font-style 0.5s";
        el.style.fontStyle = "italic";
        setTimeout(() => {
          el.style.fontStyle = "normal";
        }, 5000);
      }
    },
    onTypeCyberia: () => {
      window.dispatchEvent(
        new CustomEvent("wired-static", {
          detail: { color: "#ff3344", duration: 4000 },
        })
      );
    },
    onTypeAether: () => {
      document.getElementById("aether")?.scrollIntoView({ behavior: "smooth" });
    },
    onTypePsycho: () => {
      setPsycho(true);
      setTimeout(() => setPsycho(false), 5000);
    },
  });

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commands: Command[] = useMemo(
    () => [
      {
        id: "home",
        label: "go to /home",
        action: () => scrollTo("hero"),
      },
      {
        id: "about",
        label: "go to /about",
        action: () => scrollTo("about"),
      },
      {
        id: "tech",
        label: "go to /tech",
        action: () => scrollTo("tech"),
      },
      {
        id: "projects",
        label: "go to /projects",
        action: () => scrollTo("projects"),
      },
      {
        id: "social",
        label: "go to /social",
        action: () => scrollTo("social"),
      },
      {
        id: "crypto",
        label: "go to /crypto",
        action: () => scrollTo("crypto"),
      },
      {
        id: "wired",
        label: "go to /wired",
        action: () => scrollTo("now-wired"),
      },
      {
        id: "aether",
        label: "go to /aether",
        action: () => scrollTo("aether"),
      },
      {
        id: "play",
        label: "▷ play music",
        shortcut: "Space",
        action: () => player.togglePlay(),
      },
      {
        id: "next",
        label: "⏭ next track",
        action: () => player.next(),
      },
      {
        id: "prev",
        label: "⏮ previous track",
        action: () => player.prev(),
      },
      {
        id: "github",
        label: "open github",
        action: () => window.open("https://github.com/Opsec-6209", "_blank"),
      },
      {
        id: "tiktok",
        label: "open tiktok",
        action: () => window.open("https://www.tiktok.com/@opsec_6209", "_blank"),
      },
      {
        id: "konami",
        label: "⌈ trigger konami ⌉",
        action: () => {
          window.dispatchEvent(
            new CustomEvent("wired-static", {
              detail: { color: "#00ff88", duration: 8000 },
            })
          );
        },
      },
    ],
    [scrollTo, player]
  );

  const palette = useCommandPalette(commands);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " && !palette.isOpen) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        player.togglePlay();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [player, palette.isOpen]);

  const about = articles.find((a) => a.id === "about")!;
  const manifesto = articles.find((a) => a.id === "manifesto")!;
  const aether = articles.find((a) => a.id === "aether")!;

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      <Scanlines />
      <CustomCursor />
      <StaticOverlay />

      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-lain z-[60] origin-left"
        style={{
          transform: `scaleX(${scrollProgress})`,
          boxShadow: "0 0 8px rgba(0, 255, 136, 0.6)",
        }}
      />

      {psycho && (
        <div className="fixed top-0 left-0 right-0 z-[200] bg-cyberia text-bg text-center font-mono font-bold py-2 pulse-soft">
          [psycho frame, I am here] — Lain mode activated
        </div>
      )}

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden p-2 glass border border-default"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <button
        onClick={() => palette.setIsOpen(true)}
        className="fixed top-4 right-4 z-30 md:right-20 glass border border-default px-3 py-1.5 font-mono text-xs text-dim hover:text-fg hover:border-lain flex items-center gap-2"
      >
        <span>⌘K</span>
        <span className="hidden sm:inline">commands</span>
      </button>

      <Sidebar
        active={active}
        onNavigate={scrollTo}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <CommandPalette
        isOpen={palette.isOpen}
        query={palette.query}
        setQuery={palette.setQuery}
        filtered={palette.filtered}
        selectedIdx={palette.selectedIdx}
        setSelectedIdx={palette.setSelectedIdx}
        execute={palette.execute}
        close={() => palette.setIsOpen(false)}
      />

      <main className="md:pl-64">
        <Hero onEnter={() => scrollTo("about")} />

        <Marquee gifs={MARQUEE_GIFS} speed={80} />

        <section id="content" className="py-16 px-6 max-w-3xl mx-auto">
          <Header />

          <Article
            article={about}
          />

          <div id="tech" className="my-16 scroll-mt-20">
            <div className="card">
              <div className="section-ascii mb-6">═══ TECH STACK ═══</div>
              <div className="font-mono text-sm text-mute mb-6">
                <span className="text-cyan">$</span> ./list --stack
              </div>
              {SKILL_GROUPS.map((group) => (
                <div key={group.name} className="mb-6">
                  <div className="font-mono text-xs text-mute mb-2 tracking-widest">
                    // {group.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-bg border border-default text-sm font-mono text-fg hover:border-lain hover:text-lain transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="projects" className="my-16 scroll-mt-20">
            <div className="card">
              <div className="section-ascii mb-6">═══ PROJECTS ═══</div>
              <div className="font-mono text-sm text-dim mb-4">
                <span className="text-cyan">$</span> ./list --repos
              </div>
              <ul className="space-y-3">
                {PROJECT_LIST.map((p, i) => (
                  <li
                    key={p.name}
                    className="flex gap-3 group hover:bg-bg-soft -mx-2 px-2 py-1 transition-colors"
                  >
                    <span className="text-pink font-mono text-xs mt-1.5 flex-shrink-0">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-code text-sm text-fg group-hover:text-lain transition-colors">
                        {p.name}
                      </div>
                      <div className="font-mono text-xs text-dim">
                        {p.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/Opsec-6209"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 font-mono text-sm text-cyan hover:text-lain transition-colors"
              >
                → see all on github
              </a>
            </div>
          </div>

          <div id="social" className="my-16 scroll-mt-20">
            <div className="card">
              <div className="section-ascii mb-6">═══ SOCIAL ═══</div>
              <div className="space-y-3">
                <a
                  href="https://www.tiktok.com/@opsec_6209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 -mx-3 hover:bg-bg-soft transition-colors group"
                >
                  <span className="text-pink font-mono text-xs w-12">[TT]</span>
                  <span className="font-mono text-fg group-hover:text-pink transition-colors flex-1">
                    @opsec_6209
                  </span>
                  <span className="text-mute font-mono text-xs">→</span>
                </a>
                <a
                  href="https://github.com/Opsec-6209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 -mx-3 hover:bg-bg-soft transition-colors group"
                >
                  <span className="text-fg font-mono text-xs w-12">[GH]</span>
                  <span className="font-mono text-fg group-hover:text-lain transition-colors flex-1">
                    Opsec-6209
                  </span>
                  <span className="text-mute font-mono text-xs">→</span>
                </a>
                <a
                  href="https://discord.com/users/868572830269329439"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 -mx-3 hover:bg-bg-soft transition-colors group"
                >
                  <span className="text-cyan font-mono text-xs w-12">[DC]</span>
                  <span className="font-mono text-fg group-hover:text-cyan transition-colors flex-1">
                    opsec_6209#0000
                  </span>
                  <span className="text-mute font-mono text-xs">→</span>
                </a>
              </div>
            </div>
          </div>

          <div id="crypto" className="my-16 scroll-mt-20">
            <div className="card">
              <div className="section-ascii mb-6">═══ CRYPTO ═══</div>
              <div className="font-mono text-sm text-cyan mb-4">
                <span className="text-mute">$</span> ./transfer --crypto
              </div>
              <div className="space-y-3">
                <CodeBlock
                  label="bitcoin (BTC)"
                  text="bc1q9h6tq8j5g7z3r2v4x6y8n1m3p5q7s9u2w4e6t8"
                />
                <CodeBlock
                  label="ethereum (ETH)"
                  text="0x8f3C2A1B9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9"
                />
                <CodeBlock
                  label="solana (SOL)"
                  text="5xK9mN2pQ7rT4vW8yB1cE3fH6jL0nP5qS8uV2wX4yZ7aD9eF1gH3iJ6kM0pR2sU5vY8z"
                />
              </div>
              <div className="font-mono text-[10px] text-mute mt-4">
                // click any to copy · no address is real, just for show
              </div>
            </div>
          </div>

          <div id="now-wired" className="my-16 scroll-mt-20">
            <div className="card border-cyberia/30">
              <div className="section-ascii mb-4 text-cyberia">
                ═══ NOW WIRED ═══
              </div>
              <div className="font-display text-2xl text-fg text-center mb-2 glitch-rgb">
                26 tracks
              </div>
              <div className="font-mono text-xs text-dim text-center mb-6">
                26 nightcore tracks auto-advancing through the Wired.
                <br />
                Click the player in the corner to begin.
              </div>
              <div className="text-center">
                <div className="font-code text-sm text-cyan pulse-soft">
                  ▷ click player to begin transmission
                </div>
              </div>
            </div>
          </div>

          <Article article={manifesto} />
          <Article article={aether} />
        </section>

        <Footer />
      </main>

      <MiniPlayer />
    </div>
  );
}

import { useMemo } from "react";
