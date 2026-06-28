import { useEffect, useRef } from "react";

interface MusicVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
  height?: number;
  barCount?: number;
}

export function MusicVisualizer({
  audioElement,
  isPlaying,
  height = 48,
  barCount = 32,
}: MusicVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);
  const peakDataRef = useRef<number[]>(new Array(barCount).fill(0));
  const connectedElRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let cancelled = false;

    const ensureGraph = () => {
      if (cancelled || !audioElement) return;
      if (connectedElRef.current === audioElement) return;
      try {
        if (!ctxRef.current) {
          const Ctor = window.AudioContext || (window as any).webkitAudioContext;
          if (!Ctor) return;
          ctxRef.current = new Ctor();
        }
        const actx = ctxRef.current;
        if (actx.state === "suspended") void actx.resume();
        if (!analyserRef.current) {
          const an = actx.createAnalyser();
          an.fftSize = 64;
          an.smoothingTimeConstant = 0.78;
          analyserRef.current = an;
          dataRef.current = new Uint8Array(an.frequencyBinCount);
        }
        if (sourceRef.current) {
          try { sourceRef.current.disconnect(); } catch {}
        }
        const an = analyserRef.current!;
        const src = actx.createMediaElementSource(audioElement);
        src.connect(an);
        an.connect(actx.destination);
        sourceRef.current = src;
        connectedElRef.current = audioElement;
      } catch {}
    };

    const draw = () => {
      if (cancelled || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const barW = (w - (barCount - 1) * 2) / barCount;
      const an = analyserRef.current;
      const d = dataRef.current;

      if (an && d && isPlaying && connectedElRef.current === audioElement) {
        an.getByteFrequencyData(d as Uint8Array<ArrayBuffer>);
        for (let i = 0; i < barCount; i++) {
          const v = d[i] ?? 0;
          const t = v / 255;
          const barH = Math.max(2, t * h);
          peakDataRef.current[i] = Math.max(barH, peakDataRef.current[i] * 0.92);
          const hue = (i / barCount) * 120 + 140;
          const x = i * (barW + 2);
          const y = h - barH;
          const grad = ctx.createLinearGradient(0, y, 0, h);
          grad.addColorStop(0, `hsl(${hue}, 100%, 60%)`);
          grad.addColorStop(1, `hsl(${hue}, 100%, 35%)`);
          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barW, barH);
        }
      } else {
        for (let i = 0; i < barCount; i++) {
          peakDataRef.current[i] = Math.max(2, peakDataRef.current[i] * 0.92);
          const hue = (i / barCount) * 120 + 140;
          const x = i * (barW + 2);
          const y = h - peakDataRef.current[i];
          ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.4)`;
          ctx.fillRect(x, y, barW, peakDataRef.current[i]);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    if (isPlaying) ensureGraph();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [audioElement, isPlaying, barCount]);

  useEffect(() => {
    return () => {
      try { sourceRef.current?.disconnect(); } catch {}
      try { analyserRef.current?.disconnect(); } catch {}
      const actx = ctxRef.current;
      if (actx && actx.state !== "closed") actx.close().catch(() => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={height * 4}
      className="w-full gif-pixelated"
      style={{ height: `${height}px` }}
    />
  );
}
