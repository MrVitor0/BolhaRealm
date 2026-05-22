/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./server/**/*.{js,ts}",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        minecraft: [
          "Minecraft",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        block: "0 8px 0 #0f2410, 0 18px 35px rgb(0 0 0 / 0.35)",
        glow: "0 0 32px rgb(91 223 70 / 0.35)",
      },
      colors: {
        grass: "#3f982e",
        leaf: "#1f5f24",
        dirt: "#6e4a2c",
        stone: "#595f5b",
        torch: "#f5b642",
        portal: "#7b3ff2",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "bolharealm",
    themes: [
      {
        bolharealm: {
          primary: "#3f982e",
          secondary: "#7b3ff2",
          accent: "#f5b642",
          neutral: "#17140f",
          "base-100": "#12100d",
          "base-200": "#1d1811",
          "base-300": "#2a2117",
          info: "#59b8ff",
          success: "#56d14b",
          warning: "#f5b642",
          error: "#ef604f",
          "--rounded-box": "0.125rem",
          "--rounded-btn": "0.125rem",
          "--rounded-badge": "0.125rem",
          "--animation-btn": "0.12s",
          "--animation-input": "0.12s",
          "--btn-focus-scale": "1",
        },
      },
    ],
  },
};
