<script setup lang="ts">
import RatingZone from './RatingZone.vue'
import type { Template, Book } from '@/types'

defineProps<{
  template: Template
}>()

const emit = defineEmits<{
  (e: 'rename-rating', ratingId: number, newName: string): void
  (e: 'remove-book', book: Book, ratingId: number): void
}>()
</script>

<template>
  <div class="template-shelf">
    <RatingZone
      v-for="ratingItem in template.ratings"
      :key="ratingItem.id"
      :rating-id="ratingItem.id"
      v-model:books="ratingItem.books"
      :name="ratingItem.name"
      @name-change="(newName) => emit('rename-rating', ratingItem.id, newName)"
      @remove-book="(book) => emit('remove-book', book, ratingItem.id)"
    />
  </div>
</template>

<style scoped>
.template-shelf {
  grid-column: span 7 / span 7;
  display: grid;
  gap: 12px;
}

.template-shelf > div {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  min-height: 96px;
  background: linear-gradient(90deg, rgba(254, 243, 199, 0.6) 0%, rgba(255, 255, 255, 0.7) 35%);
  border-left: 5px solid #f59e0b;
  backdrop-filter: blur(20px);
  box-shadow:
    0 10px 30px -5px rgba(0, 0, 0, 0.04),
    0 4px 10px -2px rgba(0, 0, 0, 0.02);
  border-radius: 18px;
}
</style>
