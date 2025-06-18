<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'px-4 py-3 rounded-lg shadow-md flex items-center min-w-[250px] max-w-md',
          toastTypeClasses[toast.type],
        ]"
      >
        <Icon :name="toastIcons[toast.type]" class="mr-2 flex-shrink-0" aria-hidden="true" />
        <div class="flex-grow">{{ toast.message }}</div>
        <button
          class="ml-2 text-current opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Close"
          @click="removeToast(toast.id)"
        >
          <Icon name="octicon:x-16" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';
import { Icon } from '#components';

const { toasts, removeToast } = useToast();

const toastTypeClasses = {
  success: 'bg-success-muted text-success-fg border-l-4 border-success-emphasis',
  error: 'bg-danger-muted text-danger-fg border-l-4 border-danger-emphasis',
  warning: 'bg-attention-muted text-attention-fg border-l-4 border-attention-emphasis',
  info: 'bg-primary-100 text-primary-800 border-l-4 border-primary-500',
};

const toastIcons = {
  success: 'octicon:check-circle-16',
  error: 'octicon:alert-16',
  warning: 'octicon:alert-16',
  info: 'octicon:info-16',
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
