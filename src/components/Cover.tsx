import Image from "next/image";
import type { CSSProperties } from "react";
import { wedding, type Dict } from "@/content/wedding";
import shared from "./shared.module.css";
import styles from "./Cover.module.css";

const SPARKLES = [
  { top: "16%", left: "12%", delay: "0s", scale: 1 },
  { top: "28%", left: "88%", delay: "1.2s", scale: 0.8 },
  { top: "60%", left: "7%", delay: "2.1s", scale: 0.7 },
  { top: "72%", left: "91%", delay: "0.6s", scale: 1 },
  { top: "44%", left: "70%", delay: "1.8s", scale: 0.6 },
  { top: "9%", left: "64%", delay: "2.6s", scale: 0.9 },
  { top: "85%", left: "30%", delay: "3.1s", scale: 0.7 },
];

export function Cover({ t }: { t: Dict }) {
  const { groom, bride } = wedding.couple;
  const [year, month, day] = wedding.date.slice(0, 10).split("-");

  return (
    <header className={styles.cover}>
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className={styles.sparkle}
          style={{ top: s.top, left: s.left, animationDelay: s.delay, "--scale": s.scale } as CSSProperties}
          aria-hidden="true"
        />
      ))}

      <p className={`${shared.eyebrow} ${styles.eyebrow}`}>{t.coverEyebrow}</p>

      <figure className={styles.polaroid}>
        <div className={styles.photo}>
          <Image
            src={wedding.photos.cover}
            alt={`${groom} & ${bride}`}
            fill
            preload
            sizes="(max-width: 440px) 62vw, 272px"
            className={styles.img}
          />
        </div>
        <figcaption className={styles.names}>
          {groom}
          <span className={styles.amp}>&amp;</span>
          {bride}
        </figcaption>
      </figure>

      <p className={styles.date}>
        {day} · {month} · {year}
      </p>

      <div className={styles.fringe} aria-hidden="true" />
    </header>
  );
}
