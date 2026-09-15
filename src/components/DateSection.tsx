"use client";

import { useSyncExternalStore } from "react";
import { wedding, type Dict } from "@/content/wedding";
import { Heart } from "./art";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./DateSection.module.css";

const [YEAR, MONTH, DAY] = wedding.date.slice(0, 10).split("-").map(Number);
const START_TIME = wedding.date.slice(11, 16);
const TARGET_SECONDS = Math.floor(Date.parse(wedding.date) / 1000);

// Calendar math in UTC so the guest's own time zone never shifts the day.
const mondayIndex = (y: number, m: number, d: number) => (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7;
const WEEKDAY = mondayIndex(YEAR, MONTH, DAY);
const LEADING_BLANKS = mondayIndex(YEAR, MONTH, 1);
const DAYS_IN_MONTH = new Date(Date.UTC(YEAR, MONTH, 0)).getUTCDate();

function subscribeToClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

const nowSeconds = () => Math.floor(Date.now() / 1000);

export function DateSection({ t }: { t: Dict }) {
  // null on the server, so the countdown never causes a hydration mismatch.
  const now = useSyncExternalStore(subscribeToClock, nowSeconds, () => null);

  const left = now === null ? null : Math.max(0, TARGET_SECONDS - now);
  const parts =
    left === null
      ? ["--", "--", "--", "--"]
      : [
          Math.floor(left / 86400),
          Math.floor((left % 86400) / 3600),
          Math.floor((left % 3600) / 60),
          left % 60,
        ].map((n, i) => (i === 0 ? String(n) : String(n).padStart(2, "0")));

  const cells: (number | null)[] = [
    ...Array<null>(LEADING_BLANKS).fill(null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];

  return (
    <section className={`${shared.section} ${styles.dateSection}`}>
      <Reveal>
        <h2 className={shared.caps}>{t.dateTitle}</h2>
        <div className={styles.dateRow}>
          <span className={styles.side}>{t.weekdays[WEEKDAY]}</span>
          <span className={styles.day}>{DAY}</span>
          <span className={styles.side}>
            {t.months[MONTH - 1]} {YEAR}
          </span>
        </div>
        <p className={styles.time}>
          {t.startsAt} {START_TIME}
        </p>
      </Reveal>

      <Reveal delay={120} className={styles.calendar}>
        <p className={`${shared.script} ${styles.monthTitle}`}>{t.months[MONTH - 1]}</p>
        <div className={styles.grid}>
          {t.weekdaysShort.map((wd) => (
            <span key={wd} className={styles.weekday}>
              {wd}
            </span>
          ))}
          {cells.map((d, i) => (
            <span key={i} className={`${styles.cell} ${d === DAY ? styles.marked : ""}`}>
              {d === DAY && <Heart className={styles.heart} />}
              <span className={styles.cellNumber}>{d ?? ""}</span>
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <p className={`${shared.eyebrow} ${styles.countdownTitle}`}>
          {left === 0 ? t.arrived : t.countdownTitle}
        </p>
        <div className={styles.countdown} aria-live="off">
          {parts.map((value, i) => (
            <div key={t.units[i]} className={styles.unit}>
              <span className={styles.number}>{value}</span>
              <span className={styles.label}>{t.units[i]}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
