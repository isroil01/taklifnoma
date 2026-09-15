"use client";

import { useState, useSyncExternalStore } from "react";
import { ui, wedding, type Lang } from "@/content/wedding";
import { cleanGuestName, GUEST_NAME_MAX, invitationQuery } from "@/lib/guest";
import { useLang } from "@/lib/lang";
import { LangSwitch } from "./LangSwitch";
import styles from "./LinkGenerator.module.css";

const LANGS: Lang[] = ["ru", "uz"];
const noSubscribe = () => () => {};

/** Private helper page for the couple: one personal invitation link per guest. */
export function LinkGenerator() {
  const lang = useLang();
  const t = ui[lang];
  const origin = useSyncExternalStore(noSubscribe, () => window.location.origin, () => "");

  const [name, setName] = useState("");
  const [linkLang, setLinkLang] = useState<Lang>(wedding.defaultLang);
  const [copied, setCopied] = useState(false);

  const guest = cleanGuestName(name);
  const link = guest && origin ? `${origin}/?${invitationQuery(guest, linkLang)}` : "";
  const telegramUrl = link
    ? `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(ui[linkLang].shareText)}`
    : undefined;

  async function copy() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the link is still visible and selectable.
    }
  }

  return (
    <>
      <LangSwitch lang={lang} />
      <main className={styles.page}>
        <div className={styles.card}>
          <p className={styles.eyebrow}>
            {wedding.couple.groom} &amp; {wedding.couple.bride}
          </p>
          <h1 className={styles.title}>{t.linksTitle}</h1>
          <p className={styles.text}>{t.linksText}</p>

          <label className={styles.label} htmlFor="guest-name">
            {t.guestLabel}
          </label>
          <input
            id="guest-name"
            className={styles.input}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.guestPlaceholder}
            maxLength={GUEST_NAME_MAX}
            autoComplete="off"
          />

          <span className={styles.label} id="link-lang">
            {t.linkLang}
          </span>
          <div className={styles.segment} role="group" aria-labelledby="link-lang">
            {LANGS.map((option) => (
              <button
                key={option}
                type="button"
                className={styles.segmentButton}
                aria-pressed={linkLang === option}
                onClick={() => setLinkLang(option)}
              >
                {option === "ru" ? "Русский" : "O‘zbekcha"}
              </button>
            ))}
          </div>

          <output className={`${styles.result} ${link ? "" : styles.resultEmpty}`} aria-live="polite">
            {link || t.linkEmpty}
          </output>

          <div className={styles.actions}>
            <a
              className={`${styles.button} ${styles.solid}`}
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!link}
            >
              {t.sendTelegram}
            </a>
            <button type="button" className={styles.button} onClick={copy} disabled={!link}>
              {copied ? t.copied : t.copy}
            </button>
            <a
              className={styles.button}
              href={link || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!link}
            >
              {t.openLink}
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
