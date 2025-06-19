<template>
  <div>
    <div class="w-full flex justify-between items-center mb-4 gap-4">
      <div v-if="!loading && !error" class="flex justify-between items-center">
        <p class="text-text font-medium">Showing {{ jokes.length }} jokes</p>
      </div>
      <JokeSortSelector
        :initial-option="sortOption"
        :initial-direction="sortDirection"
        @sort-change="handleSortChange"
        @direction-change="handleDirectionChange"
      />
    </div>

    <div v-if="loading && !isFetchingNextPage" class="my-4 text-center">
      <JokeSkeletonInfiniteGrid />
    </div>
    <div v-else-if="error" class="my-4 text-center text-danger-fg">Error: {{ error }}</div>
    <div v-else>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
      </div>

      <div ref="loadMoreTrigger" class="h-30 w-full flex justify-center items-center my-8">
        <div v-if="isFetchingNextPage" class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
        <div v-else-if="!hasNextPage" class="text-gray-500">No more jokes to load</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import JokeCard from '~/components/JokeCard.vue';
import JokeSkeletonInfiniteGrid from '~/components/JokeSkeletonInfiniteGrid.vue';
import JokeSortSelector from '~/components/JokeSortSelector.vue';
import { useRandomJokes, type SortOption, type SortDirection } from '~/composables/useJokes';

const props = defineProps({
  initialLimit: {
    type: Number,
    default: 10,
  },
});

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
} = useRandomJokes(props.initialLimit);

const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function handleSortChange(option: SortOption, direction: SortDirection) {
  setSorting(option, direction);
}

function handleDirectionChange() {
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
