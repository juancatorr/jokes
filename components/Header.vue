<template>
  <header class="bg-primary text-surface font-display shadow-md border-b border-border px-lg py-md flex items-center justify-between">
    <h1 class="text-2xl font-bold tracking-wide">Jokes App</h1>
    <nav class="flex gap-md">
      <NuxtLink to="/jokes" class="hover:underline hover:text-accent transition-colors">Jokes</NuxtLink>
      <NuxtLink to="/jokes/favorites" class="hover:underline hover:text-accent transition-colors">Favorites</NuxtLink>
    </nav>
  </header>
</template>

<script setup>
// Puedes agregar lógica aquí si es necesario
</script>

