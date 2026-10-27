"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { usePathname } from "next/navigation";

const PAUSED_KEY = "corail-background-music-paused";

export function BackgroundMusicPlayer({ src, volume }: { src: string; volume: number }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = Math.max(0, Math.min(1, volume));
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || window.localStorage.getItem(PAUSED_KEY) === "1") return;

    let cancelled = false;
    const play = async () => {
      try {
        await audio.play();
        if (!cancelled) setIsPlaying(true);
        return true;
      } catch {
        return false;
      }
    };
    const unlock = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".background-music-player")) return;
      void play();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    void play().then((started) => {
      if (!started && !cancelled) {
        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });
      }
    });

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [src]);

  if (pathname.startsWith("/admin")) return null;

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
        preload="auto"
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
