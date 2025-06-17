<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <AppHeader />
    <main class="flex-1 max-w-6xl w-full mx-auto py-10 px-4 sm:px-6">
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
