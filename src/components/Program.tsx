import { wedding, type Dict, type Lang } from "@/content/wedding";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./Program.module.css";

export function Program({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <section className={shared.section}>
      <Reveal>
        <h2 className={shared.script}>{t.programTitle}</h2>
      </Reveal>

      <ol className={styles.list}>
        {wedding.program.map((item, i) => (
          <li key={item.time}>
            <Reveal delay={i * 90} className={styles.item}>
              <span className={styles.time}>{item.time}</span>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>
                {item.title[lang]}
                {item.note && <span className={styles.note}>{item.note[lang]}</span>}
              </span>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
