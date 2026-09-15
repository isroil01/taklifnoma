import { useSyncExternalStore } from "react";
import { wedding, type Lang } from "@/content/wedding";

const STORAGE_KEY = "invite-lang";
const listeners = new Set<() => void>();
let current: Lang | null = null;

function isLang(value: unknown): value is Lang {
  return value === "ru" || value === "uz";
}

// `?lang=uz` in a shared link wins over whatever the guest picked last time.
function read(): Lang {
  if (current) return current;
  let stored: string | null = null;
  try {
    stored =
      new URLSearchParams(window.location.search).get("lang") ??
      window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private mode or blocked storage: fall back to the default.
  }
  current = isLang(stored) ? stored : wedding.defaultLang;
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setLang(lang: Lang) {
  current = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Ignore: the choice still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

/** `serverLang` is what the server rendered (from `?lang=`), so hydration matches. */
export function useLang(serverLang: Lang = wedding.defaultLang): Lang {
  return useSyncExternalStore(subscribe, read, () => serverLang);
}
