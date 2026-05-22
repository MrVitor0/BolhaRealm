type WaitlistBody = {
  nickname?: string;
  discord?: string;
  playstyle?: string;
  reason?: string;
};

type WaitlistEntry = {
  id: string;
  nickname: string;
  discord: string;
  playstyle: string;
  reason: string;
  createdAt: string;
};

const storageKey = "bolha-realm:waitlist";

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

export default defineEventHandler(async (event) => {
  const body = await readBody<WaitlistBody>(event);
  const nickname = cleanText(body.nickname, 32);
  const discord = cleanText(body.discord, 48);
  const playstyle = cleanText(body.playstyle, 48) || "Faz tudo um pouco";
  const reason = cleanText(body.reason, 480);

  if (nickname.length < 3 || discord.length < 2 || reason.length < 12) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Preencha nick, Discord e um motivo com pelo menos 12 caracteres.",
    });
  }

  const storage = useStorage("data");
  const entries = (await storage.getItem<WaitlistEntry[]>(storageKey)) ?? [];
  const now = new Date().toISOString();
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  const entry: WaitlistEntry = {
    id,
    nickname,
    discord,
    playstyle,
    reason,
    createdAt: now,
  };

  await storage.setItem(storageKey, [entry, ...entries].slice(0, 500));

  return {
    ok: true,
    entry: {
      id: entry.id,
      nickname: entry.nickname,
      createdAt: entry.createdAt,
    },
  };
});
