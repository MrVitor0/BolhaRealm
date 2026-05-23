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

const runtimeConfig = useRuntimeConfig();
const requestUrl = useRequestURL();

const siteName = runtimeConfig.public.siteName;
const seoTitle = "Bolha Realm | Servidor Minecraft da Bolha Dev";
const seoDescription =
  "Entre na lista de espera do Bolha Realm, o servidor da Bolha Dev com Cobblemon, Create, Aether, Twilight Forest, shaders e uma temporada feita para jogar em grupo.";
const seoKeywords =
  "Bolha Realm, Bolha Dev, servidor Minecraft, Cobblemon, Create modpack, Aether, Twilight Forest, NeoForge 1.21.1, whitelist Minecraft";
const canonicalUrl = computed(() => new URL("/", requestUrl.origin).toString());
const ogImageUrl = computed(() =>
  new URL("/assets/website-banner.png", requestUrl.origin).toString(),
);
const logoUrl = computed(() =>
  new URL("/assets/logo.png", requestUrl.origin).toString(),
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  keywords: seoKeywords,
  author: "Bolha Dev",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogType: "website",
  ogSiteName: siteName,
  ogLocale: "pt_BR",
  ogUrl: canonicalUrl,
  ogImage: ogImageUrl,
  ogImageAlt:
    "Banner oficial do Bolha Realm com a identidade visual do servidor.",
  twitterCard: "summary_large_image",
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: ogImageUrl,
  twitterImageAlt:
    "Banner oficial do Bolha Realm com a identidade visual do servidor.",
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl.value }],
  meta: [
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1902" },
    { property: "og:image:height", content: "856" },
    { name: "twitter:image:src", content: ogImageUrl.value },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: siteName,
            url: canonicalUrl.value,
            description: seoDescription,
            inLanguage: "pt-BR",
          },
          {
            "@type": "Organization",
            name: "Bolha Dev",
            url: canonicalUrl.value,
            logo: logoUrl.value,
            image: ogImageUrl.value,
            sameAs: [],
          },
        ],
      }),
    },
  ],
});

const highlights = [
  {
    icon: Swords,
    title: "Cobblemon no centro",
    text: "O mundo gira em torno de captura, time, progresso e exploração com Cobblemon, Cobblepedia e tweaks que deixam a jornada de treinador mais redonda.",
  },
  {
    icon: Pickaxe,
    title: "Create até o late game",
    text: "Do moinho improvisado ao sistema parrudo com Create, Aeronautics, Mekanism, AE2, Refined Storage e integrações para quem gosta de automação.",
  },
  {
    icon: TreePine,
    title: "Aventura além do Overworld",
    text: "Aether, Deep Aether, Twilight Forest, Dimensional Doors e Waystones puxam expedições que vão muito além do survival padrão.",
  },
  {
    icon: ShieldCheck,
    title: "Visual e QoL prontos",
    text: "Fresh Animations, Complementary shaders, Xaero minimap/world map, JEI e vários ajustes entram como parte da experiência do pack.",
  },
];

const modpackShowcase = [
  {
    eyebrow: "Captura e aventura",
    title: "Mapa para explorar de verdade",
    items: [
      "Cobblemon com addons e utilitários",
      "Aether + Deep Aether",
      "Twilight Forest e Dimensional Doors",
      "Waystones com Xaero minimap e world map",
    ],
  },
  {
    eyebrow: "Tech e progresso",
    title: "Do Create ao endgame",
    items: [
      "Create com Aeronautics e addons",
      "Mekanism completo + Generators",
      "Applied Energistics 2 e Refined Storage",
      "Extreme Reactors para segurar o tranco",
    ],
  },
  {
    eyebrow: "Visual e conforto",
    title: "Pack com cara propria",
    items: [
      "Fresh Animations + extensoes",
      "Complementary Reimagined e Unbound",
      "Armourer's Workshop e Artifacts",
      "JEI, Jade e QoL de interface",
    ],
  },
];

const stats = [
  { label: "Base", value: "NeoForge 1.21.1" },
  { label: "Stack", value: "Cobblemon + Create" },
  { label: "Exploração", value: "Aether + Twilight" },
];

const steps = [
  "Você entra na fila e conta se é treinador, builder, explorador ou engenheiro.",
  "Chamamos em ondas para manter o ritmo da temporada e o mapa saudável.",
  "Liberamos whitelist, launcher e Discord para quem encaixa na proposta.",
];

const playstyles = [
  "Treinador Cobblemon",
  "Builder",
  "Engenheiro do Create",
  "Explorador de dimensões",
  "Tech / automacao",
];

const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  const el = videoRef.value;
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      el.src = "/assets/hero-video.mp4";
      el.play().catch(() => {});
      observer.disconnect();
    },
    { rootMargin: "200px" },
  );

  observer.observe(el);
});

const form = reactive({
  nickname: "",
  twitter: "",
  playstyle: playstyles[0],
  reason: "",
});

const formErrors = reactive({ nickname: "", twitter: "", reason: "" });
const touched = reactive({ nickname: false, twitter: false, reason: false });

const NICKNAME_RE = /^[A-Za-z0-9_]{3,16}$/;
const TWITTER_RE = /^[A-Za-z0-9_]{1,15}$/;

function validateField(field: keyof typeof formErrors) {
  if (field === "nickname") {
    const v = form.nickname.trim();
    if (!v) formErrors.nickname = "Nick é obrigatório.";
    else if (!NICKNAME_RE.test(v))
      formErrors.nickname =
        "Nick inválido (3–16 caracteres, apenas letras, números e _).";
    else formErrors.nickname = "";
  } else if (field === "twitter") {
    const v = form.twitter.trim().replace(/^@+/, "");
    if (!v) formErrors.twitter = "Twitter/X é obrigatório.";
    else if (!TWITTER_RE.test(v))
      formErrors.twitter =
        "Handle inválido (máx 15 caracteres, apenas letras, números e _).";
    else formErrors.twitter = "";
  } else if (field === "reason") {
    const v = form.reason.trim();
    if (!v) formErrors.reason = "Conta um pouco sobre você.";
    else if (v.length < 12)
      formErrors.reason = `Mínimo 12 caracteres (${v.length}/12).`;
    else formErrors.reason = "";
  }
}

function validateForm(): boolean {
  (["nickname", "twitter", "reason"] as const).forEach((f) => {
    touched[f] = true;
    validateField(f);
  });
  return !formErrors.nickname && !formErrors.twitter && !formErrors.reason;
}

const isSubmitting = ref(false);
const hasSubmitted = ref(false);
const statusMessage = ref("");

async function joinWaitlist() {
  statusMessage.value = "";

  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await $fetch<{ entry: { nickname: string } }>(
      "/api/waitlist",
      {
        method: "POST",
        body: {
          nickname: form.nickname.trim(),
          twitter: form.twitter.trim().replace(/^@+/, ""),
          playstyle: form.playstyle,
          reason: form.reason.trim(),
        },
      },
    );

    hasSubmitted.value = true;
    statusMessage.value = `${response.entry.nickname}, seu pedido entrou na fila da Bolha Realm.`;
    const { $logEvent } = useNuxtApp();
    $logEvent("waitlist_join", { playstyle: form.playstyle });
  } catch (error) {
    const fetchError = error as {
      statusCode?: number;
      data?: { statusMessage?: string };
    };
    hasSubmitted.value = false;

    if (fetchError.statusCode === 429) {
      statusMessage.value =
        "Muitas tentativas. Aguarda um momento antes de tentar de novo.";
    } else if (fetchError.statusCode && fetchError.statusCode >= 500) {
      statusMessage.value = "Erro interno. Tenta de novo em alguns minutos.";
    } else {
      statusMessage.value =
        fetchError.data?.statusMessage ??
        "Não deu para enviar agora. Tenta de novo em alguns minutos.";
    }
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
        class="site-header absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-6"
      >
        <a href="#top" class="brand-mark" aria-label="Bolha Realm">
          <img src="/assets/logo.png" alt="Bolha Realm" class="brand-logo" />
        </a>

        <nav
          class="hidden items-center gap-5 text-xs uppercase text-white/80 lg:flex"
        >
          <a class="nav-link" href="#realm">O modpack</a>
          <a class="nav-link" href="#temporada">Temporada</a>
          <a class="nav-link" href="#launcher">Launcher</a>
          <a class="nav-link" href="#waitlist">Whitelist</a>
        </nav>

        <a
          href="#waitlist"
          class="pixel-button pixel-button--arrow pixel-button--small"
        >
          Jogar com a gente
          <ArrowRight class="h-4 w-4" />
        </a>
      </header>

      <div
        class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-12 pt-28 md:px-8 lg:grid-cols-2 lg:gap-16"
      >
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 650 } }"
        >
          <div class="status-chip mb-5 text-xs uppercase md:text-sm">
            <span class="status-dot" />
            Whitelist abrindo em breve
          </div>

          <h1 class="hero-title uppercase">Bolha Realm</h1>

          <p
            class="mt-6 max-w-xl text-base leading-8 text-white/86 md:text-xl md:leading-9"
          >
            Cobblemon, Create, Aether e tech de endgame num único servidor -
            feito para treinador, builder, explorador e engenheiro jogarem
            juntos numa temporada que ainda importa na semana cinco.
          </p>

          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#waitlist" class="pixel-button pixel-button--arrow">
              Jogar com a gente
              <ArrowRight class="h-5 w-5" />
            </a>
            <a
              href="#realm"
              class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/68 transition hover:text-white"
            >
              Ver o modpack
              <ArrowRight class="h-4 w-4" />
            </a>
          </div>

          <div
            class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/58"
          >
            <template v-for="(stat, index) in stats" :key="stat.label">
              <span class="text-torch">{{ stat.value }}</span>
              <span v-if="index < stats.length - 1" class="text-white/28"
                >|</span
              >
            </template>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: 24 }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: { duration: 700, delay: 200 },
          }"
          class="hidden items-center justify-center lg:flex"
        >
          <div class="video-frame-outer w-full max-w-[640px]">
            <div class="video-corner video-corner--tl" />
            <div class="video-corner video-corner--tr" />
            <div class="video-corner video-corner--bl" />
            <div class="video-corner video-corner--br" />
            <div class="video-frame">
              <video ref="videoRef" muted loop playsinline preload="none" />
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
            <p class="section-kicker text-sm">
              Modpack + servidor da Bolha Dev
            </p>
            <h2 class="section-title mt-4 uppercase">Não é só survival</h2>
          </div>
          <p
            class="max-w-3xl text-sm leading-7 text-white/76 md:text-base md:leading-8"
          >
            Bolha Realm mistura treinador, builder, automação e expedição no
            mesmo mapa. Tem Cobblemon como espinha dorsal, Create e Mekanism
            para projeto gigante, storage forte com AE2 e Refined, e dimensões
            para quando o Overworld ficar pequeno.
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

        <div class="mt-16 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p class="section-kicker text-sm">O que realmente tem no pack</p>
            <h3 class="mt-4 text-3xl uppercase text-white md:text-4xl">
              Sem promessa genérica
            </h3>
          </div>
          <p
            class="max-w-3xl text-sm leading-7 text-white/72 md:text-base md:leading-8"
          >
            Se a ideia é entender o clima do servidor sem enrolação, o resumo é
            esse: captura, engenharia, dimensões, storage forte, mapa útil,
            shaders bonitos e bastante espaço para projeto coletivo.
          </p>
        </div>

        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <article
            v-for="column in modpackShowcase"
            :key="column.title"
            v-motion
            :initial="{ opacity: 0, y: 22 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 520 } }"
            class="minecraft-panel h-full p-5 md:p-6"
          >
            <p class="text-xs uppercase tracking-[0.16em] text-torch">
              {{ column.eyebrow }}
            </p>
            <h3 class="mt-3 text-2xl uppercase text-white">
              {{ column.title }}
            </h3>

            <ul class="mt-6 space-y-3 text-sm leading-7 text-white/78">
              <li
                v-for="item in column.items"
                :key="item"
                class="flex items-start gap-3"
              >
                <CheckCircle2 class="mt-1 h-4 w-4 shrink-0 text-torch" />
                <span>{{ item }}</span>
              </li>
            </ul>
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
          <h2 class="section-title mt-4 uppercase">Uma temporada para durar</h2>
          <p
            class="mt-6 max-w-3xl text-sm leading-7 text-white/78 md:text-base md:leading-8"
          >
            A Bolha Realm não é um servidor que esgota em duas semanas. O mapa
            foi desenhado com hub central, waystones e espaço para projeto
            coletivo crescer — enquanto a automação vai ganhando corpo, novas
            dimensões se abrem e a temporada continua valendo a pena para quem
            entrou no dia um e para quem chegou depois.
          </p>

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div class="pixel-badge text-xs uppercase">
              <Castle class="h-4 w-4 text-torch" />
              Spawn com waystones
            </div>
            <div class="pixel-badge text-xs uppercase">
              <Sparkles class="h-4 w-4 text-torch" />
              Fresh + Complementary
            </div>
            <div class="pixel-badge text-xs uppercase">
              <UsersRound class="h-4 w-4 text-torch" />
              Progressão em grupo
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

    <section id="launcher" class="relative bg-[#17140f] px-5 py-20 md:px-8">
      <div
        class="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#7b3ff2,#2d8f25,#f5b642,#595f5b)]"
      />

      <div
        class="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"
      >
        <div
          v-motion
          :initial="{ opacity: 0, x: -24 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 560 } }"
          class="flex items-center justify-center"
        >
          <div class="video-frame-outer w-full max-w-[580px]">
            <div class="video-corner video-corner--tl" />
            <div class="video-corner video-corner--tr" />
            <div class="video-corner video-corner--bl" />
            <div class="video-corner video-corner--br" />
            <div class="video-frame">
              <img
                src="/assets/launcher-img.png"
                alt="DevBubble Launcher — tela principal do servidor Bolha Realm"
                class="block h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: 24 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 560 } }"
        >
          <p class="section-kicker text-sm">Launcher próprio</p>
          <h2 class="section-title mt-4 uppercase">Abre e joga</h2>
          <p
            class="mt-6 max-w-2xl text-sm leading-7 text-white/78 md:text-base md:leading-8"
          >
            Não precisa configurar nada. O DevBubble Launcher já vem com o
            modpack do Bolha Realm instalado e configurado, só entrar e clicar
            em Jogar. Atualizações e novos mods chegam automaticamente, sem mão
            na massa.
          </p>

          <div class="mt-8 grid gap-3 sm:grid-cols-2">
            <div class="pixel-badge text-xs uppercase">
              <BadgeCheck class="h-4 w-4 text-success" />
              Modpack pré-instalado
            </div>
            <div class="pixel-badge text-xs uppercase">
              <Sparkles class="h-4 w-4 text-torch" />
              Atualização automática
            </div>
            <div class="pixel-badge text-xs uppercase">
              <ShieldCheck class="h-4 w-4 text-info" />
              Login Integrado
            </div>
            <div class="pixel-badge text-xs uppercase">
              <ArrowRight class="h-4 w-4 text-torch" />
              Windows, macOS e Linux
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
            Manda teu nick, Twitter/X e o jeito que você quer jogar: treinador,
            builder, explorador de dimensões ou maluco da automação. A ideia é
            montar uma temporada com perfis que se complementam.
          </p>

          <div class="mt-8 space-y-4">
            <div class="pixel-badge text-xs uppercase">
              <BadgeCheck class="h-4 w-4 text-success" />
              Vagas liberadas em ondas
            </div>
            <div class="pixel-badge text-xs uppercase">
              <MessageSquareText class="h-4 w-4 text-info" />
              Contato pelo Twitter/X
            </div>
          </div>
        </div>

        <form
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 560 } }"
          class="minecraft-panel grid gap-5 p-5 md:grid-cols-2 md:p-7"
          novalidate
          @submit.prevent="joinWaitlist"
        >
          <label class="grid gap-2">
            <span
              class="text-xs uppercase transition-colors"
              :class="
                touched.nickname
                  ? formErrors.nickname
                    ? 'text-error'
                    : 'text-success'
                  : 'text-torch'
              "
              >Nick no Minecraft</span
            >
            <input
              v-model="form.nickname"
              class="pixel-field input transition-[border-color,box-shadow]"
              :class="{
                'pixel-field--error': touched.nickname && formErrors.nickname,
                'pixel-field--valid': touched.nickname && !formErrors.nickname,
              }"
              name="nickname"
              placeholder="SteveDaBolha"
              type="text"
              @blur="
                () => {
                  touched.nickname = true;
                  validateField('nickname');
                }
              "
            />
            <p
              v-if="touched.nickname && formErrors.nickname"
              class="text-xs text-error"
            >
              {{ formErrors.nickname }}
            </p>
          </label>

          <label class="grid gap-2">
            <span
              class="text-xs uppercase transition-colors"
              :class="
                touched.twitter
                  ? formErrors.twitter
                    ? 'text-error'
                    : 'text-success'
                  : 'text-torch'
              "
              >Twitter / X</span
            >
            <input
              v-model="form.twitter"
              class="pixel-field input transition-[border-color,box-shadow]"
              :class="{
                'pixel-field--error': touched.twitter && formErrors.twitter,
                'pixel-field--valid': touched.twitter && !formErrors.twitter,
              }"
              name="twitter"
              placeholder="@seunome"
              type="text"
              @blur="
                () => {
                  touched.twitter = true;
                  validateField('twitter');
                }
              "
            />
            <p
              v-if="touched.twitter && formErrors.twitter"
              class="text-xs text-error"
            >
              {{ formErrors.twitter }}
            </p>
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
            <span
              class="text-xs uppercase transition-colors"
              :class="
                touched.reason
                  ? formErrors.reason
                    ? 'text-error'
                    : 'text-success'
                  : 'text-torch'
              "
              >Por que você combina com o servidor?</span
            >
            <textarea
              v-model="form.reason"
              class="pixel-field textarea min-h-36 resize-y transition-[border-color,box-shadow]"
              :class="{
                'pixel-field--error': touched.reason && formErrors.reason,
                'pixel-field--valid': touched.reason && !formErrors.reason,
              }"
              name="reason"
              placeholder="Curto construir vila, ajudar em projeto coletivo e topar evento..."
              @blur="
                () => {
                  touched.reason = true;
                  validateField('reason');
                }
              "
            />
            <div class="flex items-center justify-between">
              <p
                v-if="touched.reason && formErrors.reason"
                class="text-xs text-error"
              >
                {{ formErrors.reason }}
              </p>
              <p v-else class="text-xs text-white/40">
                {{ form.reason.trim().length }}/480
              </p>
            </div>
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
              A whitelist é limitada para manter a temporada boa de acompanhar.
            </p>

            <button
              class="pixel-button pixel-button--arrow pixel-button--portal"
              :disabled="isSubmitting || hasSubmitted"
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
      <div class="mx-auto flex max-w-7xl justify-center">
        <img src="/assets/logo.png" alt="Bolha Realm" class="footer-logo" />
      </div>
    </footer>
  </main>
</template>
