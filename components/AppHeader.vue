<template>
  <header class="bg-primary-600 py-6 shadow-md font-display text-4xl gap-lg text-text-on-primary">
    <div class="container mx-auto px-4 gap-xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Icon
            name="octicon:smiley-16"
            class="h-8 w-8 mr-3 transition-transform hover:scale-110 icon-spin"
          />
          <p class="font-mono text-xl text-text-on-primary font-bold">Jokes App</p>
        </div>

        <AppNav />
      </div>
    </div>
  </header>
</template>

<script setup>
import AppNav from '~/components/AppNav.vue';
</script>

<style scoped>
.icon-spin:hover {
  animation: spin 0.8s ease-in-out 1 forwards;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
