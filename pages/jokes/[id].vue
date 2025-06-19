<template>
  <div class="container mx-auto px-4 py-6">
    <div
      v-if="pending"
      class="w-full text-center py-8 text-text-muted flex items-center justify-center"
    >
      <Icon name="octicon:sync-16" class="animate-spin mr-2 inline-block" />
      <p>Loading joke...</p>
    </div>
    <div v-else-if="error" class="w-full text-center py-8 text-danger-fg">
      <Icon name="octicon:alert-16" class="mr-2 inline-block" />
      Error: {{ error }}
    </div>
    <div v-else>
      <JokeDetail :joke-id="id" :prefetched-joke="data" @back="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import JokeDetail from '~/components/JokeDetail.vue';
import { useServerApi } from '~/composables/useServerApi';
import { useAsyncData } from 'nuxt/app';

definePageMeta({
  keepalive: false,
});

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const { fetchJoke } = useServerApi();

const { data, pending, error } = await useAsyncData(`joke-${id}`, () => fetchJoke(id), {
  server: true,
  lazy: false,
});

function goBack() {
  router.back();
}
</script>
