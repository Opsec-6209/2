import { useEffect, useState, useRef } from "react";
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
import { useEasterEggs } from "./hooks/useEasterEggs";
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
  { name: "Frameworks", items: ["React", "Vite", "Electron", "Tailwind CSS"] },
  { name: "Tools", items: ["Git", "GitHub", "VS Code", "Node.js", "Arch Linux"] },
  { name: "Libraries", items: ["Monaco Editor", "Recharts", "Lenis", "Lucide"] },
];

export default function App() {
  const [active, setActive] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [psycho, setPsycho] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEasterEggs({
    onKonami: () => {
      window.dispatchEvent(
        new CustomEvent("wired-static", { detail: { color: "#00ff88", duration: 8000 } })
      );
    },
    onTypeWired: () => {
      window.dispatchEvent(
        new CustomEvent("wired-static", { detail: { color: "#00ff88", duration: 4000 } })
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
        new CustomEvent("wired-static", { detail: { color: "#ff3344", duration: 4000 } })
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll("section[id], div[id]").forEach((el) => {
      if (el.id) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const nowWired = articles.find((a) => a.id === "now-wired");

  return (
    <div ref={containerRef} className="min-h-screen">
      <Scanlines />
      <CustomCursor />
      <StaticOverlay />

      {psycho && (
        <div className="fixed top-0 left-0 right-0 z-[200] bg-cyberia text-bg text-center font-mono font-bold py-2 pulse-soft z-[200]">
          [psycho frame, I am here] — Lain mode activated
        </div>
      )}

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden p-2 bg-bg-soft border border-default"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <Sidebar
        active={active}
        onNavigate={scrollTo}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="md:pl-64">
        <Hero onEnter={() => scrollTo("about")} />

        <Marquee gifs={MARQUEE_GIFS} speed={80} />

        <section id="content" className="py-16 px-6">
          <Article
            article={articles.find((a) => a.id === "about")!}
          />
          <Article
            article={{
              ...articles.find((a) => a.id === "tech")!,
              content: [
                {
                  type: "text",
                  value:
                    "Developer based in NRW, Germany. I make things on the web, listen to nightcore, and explore the Wired. Fav OS: Arch Linux btw.",
                },
              ],
            }}
          />

          {/* Skills section */}
          <div className="max-w-2xl mx-auto my-12">
            <div className="card">
              <div className="section-ascii mb-6">═══ TECH STACK ═══</div>
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

          <Article
            article={{
              ...articles.find((a) => a.id === "projects")!,
              content: [
                {
                  type: "text",
                  value: "13 open-source projects on GitHub. Each one a small experiment:",
                },
                {
                  type: "list",
                  prefix: "▸",
                  items: PROJECT_LIST.map((p) => `${p.name} — ${p.desc}`),
                },
                {
                  type: "link",
                  href: "https://github.com/Opsec-6209",
                  text: "→ see all projects on github",
                },
              ],
            }}
          />

          <Article
            article={articles.find((a) => a.id === "social")!}
          />

          <Article
            article={{
              ...articles.find((a) => a.id === "crypto")!,
              content: [
                { type: "text", value: "[click any to copy]" },
              ],
            }}
          />

          {/* Crypto with code blocks */}
          <div className="max-w-2xl mx-auto my-12">
            <div className="card space-y-3">
              <div className="font-mono text-sm text-cyan">
                <span className="text-mute">$</span> ./transfer --crypto
              </div>
              <div className="space-y-2">
                <CodeBlock
                  label="bitcoin"
                  text="bc1q9h6tq8j5g7z3r2v4x6y8n1m3p5q7s9u2w4e6t8"
                />
                <CodeBlock
                  label="ethereum"
                  text="0x8f3C2A1B9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9"
                />
                <CodeBlock
                  label="solana"
                  text="5xK9mN2pQ7rT4vW8yB1cE3fH6jL0nP5qS8uV2wX4yZ"
                />
              </div>
            </div>
          </div>

          {/* Now Wired section */}
          {nowWired && (
            <div className="max-w-2xl mx-auto my-12">
              <div className="card border-cyberia/30">
                <div className="section-ascii mb-4">═══ NOW WIRED ═══</div>
                <div className="font-display text-2xl text-fg text-center mb-2">
                  26 tracks
                </div>
                <div className="font-mono text-xs text-dim text-center mb-6">
                  26 nightcore tracks auto-advancing through the Wired.
                  <br />
                  Click the player in the corner to begin.
                </div>
                <div className="text-center">
                  <div className="font-code text-sm text-cyan">
                    ▶ currently: waiting for connection
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manifesto */}
          <Article article={articles.find((a) => a.id === "manifesto")!} />

          {/* Æther */}
          <Article
            article={{
              ...articles.find((a) => a.id === "aether")!,
            }}
          />
        </section>

        <Footer />
      </main>

      <MiniPlayer />
    </div>
  );
}
