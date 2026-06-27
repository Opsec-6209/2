import { useAudioPlayer } from "../hooks/useAudioPlayer";

export function NowWired() {
  const {
    track,
    isPlaying,
    togglePlay,
    next,
    prev,
    currentTime,
    duration,
    volume,
    isMuted,
    setVolume,
    toggleMute,
    seek,
  } = useAudioPlayer();

  const formatTime = (s: number) => {
    if (!isFinite(s) || s < 0) return "00:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--color-text)",
        margin: "16px 0",
        padding: "12px",
        border: "1px solid var(--color-hr)",
        background: "rgba(20, 20, 20, 0.5)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
        <button
          onClick={prev}
          style={{
            background: "transparent",
            border: "1px solid var(--color-text-mute)",
            color: "var(--color-text)",
            padding: "2px 8px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          ⏮
        </button>
        <button
          onClick={togglePlay}
          style={{
            background: "var(--color-accent)",
            border: "none",
            color: "var(--color-bg)",
            padding: "2px 12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontFamily: "var(--font-mono)",
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={next}
          style={{
            background: "transparent",
            border: "1px solid var(--color-text-mute)",
            color: "var(--color-text)",
            padding: "2px 8px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          ⏭
        </button>
        <span style={{ marginLeft: "8px", color: "var(--color-accent)" }}>
          {isPlaying ? "▶" : "⏸"} {track.title} - {track.artist}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", flexWrap: "wrap" }}>
        <span style={{ minWidth: "40px" }}>{formatTime(currentTime)}</span>
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            if (duration > 0) seek(pct * duration);
          }}
          style={{
            flex: 1,
            minWidth: "100px",
            height: "6px",
            background: "var(--color-bg-alt)",
            cursor: "pointer",
            border: "1px solid var(--color-text-mute)",
          }}
        >
          <div
            style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              height: "100%",
              background: "var(--color-accent)",
            }}
          />
        </div>
        <span style={{ minWidth: "40px" }}>{formatTime(duration)}</span>
        <span style={{ marginLeft: "8px" }}>vol</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ width: "80px" }}
          title="Volume"
        />
        <span style={{ minWidth: "30px" }}>{Math.round((isMuted ? 0 : volume) * 100)}%</span>
        <button
          onClick={toggleMute}
          style={{
            background: "transparent",
            border: "1px solid var(--color-text-mute)",
            color: "var(--color-text)",
            padding: "2px 6px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          {isMuted || volume === 0 ? "M" : "S"}
        </button>
      </div>
    </div>
  );
}
