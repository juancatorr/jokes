<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold text-secondary mb-2">Joke Detail</h1>
    <p class="text-lg text-gray-700">ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>
