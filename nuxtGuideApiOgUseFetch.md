# Nuxt.js: Data Fetching med useFetch og API Routes

Denne guiden er laget for å gi deg praktisk trening i hvordan du bygger
API-endepunkter i Nuxt.js og henter data med `useFetch`. Den er skrevet
som et steg‑for‑steg‑opplegg du kan følge selv -- og samtidig som et
undervisningsnotat med forklaringer underveis.

------------------------------------------------------------------------

## 🎯 Læringsmål

Etter å ha fulgt guiden skal du kunne:

-   Lage et API-endepunkt i `server/api`
-   Fetch data fra dette endepunktet med `useFetch`
-   Forstå hva `useFetch` løser
-   Forstå error-håndtering og states som `pending`, `data`, `error`
-   Kjenne til `runtimeConfig` for server-side secrets

------------------------------------------------------------------------

# 1. Lage ditt første API-endepunkt

Nuxt gjør det veldig enkelt å lage API-ruter. Alt du legger i
**`/server/api`** blir automatisk gjort tilgjengelig på `/api/...`.

### ✔️ Eksempel: Lag `/server/api/hello.ts`

Opprett filen:

    server/api/hello.ts

Innhold:

``` ts
export default defineEventHandler(() => {
  return {
    message: "Hei fra API-et!",
    time: new Date().toISOString()
  };
});
```

### 🔍 Hva skjer her?

-   `defineEventHandler` lager en API-handler.
-   Funksjonen returnerer JSON.
-   Nuxt bygger automatisk en route:\
    **GET /api/hello**

### 👉 Test det

Start dev‑server og åpne i nettleser:

    http://localhost:3000/api/hello

Du skal se JSON.

------------------------------------------------------------------------

# 2. Hente data med useFetch

Nå skal du hente dette API-endepunktet i en Vue-komponent eller i
`app.vue`.

### ✔️ Eksempel i `app.vue`

``` vue
<script setup>
const { data, pending, error } = useFetch('/api/hello')
</script>

<template>
  <div>
    <h1>useFetch Demo</h1>

    <div v-if="pending">Laster...</div>
    <div v-else-if="error">Noe gikk galt: {{ error.message }}</div>
    <div v-else>
      <p>Melding: {{ data.message }}</p>
      <p>Tid: {{ data.time }}</p>
    </div>
  </div>
</template>
```

------------------------------------------------------------------------

# 3. Hva useFetch egentlig løser

Når du bruker vanlig `fetch()` i Vue-apps får du typiske problemer:

### ❌ Problemer uten useFetch

-   Data må håndteres manuelt i `ref()`
-   Ingen innebygget caching
-   Vanskelig å forhindre dobbelt-fetch
-   Fetch skjer bare på klienten
-   Du må bygge loading/error‑state selv
-   Ingen server-side rendering automatikk
-   Ikke typesikker returverdi

### ✔️ useFetch løser dette

`useFetch` gir deg:

-   **Server-side fetching automatisk**\
    (bedre SEO, rask first paint)
-   **Caching & deduplication**\
    (flere komponenter som fetcher samme endpoint → henter bare én gang)
-   **Reaktiv state**\
    (`pending`, `data`, `error`)
-   **Type inference** i TypeScript
-   **Auto-serialization** mellom server og klient

### 3.1 Server-side fetching i praksis

Når du kjører:

``` ts
useFetch('/api/hello')
```

...da skjer fetch på server **før HTML sendes til browseren**.\
Klienten får:

-   Ferdig HTML med data integrert
-   En liten payload med state for hydration

Dette er en av hovedgrunnene til at Nuxt oppleves raskt.

------------------------------------------------------------------------

# 4. Error-håndtering

Et viktig poeng med `useFetch` er at feil håndteres som state -- ikke
med try/catch.

### ✔️ Simuler en feil i API-et

Endre `/server/api/hello.ts`:

``` ts
export default defineEventHandler(() => {
  throw new Error("Noe gikk galt!");
});
```

### Når du refresher:

-   `error` i `useFetch` blir et objekt
-   `pending` blir `false`
-   UI viser en god feilmelding

------------------------------------------------------------------------

# 5. runtimeConfig (kort intro)

Hvis API-et ditt trenger secrets (API-nøkler osv.) skal de ligge i
`runtimeConfig`.

### Eksempel i `nuxt.config.ts`

``` ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: 'hemmelig', // server only
    public: {
      apiBase: '/api'
    }
  }
})
```

### Bruk i API-route

``` ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  return { secret: config.apiSecret }
})
```

**Poeng:**\
- Alt i `public` kan brukes i klientkode\
- Alt utenfor `public` er *kun tilgjengelig på serveren*

------------------------------------------------------------------------

# 📌 Oppgave: Lag et nytt API + fetch det

1.  Lag `/server/api/jokes.ts`
    -   Returner en liste med 3 vitser\
2.  Fetch den fra en ny side:\
    `pages/jokes.vue`\
3.  Vis loading, error og data\
4.  Legg til en knapp: "Last på nytt"\
    → bruk `{ refresh }` fra useFetch

Eksempel:

``` ts
const { data, pending, refresh } = useFetch('/api/jokes')
```

------------------------------------------------------------------------

# 🎉 Du er ferdig!

Du har nå lært:

-   Å lage API-ruter i Nuxt
-   Å bruke `useFetch` effektivt
-   Hvorfor `useFetch` er mye bedre enn manuell fetching
-   Error‑håndtering og reaktiv state
-   basename om runtimeConfig

Dette er fundamentet som gjør at du i neste økt kan lære:

-   SSR
-   Hydration
-   Static site generation
-   Hybrid rendering modes
