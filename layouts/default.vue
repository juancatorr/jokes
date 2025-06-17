<template>
  <div class="min-h-screen flex flex-col bg-white">
    <AppHeader />
    <main class="flex-1 max-w-5xl w-full mx-auto py-8 px-4">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
</script>

<style scoped>
main {
  min-height: 70vh;
}
</style>
