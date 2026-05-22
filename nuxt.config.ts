export default defineNuxtConfig({
  compatibilityDate: "2026-05-22",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/motion/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Bolha Realm | Servidor Minecraft da Bolha Dev",
      meta: [
        {
          name: "description",
          content:
            "Entre na lista de espera do Bolha Realm, o servidor Minecraft da Bolha Dev com survival cooperativo, eventos e uma whitelist escolhida a dedo.",
        },
        { name: "theme-color", content: "#2d8f25" },
        { property: "og:title", content: "Bolha Realm" },
        {
          property: "og:description",
          content:
            "Servidor Minecraft da Bolha Dev com whitelist, eventos e comunidade escolhida a dedo.",
        },
        { property: "og:image", content: "/assets/background.png" },
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
  nitro: {
    storage: {
      data: {
        driver: "fs",
        base: "./.data",
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    exposeConfig: false,
    viewer: false,
  },
});
