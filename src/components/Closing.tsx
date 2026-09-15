import { wedding, type Dict } from "@/content/wedding";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./Closing.module.css";

export function Closing({ t, showMusicCredit }: { t: Dict; showMusicCredit: boolean }) {
  const { groom, bride } = wedding.couple;
  const [year, month, day] = wedding.date.slice(0, 10).split("-");
  const credit = showMusicCredit ? wedding.music.credit : null;

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

      {credit && (
        <p className={styles.credit}>
          Music:{" "}
          <a href={credit.source} target="_blank" rel="noopener noreferrer">
            {credit.title}
          </a>{" "}
          —{" "}
          <a href={credit.authorUrl} target="_blank" rel="noopener noreferrer">
            {credit.author}
          </a>
          ,{" "}
          <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
            {credit.license}
          </a>
          , fades added and compressed
        </p>
      )}
    </footer>
  );
}
