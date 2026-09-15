"use client";

import { useState, type FormEvent } from "react";
import type { Dict, Lang } from "@/content/wedding";
import { Reveal } from "./Reveal";
import shared from "./shared.module.css";
import styles from "./Rsvp.module.css";

type Status = "idle" | "sending" | "done" | "error";

const MAX_GUESTS = 10;

export function Rsvp({ t, lang, guest }: { t: Dict; lang: Lang; guest: string }) {
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          message: form.get("message"),
          website: form.get("website"),
          attending,
          guests,
          lang,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className={`${shared.section} ${styles.rsvp}`}>
      <Reveal>
        <h2 className={shared.caps}>{t.rsvpTitle}</h2>
        <p className={`${shared.text} ${styles.intro}`}>{t.rsvpText}</p>
      </Reveal>

      <Reveal delay={120}>
        {status === "done" ? (
          <div className={styles.thanks} role="status">
            <p className={shared.script}>{t.thanksTitle}</p>
            <p className={shared.text}>{attending ? t.thanksYes : t.thanksNo}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="rsvp-name">
                {t.nameLabel}
              </label>
              <input
                id="rsvp-name"
                name="name"
                className={styles.input}
                defaultValue={guest}
                placeholder={t.namePlaceholder}
                autoComplete="name"
                maxLength={80}
                required
              />
            </div>

            <fieldset className={styles.field}>
              <legend className={styles.label}>{t.attendLabel}</legend>
              <div className={styles.choices}>
                {[
                  { value: true, text: t.yes },
                  { value: false, text: t.no },
                ].map((option) => (
                  <label key={String(option.value)} className={styles.choice}>
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === option.value}
                      onChange={() => setAttending(option.value)}
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {attending && (
              <div className={styles.field}>
                <span className={styles.label} id="rsvp-guests">
                  {t.guestsLabel}
                </span>
                <div className={styles.stepper} role="group" aria-labelledby="rsvp-guests">
                  <button
                    type="button"
                    className={styles.stepButton}
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    aria-label={t.decrease}
                  >
                    −
                  </button>
                  <output className={styles.count} aria-live="polite">
                    {guests}
                  </output>
                  <button
                    type="button"
                    className={styles.stepButton}
                    onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                    disabled={guests >= MAX_GUESTS}
                    aria-label={t.increase}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="rsvp-message">
                {t.messageLabel}
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                className={`${styles.input} ${styles.textarea}`}
                placeholder={t.messagePlaceholder}
                maxLength={500}
                rows={3}
              />
            </div>

            <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {status === "error" && (
              <p className={styles.error} role="alert">
                {t.error}
              </p>
            )}

            <button type="submit" className={styles.submit} disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.submit}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
