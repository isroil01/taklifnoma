import { wedding, type Dict, type Lang } from "@/content/wedding";
import { Flower, Satin } from "./art";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./DressCode.module.css";

export function DressCode({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <section className={`${shared.section} ${styles.dress}`}>
      <Reveal>
        <div className={styles.head}>
          <h2 className={`${shared.script} ${styles.title}`}>{t.dressTitle}</h2>
          <Flower className={styles.flower} />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <Satin className={styles.satin} />
      </Reveal>

      <Reveal delay={200}>
        <p className={shared.text}>{t.dressText}</p>
        <ul className={styles.palette}>
          {wedding.palette.map((swatch) => (
            <li key={swatch.color} className={styles.swatch}>
              <span className={styles.chip} style={{ background: swatch.color }} />
              {swatch.name[lang]}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
