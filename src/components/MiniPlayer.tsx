import { useEffect, useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

export function MiniPlayer() {
  const {
    track,
    isPlaying,
    togglePlay,
    next,
    prev,
    volume,
    isMuted,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  const [open, setOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasTried = useRef(false);

  useEffect(() => {
    if (hasTried.current) return;
    hasTried.current = true;
    const events: (keyof WindowEventMap)[] = ["click", "keydown", "touchstart"];
    const handler = () => {
      if (hasInteracted) return;
      setHasInteracted(true);
      events.forEach((e) => window.removeEventListener(e, handler));
    };
    events.forEach((e) => window.addEventListener(e, handler, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, handler));
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="card mb-2 w-72 p-4 backdrop-blur-xl bg-bg-soft/90">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-xs text-mute">// now wired</div>
            <button
              onClick={() => setOpen(false)}
              className="text-mute hover:text-fg text-xs"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <img
              src={track.thumbnail}
              alt={track.title}
              className="w-12 h-12 gif-pixelated border border-default"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23121212'/%3E%3Ctext x='24' y='30' font-family='monospace' font-size='18' fill='%2300ff88' text-anchor='middle'%3E%E2%99%AA%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm truncate text-fg">
                {track.title}
              </div>
              <div className="font-mono text-xs text-dim truncate">
                {track.artist}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 mb-3">
            <button
              onClick={prev}
              className="p-2 text-dim hover:text-fg transition-colors"
              title="Previous"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 bg-lain text-bg hover:opacity-80 transition-opacity"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={next}
              className="p-2 text-dim hover:text-fg transition-colors"
              title="Next"
            >
              <SkipForward size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-dim hover:text-fg"
              title="Mute"
            >
              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-1 appearance-none bg-border-hi rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-lain [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <span className="font-code text-[10px] text-mute w-7 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 bg-bg-soft/90 backdrop-blur-xl border border-default hover:border-lain transition-all ${
          isPlaying ? "border-lain/50 glow-lain" : ""
        }`}
        title="Music player"
      >
        <Music
          size={14}
          className={isPlaying ? "text-lain pulse-soft" : "text-dim"}
        />
        <span className="font-mono text-xs text-dim max-w-[120px] truncate">
          {isPlaying ? track.title : "click for music"}
        </span>
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-lain"
                style={{
                  animation: `pulse-bar 0.8s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </button>

      <style>{`
        @keyframes pulse-bar {
          0%, 100% { height: 3px; }
          50% { height: 10px; }
        }
      `}</style>
    </div>
  );
}
