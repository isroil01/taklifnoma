import { existsSync } from "node:fs";
import { join } from "node:path";
import { Invitation } from "@/components/Invitation";
import { wedding } from "@/content/wedding";

export default function Home() {
  // The music button only shows once the song file is actually in /public.
  const hasMusic = existsSync(join(process.cwd(), "public", wedding.music.src));

  return <Invitation hasMusic={hasMusic} />;
}
