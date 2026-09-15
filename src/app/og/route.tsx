import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { ImageResponse } from "next/og";
import { longDate, ui, wedding } from "@/content/wedding";
import { cleanGuestName, parseLang } from "@/lib/guest";

/*
 * Preview card shown when the invitation link is shared (Telegram, WhatsApp…).
 * `/og?to=Aziz%20aka&lang=uz` renders a personal card for that guest.
 */

type Font = { name: string; data: ArrayBuffer; weight: 400; style: "normal" };
type Assets = { photo: string | null; fonts: Font[] };

// Without a browser user agent Google Fonts serves TrueType, which is what ImageResponse can read.
async function loadGoogleFont(family: string, name: string): Promise<Font[]> {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}`).then((res) => res.text());
  const urls = [...css.matchAll(/url\((https:[^)]+)\) format\('(?:truetype|opentype)'\)/g)].map((m) => m[1]);
  const files = await Promise.all(urls.map((url) => fetch(url).then((res) => res.arrayBuffer())));
  return files.map((data) => ({ name, data, weight: 400, style: "normal" }));
}

async function loadPhoto() {
  const file = join(process.cwd(), "public", wedding.photos.cover);
  const mime = extname(file).toLowerCase() === ".png" ? "image/png" : "image/jpeg";
  const data = await readFile(file);
  return `data:${mime};base64,${data.toString("base64")}`;
}

let assets: Promise<Assets> | null = null;

function loadAssets() {
  assets ??= Promise.all([
    loadPhoto().catch(() => null),
    loadGoogleFont("Great+Vibes", "Script").catch(() => []),
    loadGoogleFont("Forum", "Display").catch(() => []),
  ]).then(([photo, script, display]) => {
    const fonts = [...script, ...display];
    // Don't cache a failed font download forever; try again on the next request.
    if (fonts.length === 0) assets = null;
    return { photo, fonts };
  });
  return assets;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const lang = parseLang(params.get("lang"));
  const guest = cleanGuestName(params.get("to"));
  const t = ui[lang];
  const { groom, bride } = wedding.couple;
  const { photo, fonts } = await loadAssets();

  const script = fonts.some((f) => f.name === "Script") ? "Script" : "serif";
  const display = fonts.some((f) => f.name === "Display") ? "Display" : "serif";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#2c040b" }}>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only
          <img src={photo} alt="" width={460} height={630} style={{ width: 460, height: 630, objectFit: "cover" }} />
        )}

        <div
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 48px",
            textAlign: "center",
            color: "#fbeef0",
            backgroundImage: "radial-gradient(circle at 50% 38%, #7a1829 0%, #4a0914 58%, #2c040b 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 26,
              left: 26,
              right: 26,
              bottom: 26,
              display: "flex",
              border: "1px solid rgba(244, 226, 196, 0.35)",
            }}
          />

          <div
            style={{
              display: "flex",
              fontFamily: display,
              fontSize: 24,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "rgba(243, 225, 228, 0.8)",
            }}
          >
            {guest ? t.personalEyebrow : t.introEyebrow}
          </div>

          {guest && (
            <div
              style={{
                display: "flex",
                maxWidth: 640,
                marginTop: 12,
                fontFamily: script,
                fontSize: 56,
                lineHeight: 1.15,
                color: "#f4e2c4",
              }}
            >
              {guest}
            </div>
          )}

          <div style={{ display: "flex", width: 120, height: 1, margin: "28px 0", background: "rgba(244, 226, 196, 0.5)" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: script,
              fontSize: guest ? 64 : 76,
              lineHeight: 1.1,
            }}
          >
            {groom}
            <span style={{ margin: "0 14px", fontSize: guest ? 44 : 52, color: "#e3a1ac" }}>&amp;</span>
            {bride}
          </div>

          <div style={{ display: "flex", marginTop: 26, fontFamily: display, fontSize: 30, letterSpacing: 3, color: "#f3e1e4" }}>
            {longDate(lang)}
          </div>
          <div style={{ display: "flex", marginTop: 10, fontFamily: display, fontSize: 24, color: "rgba(243, 225, 228, 0.7)" }}>
            {wedding.venue.name[lang]}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    },
  );
}
