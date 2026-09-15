"use client";

import type { Lang } from "@/content/wedding";
import { setLang } from "@/lib/lang";
import styles from "./LangSwitch.module.css";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "ru", label: "RU" },
  { value: "uz", label: "UZ" },
];

export function LangSwitch({ lang }: { lang: Lang }) {
  return (
    <div className={styles.switch} role="group" aria-label="Language">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={styles.option}
          aria-pressed={lang === option.value}
          onClick={() => setLang(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
