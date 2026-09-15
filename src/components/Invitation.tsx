"use client";

import { useEffect } from "react";
import { ui } from "@/content/wedding";
import { useLang } from "@/lib/lang";
import { Closing } from "./Closing";
import { Cover } from "./Cover";
import { DateSection } from "./DateSection";
import { DressCode } from "./DressCode";
import { Greeting } from "./Greeting";
import { LangSwitch } from "./LangSwitch";
import { PhotoBooth } from "./PhotoBooth";
import { Program } from "./Program";
import { Rsvp } from "./Rsvp";
import { Venue } from "./Venue";
import styles from "./Invitation.module.css";

export function Invitation() {
  const lang = useLang();
  const t = ui[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <LangSwitch lang={lang} />
      <main className={styles.shell}>
        <Cover t={t} />
        <PhotoBooth t={t} />
        <Greeting t={t} />
        <DateSection t={t} />
        <Program t={t} lang={lang} />
        <Venue t={t} lang={lang} />
        <DressCode t={t} lang={lang} />
        <Rsvp t={t} lang={lang} />
        <Closing t={t} />
      </main>
    </>
  );
}
