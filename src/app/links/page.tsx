import type { Metadata } from "next";
import { LinkGenerator } from "@/components/LinkGenerator";

export const metadata: Metadata = {
  title: "Guest links",
  robots: { index: false, follow: false },
};

export default function LinksPage() {
  return <LinkGenerator />;
}
