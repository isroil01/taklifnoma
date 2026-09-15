import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { Invitation } from "@/components/Invitation";
import { longDate, ui, wedding } from "@/content/wedding";
import { invitationQuery, readInvitationParams } from "@/lib/guest";

// Personal links (`?to=Aziz aka`) get their own title and preview image in Telegram.
export async function generateMetadata({ searchParams }: PageProps<"/">): Promise<Metadata> {
  const { guest, lang } = readInvitationParams(await searchParams);
  const t = ui[lang];
  const { groom, bride } = wedding.couple;

  const title = guest
    ? t.ogPersonalTitle.replace("{guest}", guest)
    : `${groom} & ${bride} — ${t.ogTitle}`;
  const description = `${longDate(lang)} · ${wedding.venue.name[lang]}`;
  const image = { url: `/og?${invitationQuery(guest, lang)}`, width: 1200, height: 630, alt: `${groom} & ${bride}` };

  return {
    title,
    description,
    openGraph: { title, description, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function Home({ searchParams }: PageProps<"/">) {
  const { guest, lang } = readInvitationParams(await searchParams);
  // The music button only shows once the song file is actually in /public.
  const hasMusic = existsSync(join(process.cwd(), "public", wedding.music.src));

  return <Invitation hasMusic={hasMusic} guest={guest} initialLang={lang} />;
}
