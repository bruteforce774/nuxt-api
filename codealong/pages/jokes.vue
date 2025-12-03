<script setup>
const { data, pending, error, refresh } = useFetch('/api/jokes')
</script>

<template>
  <div>
    <h1>Vitser</h1>

    <div v-if="pending">Laster vitser...</div>
    <div v-else-if="error">Noe gikk galt: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="(joke, index) in data.jokes" :key="index">
          {{ joke }}
        </li>
      </ul>

      <button @click="refresh()">Last på nytt</button>
    </div>
  </div>
</template>
