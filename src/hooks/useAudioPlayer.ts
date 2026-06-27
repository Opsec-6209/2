import { playlist } from "../data/playlist";
import { useState, useCallback, useEffect, useRef } from "react";

export type RepeatMode = "off" | "all" | "one";

export function useAudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const saved = localStorage.getItem("sakura-track-index");
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    try {
      const saved = localStorage.getItem("sakura-volume");
      return saved ? Number(saved) : 0.5;
    } catch {
      return 0.5;
    }
  });
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [audio] = useState(() => {
    const a = new Audio();
    a.preload = "auto";
    return a;
  });

  const track = playlist[currentIndex];
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const play = useCallback(() => {
    audio.src = track.file;
    audio.volume = isMuted ? 0 : volume;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, [track.file, audio, volume, isMuted]);

  const pause = useCallback(() => {
    audio.pause();
    setIsPlaying(false);
  }, [audio]);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, []);

  const seek = useCallback(
    (time: number) => {
      audio.currentTime = time;
      setCurrentTime(time);
    },
    [audio]
  );

  const setVolume = useCallback(
    (v: number) => {
      audio.volume = v;
      setVolumeState(v);
      setIsMuted(v === 0);
      try {
        localStorage.setItem("sakura-volume", String(v));
      } catch {}
    },
    [audio]
  );

  const toggleMute = useCallback(() => {
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume, audio]);

  useEffect(() => {
    audio.volume = isMuted ? 0 : volume;
  }, []);

  useEffect(() => {
    audio.src = track.file;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };
    const onPause = () => {
      if (!audio.ended) setIsPlaying(false);
    };
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    if (isPlayingRef.current) {
      audio.play().catch(() => {});
    }

    try {
      localStorage.setItem("sakura-track-index", String(currentIndex));
    } catch {}

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, [currentIndex, track.file, audio]);

  return {
    audio,
    track,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    currentIndex,
    totalTracks: playlist.length,
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
  };
}
