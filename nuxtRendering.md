# Nuxt.js Rendering Modes -- Komplett Guide for Studenter

Denne guiden viser **alle måtene Nuxt kan rendre innhold på**, hvordan
du setter dem opp, og hvorfor de finnes.

------------------------------------------------------------------------

# 🎯 Læringsmål

Etter å ha gått gjennom dette dokumentet skal du forstå:

-   Hva **CSR**, **SSR**, **Hydration**, **SSG**, **Prerendering** og
    **Hybrid Rendering** betyr
-   Hvordan du konfigurerer hver rendering-modus i Nuxt
-   Når du bør bruke hva
-   Hvordan du setter opp en «klassisk server-renderet side» uten
    client-side JavaScript

------------------------------------------------------------------------

# 📚 1. Grunnleggende begreper

## 1.1 Client-Side Rendering (CSR)

-   Hele UI-et rendres i **browseren**
-   Serveren leverer kun en tom HTML-fil + JavaScript
-   Første visning kan være treg
-   Ingen SEO uten ekstra tiltak

🔥 Dette er vanlig Vue uten SSR.

------------------------------------------------------------------------

## 1.2 Server-Side Rendering (SSR)

-   HTML genereres **på serveren** for hver request
-   Browseren mottar ferdig HTML
-   Deretter «hydreres» siden → Vue tar over på klienten

Dette kalles ofte: - Universal Rendering\
- Isomorphic Rendering\
- SSR + Hydration

SSR gir: - Bedre first paint - God SEO - Mulighet til å hente data på
server

------------------------------------------------------------------------

## 1.3 Hydration

Når browseren mottar server-renderet HTML, kobler Vue på interaktivitet.

    Server: "<button>0</button>"
    Client JS: "Koble på click-events + state"

------------------------------------------------------------------------

## 1.4 Static Site Generation (SSG)

-   HTML bygges **ved build time**
-   Serveren leverer ferdige statiske filer
-   Hydreres ved load

Dette gir: - Maks ytelse - Kan hostes på CDN - Ingen server nødvendig

------------------------------------------------------------------------

## 1.5 Hybrid Rendering (Route Rules)

Forskjellige sider i samme app kan ha forskjellige renderingsstrategier.

Eksempler: - Forsiden → prerender - Dashboard → CSR - Produkter → SSR

------------------------------------------------------------------------

## 1.6 Klassisk SSR uten SPA-del

Dette betyr:

-   HTML rendres på serveren
-   Ingen hydration → Ingen Vue på klienten
-   Fungerer som PHP, ASP.NET Razor eller gamle JSP-sider

Nuxt støtter dette via `csr: false`.

------------------------------------------------------------------------

# 🧪 2. Sett opp prosjektet

Start et nytt Nuxt-prosjekt:

``` sh
npx nuxi init rendering-demo
cd rendering-demo
npm install
npm run dev
```

------------------------------------------------------------------------

# 🚀 3. Rendering-modus 1: CSR (Client-Side Rendering)

## 🔍 Hva det betyr

-   Ingen server-rendering\
-   Hele appen fungerer som en ren SPA

## ⚙️ Konfigurasjon (`nuxt.config.ts`)

``` ts
export default defineNuxtConfig({
  ssr: false
})
```

## ✔️ Test

Lag `pages/csr.vue`:

``` vue
<template>
  <h1>CSR Page</h1>
</template>
```

Gå til `/csr` -- siden rendres kun i browseren.

------------------------------------------------------------------------

# 🌐 4. Rendering-modus 2: SSR (Server-Side Rendering, default)

## 🔍 Hva det betyr

-   HTML genereres ved hver request
-   Etterpå hydreres siden og fungerer som SPA

## ⚙️ Konfigurasjon

Dette er default, men eksplisitt:

``` ts
export default defineNuxtConfig({
  ssr: true
})
```

Lag `pages/ssr.vue`:

``` vue
<script setup>
const time = new Date().toISOString()
</script>

<template>
  <h1>SSR Page</h1>
  <p>Rendered on: {{ time }}</p>
</template>
```

Refresh siden --- tidspunktet endrer seg (server-rendering).

------------------------------------------------------------------------

# 🧱 5. Rendering-modus 3: SSG (Static Site Generation)

## 🔍 Hva det betyr

-   HTML genereres én gang ved build
-   Leveres som statisk fil
-   Hydreres ved load

## ⚙️ Konfigurasjon

### Anbefalt moderne konfig:

``` ts
export default defineNuxtConfig({
  routeRules: {
    '/**': { prerender: true }
  }
})
```

## ✔️ Generer statiske sider:

    npm run build
    npm run generate

Resultatet ligger i `.output/public`.

------------------------------------------------------------------------

# 🌀 6. Rendering-modus 4: Hybrid Rendering

Dette lar deg blande moduser **per route**.

## 🧩 Eksempel på `routeRules`:

``` ts
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },          // statisk
    '/csr/**': { ssr: false },         // kun client-side
    '/ssr/**': { ssr: true },          // full SSR
    '/profile/**': { swr: true }       // server-render + client revalidation
  }
})
```

Dette lar deg bygge moderne, fleksible apper.

------------------------------------------------------------------------

# 🧓 7. Rendering-modus 5: Klassisk SSR uten SPA (ingen hydration)

## 🔍 Hva det betyr

-   HTML leveres fra server
-   Ingen Vue kjører på klienten
-   Ingen hydration
-   Ingen interaktivitet utover HTML

## ⚙️ Slik gjør du det i Nuxt

### I `nuxt.config.ts`:

``` ts
export default defineNuxtConfig({
  routeRules: {
    '/oldschool/**': {
      ssr: true,
      csr: false
    }
  }
})
```

### Lag siden:

`pages/oldschool/index.vue`

``` vue
<template>
  <h1>Klassisk server-rendering</h1>
  <p>Denne siden har ingen client-side JavaScript.</p>
</template>
```

### Test:

Åpne devtools → «Sources» →\
Du vil ikke se bundler eller app.js --- kun ren HTML.

------------------------------------------------------------------------

# 🔍 8. Kort oppsummering

  ------------------------------------------------------------------------------
  Rendering-modus   Server-render?   Hydration?   Interaktiv SPA?  Bruksområde
  ----------------- ---------------- ------------ ---------------- -------------
  **CSR**           ❌               ❌           ✔️               Dashboards,
                                                                   interne apper

  **SSR**           ✔️               ✔️           ✔️               SEO, public
                                                                   sites

  **SSG**           ✔️ (build-time)  ✔️           ✔️               Blogg, docs,
                                                                   landing pages

  **Hybrid**        Mixed            Mixed        ✔️               Store apper
                                                                   med ulike
                                                                   krav

  **Klassisk SSR**  ✔️               ❌           ❌               Statisk HTML
                                                                   uten JS
  ------------------------------------------------------------------------------

------------------------------------------------------------------------

# 🎉 Ferdig!

Du kan nå:

-   Velge riktig rendering mode\
-   Konfigurere det i Nuxt\
-   Forklare konseptene CSR, SSR, SSG, Hydration, Hybrid og Klassisk SSR

Lykke til videre!
