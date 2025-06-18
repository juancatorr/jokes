<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
    <div
      v-for="i in count"
      :key="i"
      class="bg-gray-200 rounded-lg overflow-hidden animate-pulse h-65"
    >
      <div class="h-40 bg-gray-300" />
      <div class="p-4">
        <div class="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div class="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  count: {
    type: Number,
    default: 8,
  },
});
</script>
