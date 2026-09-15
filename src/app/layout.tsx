import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Forum, Great_Vibes } from "next/font/google";
import { wedding } from "@/content/wedding";
import "./globals.css";

const script = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin", "cyrillic"],
});

const display = Forum({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin", "cyrillic"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
});

// Link previews (Telegram, WhatsApp) need absolute image URLs, so the site's public address must be known.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

const { groom, bride } = wedding.couple;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${groom} & ${bride}`,
  description: "Мы приглашаем вас разделить с нами самый счастливый день нашей жизни.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3d0711",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={wedding.defaultLang}
      className={`${script.variable} ${display.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
