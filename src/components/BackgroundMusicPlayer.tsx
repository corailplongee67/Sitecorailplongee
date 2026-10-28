"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { usePathname } from "next/navigation";

const PAUSED_KEY = "corail-background-music-paused";

export function BackgroundMusicPlayer({ src, volume }: { src: string; volume: number }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = Math.max(0, Math.min(1, volume));
  }, [volume, isAdmin]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isAdmin || window.localStorage.getItem(PAUSED_KEY) === "1") return;

    let cancelled = false;
    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
    };
    const play = async () => {
      try {
        await audio.play();
        if (!cancelled) removeUnlockListeners();
      } catch {
        // Browsers can require a user gesture before allowing audible playback.
      }
    };
    const unlock = (event: Event) => {
      if (window.localStorage.getItem(PAUSED_KEY) === "1") return;
      if (event.target instanceof Element && event.target.closest(".background-music-player")) return;
      void play();
    };

    window.addEventListener("pointerdown", unlock, true);
    window.addEventListener("keydown", unlock, true);
    void play();

    return () => {
      cancelled = true;
      removeUnlockListeners();
    };
  }, [src, isAdmin]);

  if (isAdmin) return null;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        window.localStorage.removeItem(PAUSED_KEY);
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      window.localStorage.setItem(PAUSED_KEY, "1");
      setIsPlaying(false);
    }
  }

  return (
    <div className="background-music-player">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={() => void togglePlayback()}
        aria-label={isPlaying ? "Mettre la musique en pause" : "Reprendre la musique"}
        title={isPlaying ? "Mettre la musique en pause" : "Reprendre la musique"}
      >
        <Music2 className="background-music-note" />
        {isPlaying ? <Pause className="background-music-state" /> : <Play className="background-music-state" />}
      </button>
    </div>
  );
}
