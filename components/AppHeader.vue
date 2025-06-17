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
      </div>
    </div>
  </header>
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
