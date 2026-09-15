type RsvpEntry = {
  name: string;
  attending: boolean;
  guests: number;
  message: string;
  lang: string;
};

function parse(body: unknown): RsvpEntry | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  const name = typeof data.name === "string" ? data.name.trim().slice(0, 80) : "";
  if (!name || typeof data.attending !== "boolean") return null;

  const guests = Number(data.guests);
  return {
    name,
    attending: data.attending,
    guests: data.attending && Number.isInteger(guests) ? Math.min(Math.max(guests, 1), 10) : 0,
    message: typeof data.message === "string" ? data.message.trim().slice(0, 500) : "",
    lang: data.lang === "uz" ? "uz" : "ru",
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: bots fill every field, people never see this one.
  if ((body as Record<string, unknown> | null)?.website) {
    return Response.json({ ok: true });
  }

  const entry = parse(body);
  if (!entry) {
    return Response.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const text = [
    entry.attending ? "✅ Придёт" : "❌ Не сможет прийти",
    `Имя: ${entry.name}`,
    entry.attending ? `Гостей: ${entry.guests}` : null,
    entry.message ? `Пожелание: ${entry.message}` : null,
    `Язык: ${entry.lang}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.info("[rsvp] Telegram is not configured, entry:\n" + text);
    return Response.json({ ok: true });
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    console.error("[rsvp] Telegram responded", res.status, await res.text());
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
