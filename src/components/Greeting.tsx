import type { Dict } from "@/content/wedding";
import { Divider } from "./art";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./Greeting.module.css";

export function Greeting({ t }: { t: Dict }) {
  return (
    <section className={`${shared.section} ${styles.greeting}`}>
      <Reveal>
        <p className={shared.eyebrow}>{t.greetingEyebrow}</p>
        <h2 className={`${shared.script} ${styles.title}`}>{t.greetingTitle}</h2>
      </Reveal>
      <Reveal delay={120}>
        <p className={shared.text}>{t.greetingText}</p>
        <Divider className={shared.divider} />
        <p className={`${shared.text} ${styles.italic}`}>{t.greetingText2}</p>
      </Reveal>
    </section>
  );
}
