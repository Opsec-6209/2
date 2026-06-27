import { useEffect, useState, useRef } from "react";
import { Header } from "./components/Header";
import { Article } from "./components/Article";
import { NowWired } from "./components/NowWired";
import { Footer } from "./components/Footer";
import { GifScroller } from "./components/GifScroller";
import { StaticOverlay } from "./components/StaticOverlay";
import { articles } from "./data/articles";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useEasterEggs } from "./hooks/useEasterEggs";
import type { EasterEggMode } from "./hooks/useEasterEggs";

const SCROLLER_GIFS = [
  "/2/smallLain2.gif",
  "/2/video.gif",
  "/2/presentday.gif",
  "/2/Lainpt3.gif",
  "/2/lainsmall2.gif",
  "/2/promo9th.gif",
];

export default function App() {
  const player = useAudioPlayer();
  const [mode, setMode] = useState<EasterEggMode>("normal");
  const [staticActive, setStaticActive] = useState(false);
  const [italicAll, setItalicAll] = useState(false);
  const [psychoVisible, setPsychoVisible] = useState(false);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    if (hasTriedAutoplay.current) return;
    hasTriedAutoplay.current = true;
    player.play();
    const events: (keyof WindowEventMap)[] = ["click", "keydown", "scroll", "touchstart"];
    const handler = () => {
      player.play();
      events.forEach((e) => window.removeEventListener(e, handler));
    };
    const t = setTimeout(() => {
      events.forEach((e) => window.addEventListener(e, handler, { once: true, passive: true }));
    }, 500);
    return () => {
      clearTimeout(t);
      events.forEach((e) => window.removeEventListener(e, handler));
    };
  }, [player]);

  useEasterEggs({
    onKonami: () => {
      setMode("wired");
      setStaticActive(true);
      setItalicAll(true);
      setTimeout(() => {
        setMode("normal");
        setStaticActive(false);
        setItalicAll(false);
      }, 8000);
    },
    onTypeWired: () => {
      setMode("wired");
      setStaticActive(true);
      setTimeout(() => {
        setMode("normal");
        setStaticActive(false);
      }, 5000);
    },
    onTypeLain: () => {
      setItalicAll(true);
      setTimeout(() => setItalicAll(false), 5000);
    },
    onTypeCyberia: () => {
      setMode("cyberia");
      setTimeout(() => setMode("normal"), 5000);
    },
    onTypeAether: () => {
      document.getElementById("article-aether")?.scrollIntoView({ behavior: "smooth" });
    },
    onTypePsycho: () => {
      setPsychoVisible(true);
      setTimeout(() => setPsychoVisible(false), 5000);
    },
  });

  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        color: "var(--color-text)",
        background: "var(--color-bg)",
        minHeight: "100vh",
        fontStyle: italicAll ? "italic" : "normal",
        transition: "font-style 0.5s",
      }}
    >
      <StaticOverlay active={staticActive} color={mode === "cyberia" ? "#ff0080" : "#00ff88"} />

      <div
        style={{
          display: psychoVisible ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "8px",
          background: "var(--color-accent)",
          color: "var(--color-bg)",
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: "bold",
          zIndex: 100,
        }}
      >
        [psycho frame, I am here] — Lain mode activated
      </div>

      <Header />

      <GifScroller gifs={SCROLLER_GIFS} />

      {articles.map((article) => {
        if (article.id === "now-wired") {
          return (
            <div
              key={article.id}
              className="article"
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "16px",
                borderTop: "1px solid var(--color-hr)",
              }}
            >
              <div className={`icon-${article.iconType.toLowerCase()}`} />
              <h1
                style={{
                  fontSize: "24px",
                  fontFamily: "var(--font-serif)",
                  margin: "8px 0",
                  color: "var(--color-text)",
                }}
              >
                {article.title}
              </h1>
              <h5 className="author" style={{ fontSize: "12px", color: "var(--color-text-dim)", margin: "4px 0" }}>
                {article.author}
              </h5>
              <h5 className="date" style={{ fontSize: "12px", color: "var(--color-text-dim)", margin: "4px 0" }}>
                {article.date}
              </h5>
              <br />
              <hr />
              <br />
              <br />
              <NowWired />
              <br />
              <br />
            </div>
          );
        }
        return (
          <div key={article.id} id={`article-${article.id}`}>
            <Article article={article} />
          </div>
        );
      })}

      <Footer />
    </div>
  );
}
