import { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  X,
  Minimize2,
} from "lucide-react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { MusicVisualizer } from "./MusicVisualizer";

export function MiniPlayer() {
  const {
    audio,
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
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimateWrapper open={open}>
        {open && !minimized && (
          <div className="glass border border-lain/30 mb-2 w-80 p-4 shadow-2xl backdrop-blur-xl bg-bg-soft/90">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-xs text-mute tracking-widest">
                // now wired
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(true)}
                  className="p-1 text-mute hover:text-fg"
                  title="Minimize"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 text-mute hover:text-fg"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={track.thumbnail}
                alt={track.title}
                className={`w-14 h-14 gif-pixelated border border-default ${
                  isPlaying ? "spin-slow" : ""
                }`}
                style={{ animationDuration: "8s" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23121212'/%3E%3Ctext x='28' y='36' font-family='monospace' font-size='22' fill='%2300ff88' text-anchor='middle'%3E%E2%99%AA%3C/text%3E%3C/svg%3E";
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

            <div className="mb-3">
              <MusicVisualizer
                audioElement={audio}
                isPlaying={isPlaying}
                height={36}
                barCount={28}
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={prev}
                className="p-2 text-dim hover:text-fg transition-colors"
                title="Previous"
              >
                <SkipBack size={18} />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-lain text-bg hover:scale-105 transition-transform"
                style={{ boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)" }}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={next}
                className="p-2 text-dim hover:text-fg transition-colors"
                title="Next"
              >
                <SkipForward size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-dim hover:text-fg"
                title="Mute"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={14} />
                ) : (
                  <Volume2 size={14} />
                )}
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

        {open && minimized && (
          <div className="glass border border-lain/30 mb-2 w-64 p-3 flex items-center gap-2">
            <img
              src={track.thumbnail}
              alt=""
              className="w-8 h-8 gif-pixelated"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="flex-1 min-w-0 font-mono text-xs text-fg truncate">
              {track.title}
            </div>
            <button
              onClick={() => setMinimized(false)}
              className="p-1 text-mute hover:text-fg"
              title="Expand"
            >
              <Minimize2 size={12} />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-mute hover:text-fg"
              title="Close"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </AnimateWrapper>

      <button
        onClick={() => {
          setOpen(!open);
          setMinimized(false);
        }}
        className={`flex items-center gap-2 px-3 py-2 glass border border-default hover:border-lain transition-all ${
          isPlaying ? "border-lain/50 glow-lain" : ""
        }`}
        title="Music player (Space to play/pause)"
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
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-lain"
                style={{
                  animation: `pulse-bar 0.6s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </button>
    </div>
  );
}

function AnimateWrapper({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return <div className="animate-in fade-in slide-in-from-bottom-2">{children}</div>;
}
