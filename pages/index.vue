<script setup lang="ts">
import {
  ArrowRight,
  BadgeCheck,
  Castle,
  CheckCircle2,
  MessageSquareText,
  Pickaxe,
  ShieldCheck,
  Sparkles,
  Swords,
  TreePine,
  UsersRound,
} from "@lucide/vue";

const highlights = [
  {
    icon: Pickaxe,
    title: "Survival cooperativo",
    text: "Um mundo novo para buildar bases, farms, vilas e historias com a galera da Bolha Dev.",
  },
  {
    icon: Swords,
    title: "Eventos e desafios",
    text: "Boss rush, corridas, arenas, expedicoes no Nether e momentos pensados para virar clipe.",
  },
  {
    icon: ShieldCheck,
    title: "Whitelist curada",
    text: "A entrada passa por selecao para manter o servidor leve, criativo e bom de jogar em grupo.",
  },
  {
    icon: TreePine,
    title: "Vibe Minecraft raiz",
    text: "Visual de blocos, portal, tochas, pixel font e uma apresentacao feita para parecer dentro do jogo.",
  },
];

const stats = [
  { label: "Modo", value: "Survival+" },
  { label: "Entrada", value: "Whitelist" },
  { label: "Comunidade", value: "Bolha Dev" },
];

const steps = [
  "Recebemos os pedidos da lista de espera.",
  "Chamamos os perfis que combinam com a temporada.",
  "Liberamos a whitelist e o Discord do reino.",
];

const playstyles = [
  "Builder",
  "Redstone",
  "Explorador",
  "PvE",
  "Faz tudo um pouco",
];

const form = reactive({
  nickname: "",
  discord: "",
  playstyle: playstyles[0],
  reason: "",
});

const isSubmitting = ref(false);
const hasSubmitted = ref(false);
const statusMessage = ref("");

const canSubmit = computed(() => {
  return (
    form.nickname.trim().length >= 3 &&
    form.discord.trim().length >= 2 &&
    form.reason.trim().length >= 12
  );
});

async function joinWaitlist() {
  statusMessage.value = "";

  if (!canSubmit.value) {
    statusMessage.value =
      "Manda seu nick, Discord e um motivo com um pouco mais de contexto.";
    hasSubmitted.value = false;
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch<{ entry: { nickname: string } }>(
      "/api/waitlist",
      {
        method: "POST",
        body: {
          nickname: form.nickname,
          discord: form.discord,
          playstyle: form.playstyle,
          reason: form.reason,
        },
      },
    );

    hasSubmitted.value = true;
    statusMessage.value = `${response.entry.nickname}, seu pedido entrou na fila da Bolha Realm.`;
  } catch (error) {
    const fetchError = error as { data?: { statusMessage?: string } };
    hasSubmitted.value = false;
    statusMessage.value =
      fetchError.data?.statusMessage ??
      "Nao deu para enviar agora. Tenta de novo em alguns minutos.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <main
    data-theme="bolharealm"
    class="min-h-screen overflow-hidden bg-base-100 text-[#fff7dc]"
  >
    <section id="top" class="hero-scene flex min-h-[88svh] overflow-hidden">
      <div class="hero-vignette" />
      <div class="hero-grid" />

      <header
        class="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8"
      >
        <a href="#top" class="brand-mark text-sm uppercase md:text-base"
          >Bolha Realm</a
        >

        <nav
          class="hidden items-center gap-5 text-xs uppercase text-white/80 lg:flex"
        >
          <a class="transition hover:text-torch" href="#realm">O servidor</a>
          <a class="transition hover:text-torch" href="#temporada">Temporada</a>
          <a class="transition hover:text-torch" href="#waitlist">Lista</a>
        </nav>

        <a href="#waitlist" class="pixel-button pixel-button--small">
          Stay tuned
          <ArrowRight class="h-4 w-4" />
        </a>
      </header>

      <div
        class="relative z-10 mx-auto flex w-full max-w-7xl items-center px-5 pb-12 pt-28 md:px-8"
      >
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 650 } }"
          class="max-w-4xl"
        >
          <div class="status-chip mb-5 text-xs uppercase md:text-sm">
            <span class="status-dot" />
            Whitelist abrindo em breve
          </div>

          <h1 class="hero-title uppercase">Bolha Realm</h1>

          <p
            class="mt-6 max-w-2xl text-base leading-8 text-white/86 md:text-xl md:leading-9"
          >
            O servidor Minecraft da Bolha Dev: survival cooperativo, eventos com
            a galera e uma lista de espera para escolher quem entra nessa
            temporada.
          </p>

          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#waitlist" class="pixel-button">
              Entrar na lista
              <ArrowRight class="h-5 w-5" />
            </a>
            <a href="#realm" class="pixel-button pixel-button--stone"
              >Conhecer o realm</a
            >
          </div>

          <div class="mt-10 hidden grid-cols-3 gap-3 md:grid md:max-w-3xl">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="minecraft-panel px-4 py-4"
            >
              <p class="text-[0.68rem] uppercase text-torch">
                {{ stat.label }}
              </p>
              <p class="mt-2 text-lg uppercase text-white">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="realm" class="relative bg-[#17140f] px-5 py-20 md:px-8">
      <div
        class="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#2d8f25,#f5b642,#7b3ff2,#595f5b)]"
      />

      <div class="mx-auto max-w-7xl">
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 550 } }"
          class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p class="section-kicker text-sm">Servidor da Bolha Dev</p>
            <h2 class="section-title mt-4 uppercase">
              Um mundo para jogar junto
            </h2>
          </div>
          <p
            class="max-w-3xl text-sm leading-7 text-white/76 md:text-base md:leading-8"
          >
            A Bolha Realm nasce como um espaco de temporada: poucas vagas, gente
            escolhida com carinho, construcoes coletivas e aquele clima de
            entrar no mapa so para ver o que mudou desde ontem.
          </p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="highlight in highlights"
            :key="highlight.title"
            v-motion
            :initial="{ opacity: 0, y: 22 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 520 } }"
            class="stone-card min-h-[260px] p-5"
          >
            <div
              class="mb-6 inline-flex h-14 w-14 items-center justify-center border-4 border-[#1d201e] bg-[#2a2f2b] text-torch shadow-[inset_0_4px_0_rgba(255,255,255,0.12)]"
            >
              <component :is="highlight.icon" class="h-7 w-7" />
            </div>
            <h3 class="text-xl uppercase text-white">{{ highlight.title }}</h3>
            <p class="mt-4 text-sm leading-7 text-white/78">
              {{ highlight.text }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section
      id="temporada"
      class="relative overflow-hidden bg-[#21170f] px-5 py-20 md:px-8"
    >
      <div
        class="absolute right-0 top-0 h-full w-full bg-[linear-gradient(135deg,transparent_0%,rgba(123,63,242,0.2)_45%,transparent_72%)]"
      />

      <div
        class="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
        <div
          v-motion
          :initial="{ opacity: 0, x: -24 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 560 } }"
          class="dirt-card p-6 md:p-8"
        >
          <p class="section-kicker text-sm">Temporada 01</p>
          <h2 class="section-title mt-4 uppercase">
            Base, portal e caos organizado
          </h2>
          <p
            class="mt-6 max-w-3xl text-sm leading-7 text-white/78 md:text-base md:leading-8"
          >
            A ideia e ter um servidor com energia de serie: spawn bonito, nether
            hub, projetos coletivos, eventos pontuais e espaco para cada jogador
            deixar sua assinatura no mapa.
          </p>

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div class="pixel-badge text-xs uppercase">
              <Castle class="h-4 w-4 text-torch" />
              Spawn coletivo
            </div>
            <div class="pixel-badge text-xs uppercase">
              <Sparkles class="h-4 w-4 text-torch" />
              Momentos gravaveis
            </div>
            <div class="pixel-badge text-xs uppercase">
              <UsersRound class="h-4 w-4 text-torch" />
              Comunidade pequena
            </div>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: 24 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 560 } }"
          class="minecraft-panel p-6 md:p-8"
        >
          <p class="text-sm uppercase text-torch">Como a whitelist anda</p>
          <div class="mt-6 space-y-5">
            <div v-for="(step, index) in steps" :key="step" class="flex gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center border-4 border-[#0f2410] bg-grass text-white shadow-[inset_0_3px_0_rgba(255,255,255,0.2)]"
              >
                {{ index + 1 }}
              </div>
              <p class="pt-1 text-sm leading-7 text-white/80">{{ step }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="waitlist" class="relative bg-[#12100d] px-5 py-20 md:px-8">
      <div
        class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
      >
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 560 } }"
        >
          <p class="section-kicker text-sm">Lista de espera</p>
          <h2 class="section-title mt-4 uppercase">Quer entrar no reino?</h2>
          <p
            class="mt-6 max-w-2xl text-sm leading-7 text-white/76 md:text-base md:leading-8"
          >
            Manda seu nick, Discord e o tipo de jogador que voce quer ser nessa
            temporada. A gente vai chamar algumas pessoas para jogar com a Bolha
            Dev.
          </p>

          <div class="mt-8 space-y-4">
            <div class="pixel-badge text-xs uppercase">
              <BadgeCheck class="h-4 w-4 text-success" />
              Vagas liberadas em ondas
            </div>
            <div class="pixel-badge text-xs uppercase">
              <MessageSquareText class="h-4 w-4 text-info" />
              Convite pelo Discord
            </div>
            <div class="pixel-badge text-xs uppercase">
              <CheckCircle2 class="h-4 w-4 text-torch" />
              Selecao manual
            </div>
          </div>
        </div>

        <form
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 560 } }"
          class="minecraft-panel grid gap-5 p-5 md:grid-cols-2 md:p-7"
          @submit.prevent="joinWaitlist"
        >
          <label class="grid gap-2">
            <span class="text-xs uppercase text-torch">Nick no Minecraft</span>
            <input
              v-model="form.nickname"
              class="pixel-field input"
              minlength="3"
              name="nickname"
              placeholder="SteveDaBolha"
              required
              type="text"
            />
          </label>

          <label class="grid gap-2">
            <span class="text-xs uppercase text-torch">Discord</span>
            <input
              v-model="form.discord"
              class="pixel-field input"
              name="discord"
              placeholder="seunome"
              required
              type="text"
            />
          </label>

          <label class="grid gap-2 md:col-span-2">
            <span class="text-xs uppercase text-torch">Estilo de jogo</span>
            <select
              v-model="form.playstyle"
              class="pixel-field select"
              name="playstyle"
            >
              <option v-for="style in playstyles" :key="style" :value="style">
                {{ style }}
              </option>
            </select>
          </label>

          <label class="grid gap-2 md:col-span-2">
            <span class="text-xs uppercase text-torch"
              >Por que voce combina com o servidor?</span
            >
            <textarea
              v-model="form.reason"
              class="pixel-field textarea min-h-36 resize-y"
              minlength="12"
              name="reason"
              placeholder="Curto construir vila, ajudar em projeto coletivo e topar evento..."
              required
            />
          </label>

          <div
            class="grid gap-4 md:col-span-2 md:grid-cols-[1fr_auto] md:items-center"
          >
            <p
              v-if="statusMessage"
              class="text-sm leading-6"
              :class="hasSubmitted ? 'text-success' : 'text-error'"
            >
              {{ statusMessage }}
            </p>
            <p v-else class="text-sm leading-6 text-white/58">
              A whitelist e limitada para manter a temporada boa de acompanhar.
            </p>

            <button
              class="pixel-button pixel-button--portal"
              :disabled="isSubmitting"
              type="submit"
            >
              <span
                v-if="isSubmitting"
                class="loading loading-spinner loading-sm"
              />
              <span>{{
                hasSubmitted ? "Pedido enviado" : "Enviar pedido"
              }}</span>
              <ArrowRight v-if="!isSubmitting" class="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </section>

    <footer class="border-t-4 border-[#2a2117] bg-[#0d0a08] px-5 py-8 md:px-8">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 text-xs uppercase text-white/58 md:flex-row md:items-center md:justify-between"
      >
        <p>Bolha Realm - Servidor Minecraft da Bolha Dev</p>
        <a class="text-torch transition hover:text-white" href="#top"
          >Voltar ao topo</a
        >
      </div>
    </footer>
  </main>
</template>
