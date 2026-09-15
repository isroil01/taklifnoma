"use client";

import { useEffect } from "react";
import { ui, type Lang } from "@/content/wedding";
import { useLang } from "@/lib/lang";
import { Closing } from "./Closing";
import { Cover } from "./Cover";
import { DateSection } from "./DateSection";
import { EnvelopeIntro } from "./EnvelopeIntro";
import { Greeting } from "./Greeting";
import { LangSwitch } from "./LangSwitch";
import { MusicPlayer } from "./MusicPlayer";
import { Program } from "./Program";
import { Rsvp } from "./Rsvp";
import { Venue } from "./Venue";
import styles from "./Invitation.module.css";

type Props = {
  hasMusic: boolean;
  guest: string;
  initialLang: Lang;
};

export function Invitation({ hasMusic, guest, initialLang }: Props) {
  const lang = useLang(initialLang);
  const t = ui[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <EnvelopeIntro t={t} guest={guest} />
      <LangSwitch lang={lang} />
      {hasMusic && <MusicPlayer t={t} />}
      <main className={styles.shell}>
        <Cover t={t} />
        <Greeting t={t} guest={guest} />
        <DateSection t={t} />
        <Program t={t} lang={lang} />
        <Venue t={t} lang={lang} />
        <Rsvp t={t} lang={lang} guest={guest} />
        <Closing t={t} showMusicCredit={hasMusic} />
      </main>
    </>
  );
}
