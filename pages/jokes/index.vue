<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col items-center mb-6">
      <h1 class="text-3xl font-bold text-primary mb-6">Jokes List</h1>

      <div class="flex items-center gap-4 mb-6">
        <div class="flex items-center">
          <label for="sort" class="mr-2 text-text font-medium">Sort by:</label>
          <select
            id="sort"
            v-model="sortOption"
            class="border border-border rounded-lg px-3 py-1.5 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors duration-normal"
            @change="handleSortChange"
          >
            <option value="none">None</option>
            <option value="id">ID</option>
            <option value="setup">Setup</option>
            <option value="type">Type</option>
          </select>
        </div>

        <button
          v-if="sortOption !== 'none'"
          class="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors"
          :title="`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`"
          @click="toggleSortDirection"
        >
          <Icon
            :name="
              sortDirection === 'asc'
                ? 'heroicons:arrow-up-20-solid'
                : 'heroicons:arrow-down-20-solid'
            "
            class="h-5 w-5"
          />
        </button>
      </div>
    </div>

    <div v-if="loading && !isFetchingNextPage" class="my-4 text-center">
      <JokeSkeletonGrid />
    </div>
    <div v-else-if="error" class="my-4 text-center text-danger-fg">Error: {{ error }}</div>
    <div v-else>
      <div class="flex justify-between items-center mb-4">
        <p class="text-text font-medium">Showing {{ jokes.length }} jokes</p>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
      </div>

      <div ref="loadMoreTrigger" class="h-30 w-full flex justify-center items-center my-8">
        <div v-if="isFetchingNextPage" class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"/>
        </div>
        <div v-else-if="!hasNextPage" class="text-gray-500">No more jokes to load</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import JokeCard from '~/components/JokeCard.vue';
import JokeSkeletonGrid from '~/components/JokeSkeletonGrid.vue';
import { useRandomJokes } from '~/composables/useJokes';

definePageMeta({
  ssr: false,
});

const JOKES_PER_PAGE = 10;
const {
  jokes,
  loading,
  error,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  sortOption,
  sortDirection,
  setSorting,
  toggleSortDirection: toggleDirection,
} = useRandomJokes(JOKES_PER_PAGE);

const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function handleSortChange() {
  setSorting(sortOption.value, sortDirection.value);
}

function toggleSortDirection() {
  toggleDirection();
}

onMounted(() => {
  observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
    observer.disconnect();
  }
});

async function handleIntersection(entries: IntersectionObserverEntry[]) {
  const entry = entries[0];
  if (entry.isIntersecting && !loading.value && !isFetchingNextPage.value) {
    await fetchNextPage();
  }
}
</script>
