import { wedding, type Lang } from "@/content/wedding";

export const GUEST_NAME_MAX = 60;

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | null | undefined) =>
  Array.isArray(value) ? value[0] : (value ?? undefined);

export function cleanGuestName(value: string | string[] | null | undefined) {
  return (first(value) ?? "").replace(/\s+/g, " ").trim().slice(0, GUEST_NAME_MAX);
}

export function parseLang(value: string | string[] | null | undefined): Lang {
  const lang = first(value);
  return lang === "ru" || lang === "uz" ? lang : wedding.defaultLang;
}

/** `?to=` personalises the invitation for one guest, `?lang=` picks its language. */
export function readInvitationParams(params: SearchParams) {
  return { guest: cleanGuestName(params.to), lang: parseLang(params.lang) };
}

export function invitationQuery(guest: string, lang: Lang) {
  const parts = [`lang=${lang}`];
  if (guest) parts.unshift(`to=${encodeURIComponent(guest)}`);
  return parts.join("&");
}
