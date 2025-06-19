<template>
  <nav class="flex gap-6">
    <NuxtLink
      to="/jokes"
      class="text-text-on-primary hover:text-secondary-50 transition-colors duration-300 flex items-center font-medium text-lg"
      active-class="border-b-2 border-secondary-50"
    >
      <Icon
        name="octicon:repo-16"
        class="h-5 w-5 mr-1 transition-all hover:scale-110 hover:text-secondary-50 duration-300 icon-bounce"
      />
      <span>Jokes</span>
    </NuxtLink>
    <NuxtLink
      to="/ten-jokes"
      class="text-text-on-primary hover:text-secondary-50 transition-colors duration-300 flex items-center font-medium text-lg"
      active-class="border-b-2 border-secondary-50"
    >
      <Icon
        name="octicon:number-16"
        class="h-5 w-5 mr-1 transition-all hover:scale-110 hover:text-secondary-50 duration-300 icon-bounce"
      />
      <span>Ten Jokes</span>
    </NuxtLink>
    <NuxtLink
      to="/jokes/favorites"
      class="text-text-on-primary hover:text-secondary-50 transition-colors duration-300 flex items-center font-medium text-lg"
      active-class="border-b-2 border-secondary-50"
    >
      <Icon
        name="octicon:heart-16"
        class="h-5 w-5 mr-1 transition-all hover:scale-125 hover:text-danger-emphasis duration-300 hover:animate-pulse"
      />
      <span>Favorites</span>
    </NuxtLink>
  </nav>
</template>

<script setup></script>

<style scoped>
.icon-bounce:hover {
  animation: bounce 0.6s ease infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) scale(1.1);
  }
  50% {
    transform: translateY(-25%) scale(1.1);
  }
}
</style>
