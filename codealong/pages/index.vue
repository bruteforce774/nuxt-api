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
