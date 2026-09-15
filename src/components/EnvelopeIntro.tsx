"use client";

import { useEffect, useState } from "react";
import { wedding, type Dict } from "@/content/wedding";
import { WaxSeal } from "./art";
import styles from "./EnvelopeIntro.module.css";

type Stage = "closed" | "opening" | "leaving" | "done";

// Seal breaks, flap opens, letter rises (CSS), then the whole scene fades into the page.
const OPENING_MS = 2400;
const LEAVING_MS = 900;

export function EnvelopeIntro({ t, guest }: { t: Dict; guest: string }) {
  const [stage, setStage] = useState<Stage>("closed");
  const isDone = stage === "done";
  const { groom, bride } = wedding.couple;
  const [year, month, day] = wedding.date.slice(0, 10).split("-");

  // No scrolling the page underneath while the envelope is on screen.
  useEffect(() => {
    if (isDone) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isDone]);

  useEffect(() => {
    if (stage === "opening") {
      const id = window.setTimeout(() => setStage("leaving"), OPENING_MS);
      return () => window.clearTimeout(id);
    }
    if (stage === "leaving") {
      // Lets the cover start its entrance animation as the envelope fades away.
      document.documentElement.dataset.opened = "true";
      const id = window.setTimeout(() => setStage("done"), LEAVING_MS);
      return () => window.clearTimeout(id);
    }
  }, [stage]);

  function open() {
    if (stage !== "closed") return;
    window.scrollTo(0, 0);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStage(reduceMotion ? "leaving" : "opening");
  }

  if (isDone) return null;

  return (
    <div className={styles.overlay} data-stage={stage}>
      <div className={styles.top}>
        <p className={styles.eyebrow}>{guest ? t.personalEyebrow : t.introEyebrow}</p>
        {guest && <p className={styles.guest}>{guest}</p>}
      </div>

      <button
        type="button"
        className={styles.stage}
        onClick={open}
        disabled={stage !== "closed"}
        aria-label={t.openInvitation}
      >
        <span className={styles.envelope}>
          <span className={styles.liner} />
          <span className={styles.letter}>
            <span className={styles.letterEyebrow}>{t.introEyebrow}</span>
            <span className={styles.letterNames}>
              {groom}
              <span className={styles.amp}>&amp;</span>
              {bride}
            </span>
            <span className={styles.letterDate}>
              {day} · {month} · {year}
            </span>
          </span>
          <span className={styles.pocket} />
          <span className={styles.flap} />
          <WaxSeal className={styles.seal} monogram={`${groom[0]}&${bride[0]}`} />
        </span>
      </button>

      <p className={styles.hint}>{t.introTap}</p>
    </div>
  );
}
