"use client";

import Image from "next/image";
import { useState } from "react";
import { wedding, type Dict } from "@/content/wedding";
import { PlaqueArt } from "./art";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./PhotoBooth.module.css";

export function PhotoBooth({ t }: { t: Dict }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${shared.section} ${styles.booth}`}>
      <Reveal>
        <h2 className={shared.caps}>{t.boothTitle}</h2>
      </Reveal>

      <Reveal delay={150}>
        <button
          type="button"
          className={styles.plaque}
          onClick={() => setOpenIndex(0)}
          aria-label={t.galleryLabel}
        >
          <PlaqueArt className={styles.plaqueArt} />
          <span className={styles.strip}>
            {wedding.photos.booth.map((src) => (
              <span key={src} className={styles.frame}>
                <Image src={src} alt="" fill sizes="120px" className={styles.img} />
              </span>
            ))}
          </span>
          <span className={styles.rail} aria-hidden="true" />
          <span className={styles.pin} aria-hidden="true" />
        </button>
      </Reveal>

      <Reveal delay={300}>
        <p className={`${shared.script} ${styles.hint}`}>{t.boothHint}</p>
      </Reveal>

      <Lightbox photos={wedding.gallery} index={openIndex} onIndex={setOpenIndex} t={t} />
    </section>
  );
}
