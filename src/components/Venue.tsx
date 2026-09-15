import { wedding, type Dict, type Lang } from "@/content/wedding";
import { PinIcon } from "./art";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./Venue.module.css";

export function Venue({ t, lang }: { t: Dict; lang: Lang }) {
  const { venue } = wedding;

  return (
    <section className={`${shared.section} ${styles.venue}`}>
      <Reveal>
        <h2 className={shared.caps}>{t.venueTitle}</h2>
      </Reveal>

      <Reveal delay={120} className={styles.card}>
        <PinIcon className={styles.pin} />
        <p className={`${shared.script} ${styles.name}`}>{venue.name[lang]}</p>
        {venue.address[lang] && <p className={shared.text}>{venue.address[lang]}</p>}
        <div className={styles.actions}>
          <a className={`${styles.button} ${styles.solid}`} href={venue.yandexMaps} target="_blank" rel="noopener noreferrer">
            {t.openYandex}
          </a>
          <a className={styles.button} href={venue.googleMaps} target="_blank" rel="noopener noreferrer">
            {t.openGoogle}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
