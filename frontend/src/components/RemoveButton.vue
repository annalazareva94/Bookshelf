<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="remove-btn" @click="emit('click')">✕</button>
</template>

<style scoped>
.remove-btn {
  --tw-bg-opacity: 1;
  background-color: rgb(244 63 94 / var(--tw-bg-opacity, 1));
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  display: flex;
  font-size: 9px;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
  border: unset;
}
</style>
