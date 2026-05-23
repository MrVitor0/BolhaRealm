export default defineNuxtConfig({
  compatibilityDate: "2026-05-22",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/motion/nuxt"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    // Servidor — nunca expostos ao cliente
    firebaseProjectId: "",
    firebaseClientEmail: "",
    firebasePrivateKey: "",
    public: {
      siteName: "Bolha Realm",
      // Firebase client config
      firebaseApiKey: "",
      firebaseAuthDomain: "",
      firebaseProjectId: "",
      firebaseStorageBucket: "",
      firebaseMessagingSenderId: "",
      firebaseAppId: "",
      firebaseMeasurementId: "",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-BR",
      },
      title: "Bolha Realm | Servidor Minecraft da Bolha Dev",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Entre na lista de espera do Bolha Realm, o servidor Minecraft da Bolha Dev com survival cooperativo, eventos e uma whitelist escolhida a dedo.",
        },
        {
          name: "application-name",
          content: "Bolha Realm",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Bolha Realm",
        },
        {
          name: "format-detection",
          content: "telephone=no, address=no, email=no",
        },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { name: "theme-color", content: "#2d8f25" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/assets/logo.png" },
        { rel: "apple-touch-icon", href: "/assets/logo.png" },
      ],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    exposeConfig: false,
    viewer: false,
  },
});
