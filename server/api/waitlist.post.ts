import { adminDb } from "~/server/utils/firebase-admin";

const ALLOWED_PLAYSTYLES = new Set([
  "Treinador Cobblemon",
  "Builder",
  "Engenheiro do Create",
  "Explorador de dimensões",
  "Tech / automacao",
]);

const NICKNAME_RE = /^[A-Za-z0-9_]{3,16}$/;
const TWITTER_RE = /^[A-Za-z0-9_]{1,15}$/;

type WaitlistBody = {
  nickname?: string;
  twitter?: string;
  playstyle?: string;
  reason?: string;
};

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

export default defineEventHandler(async (event) => {
  const body = await readBody<WaitlistBody>(event);
  const nickname = cleanText(body.nickname, 16);
  const twitter = cleanText(body.twitter, 16).replace(/^@+/, "");
  const playstyle = cleanText(body.playstyle, 64);
  const reason = cleanText(body.reason, 480);

  const errors: string[] = [];

  if (!NICKNAME_RE.test(nickname))
    errors.push("Nick inválido (3–16 caracteres, apenas letras, números e _).");

  if (!TWITTER_RE.test(twitter))
    errors.push(
      "Handle do Twitter/X inválido (máx 15 caracteres, apenas letras, números e _).",
    );

  if (!ALLOWED_PLAYSTYLES.has(playstyle))
    errors.push("Estilo de jogo inválido.");

  if (reason.length < 12)
    errors.push("Motivo muito curto (mínimo 12 caracteres).");

  if (errors.length > 0) {
    throw createError({ statusCode: 400, statusMessage: errors[0] });
  }

  const db = adminDb();
  const createdAt = new Date().toISOString();

  try {
    const docRef = await db.collection("waitlist").add({
      nickname,
      twitter,
      playstyle,
      reason,
      createdAt,
    });

    return {
      ok: true,
      entry: {
        id: docRef.id,
        nickname,
        createdAt,
      },
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Não foi possível salvar o pedido. Tenta de novo em breve.",
    });
  }
});
