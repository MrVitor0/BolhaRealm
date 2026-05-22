# Bolha Realm

Site de divulgacao do servidor Minecraft da Bolha Dev, feito com Nuxt, Tailwind CSS, daisyUI e VueUse Motion.

## Stack

- Nuxt 3
- Tailwind CSS via `@nuxtjs/tailwindcss`
- daisyUI para componentes prontos
- VueUse Motion para animacoes
- Lucide Vue para icones
- Fonte Minecraft em `public/fonts/Minecraft.ttf`
- Imagem principal em `public/assets/background.png`

## Comandos

```bash
npm install
npm run dev
npm run build
```

A lista de espera envia os dados para `POST /api/waitlist` e, em desenvolvimento/Node server, salva em `.data` via Nitro storage.
