<template>
  <div>
    <h1>Joke Detail</h1>
    <p>ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>
