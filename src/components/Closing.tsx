import { wedding, type Dict } from "@/content/wedding";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./Closing.module.css";

export function Closing({ t }: { t: Dict }) {
  const { groom, bride } = wedding.couple;
  const [year, month, day] = wedding.date.slice(0, 10).split("-");

  return (
    <footer className={styles.closing}>
      <div className={styles.fringe} aria-hidden="true" />
      <Reveal>
        <p className={`${shared.script} ${styles.title}`}>{t.closingTitle}</p>
        <p className={`${shared.eyebrow} ${styles.names}`}>
          {groom} &amp; {bride}
        </p>
        <p className={styles.date}>
          {day} · {month} · {year}
        </p>
      </Reveal>
    </footer>
  );
}
