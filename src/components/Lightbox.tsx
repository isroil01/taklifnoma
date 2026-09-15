"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Dict } from "@/content/wedding";
import styles from "./Lightbox.module.css";

type Props = {
  photos: string[];
  index: number | null;
  onIndex: (index: number | null) => void;
  t: Dict;
};

export function Lightbox({ photos, index, onIndex, t }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      onIndex((index + step + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onIndex(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go, onIndex]);

  if (index === null) return null;

  // Portaled to <body>: the page column uses container queries, which would trap a fixed overlay.
  return createPortal(
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={t.galleryLabel}
      onClick={() => onIndex(null)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start === null) return;
        const dx = event.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className={`${styles.button} ${styles.close}`}
        onClick={() => onIndex(null)}
        aria-label={t.close}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <figure className={styles.figure} onClick={(event) => event.stopPropagation()}>
        <div className={styles.frame}>
          <Image
            key={photos[index]}
            src={photos[index]}
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, 540px"
            className={styles.img}
          />
        </div>
        <figcaption className={styles.counter}>
          {index + 1} / {photos.length}
        </figcaption>
      </figure>

      <button
        type="button"
        className={`${styles.button} ${styles.nav} ${styles.prev}`}
        onClick={(event) => {
          event.stopPropagation();
          go(-1);
        }}
        aria-label={t.prev}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.nav} ${styles.next}`}
        onClick={(event) => {
          event.stopPropagation();
          go(1);
        }}
        aria-label={t.next}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
