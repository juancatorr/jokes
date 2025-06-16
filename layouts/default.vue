<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Header />
    <main class="flex-1 max-w-5xl w-full mx-auto py-8 px-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
main {
  min-height: 70vh;
}
</style>
