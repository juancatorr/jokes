<template>
  <JokeDetail :joke-id="id" @back="goBack" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import JokeDetail from '~/components/JokeDetail.vue';

definePageMeta({
  keepalive: false,
});

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

function goBack() {
  router.back();
}
</script>
