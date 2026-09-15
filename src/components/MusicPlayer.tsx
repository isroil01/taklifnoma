"use client";

import { useEffect, useRef, useState } from "react";
import { wedding, type Dict } from "@/content/wedding";
import styles from "./MusicPlayer.module.css";

// Events that count as a user gesture, which browsers require before playing sound.
const GESTURES = ["pointerup", "touchend", "keydown"] as const;
const FADE_MS = 1500;

export function MusicPlayer({ t }: { t: Dict }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pausedByGuest = useRef(false);
  const resumeOnReturn = useRef(false);
  const fadeTimer = useRef<number | undefined>(undefined);
  const [playing, setPlaying] = useState(false);

  // The first tap anywhere on the page starts the music.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function detach() {
      GESTURES.forEach((type) => window.removeEventListener(type, onGesture));
    }
    function onGesture(event: Event) {
      if (buttonRef.current?.contains(event.target as Node)) return;
      if (pausedByGuest.current) return detach();
      // A scroll's touchend is not a real gesture and gets rejected, so keep listening until play succeeds.
      audio!.play().then(detach, () => {});
    }

    GESTURES.forEach((type) => window.addEventListener(type, onGesture, { passive: true }));
    return detach;
  }, []);

  // Pause while the guest is in another app or tab, resume when they come back.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function onVisibilityChange() {
      if (document.hidden) {
        resumeOnReturn.current = !audio!.paused;
        audio!.pause();
      } else if (resumeOnReturn.current) {
        audio!.play().catch(() => {});
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => () => window.clearInterval(fadeTimer.current), []);

  // A timer rather than requestAnimationFrame: rAF stops when the page is not painted,
  // which would leave the song stuck at volume 0.
  function fadeIn() {
    const audio = audioRef.current;
    if (!audio) return;
    window.clearInterval(fadeTimer.current);
    const startedAt = Date.now();
    audio.volume = 0;
    fadeTimer.current = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - startedAt) / FADE_MS);
      audio.volume = wedding.music.volume * progress;
      if (progress === 1 || audio.paused) window.clearInterval(fadeTimer.current);
    }, 50);
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      pausedByGuest.current = false;
      audio.play().catch(() => {});
    } else {
      pausedByGuest.current = true;
      audio.pause();
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.music.src}
        loop
        preload="none"
        onPlay={() => {
          setPlaying(true);
          fadeIn();
        }}
        onPause={() => setPlaying(false)}
      />
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.button} ${playing ? styles.playing : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? t.musicOff : t.musicOn}
      >
        <span className={styles.disc} aria-hidden="true" />
        {playing ? (
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18V5l11-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="17" cy="16" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}
