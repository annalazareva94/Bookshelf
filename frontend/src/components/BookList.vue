<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import BookItem from './BookItem.vue'
import RemoveButton from './RemoveButton.vue'
import type { Book } from '@/types'
import { computed } from 'vue'
import {useEditorStore} from "@/stores/editor";

const store = useEditorStore()

const books = defineModel<Book[]>('books', { required: true })

const emit = defineEmits<{
  (e: 'delete-book', book: Book): void
}>()

const visibleBooks = computed(() => {
  const query = store.searchQuery.toLowerCase();
  return books.value.filter((book) =>
    book.title.toLowerCase().includes(query)
  )
})


</script>

<template>
  <div class="book-list">
    <p v-if="books.length === 0" class="empty-book-list">
      Let's add new books!
    </p>

    <!-- Есть поиск: показываем отфильтрованный список без drag -->
    <div v-else-if="store.searchQuery" class="book-list-inner">
      <div v-for="book in visibleBooks" :key="book.id" class="book-item-wrapper">
        <BookItem :book="book" />
        <RemoveButton @click="emit('delete-book', book)" />
      </div>
    </div>

    <!-- Нет поиска: полный список с drag -->
    <VueDraggable
      v-else
      v-model="books"
      group="shelf"
      :animation="250"
      easing="cubic-bezier(0.25, 1, 0.5, 1)"
      ghost-class="ghost"
      class="book-list-inner"
    >
      <div v-for="book in books" :key="book.id" class="book-item-wrapper">
        <BookItem :book="book" />
        <RemoveButton @click="emit('delete-book', book)" />
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped>
.book-list {
  padding: 10px;
  background-color: rgb(248 250 252 / 0.6);
  border: 1px dashed rgb(226 232 240);
  border-radius: 12px;
  gap: 12px;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 120px;
  display: flex;
}

.book-list-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}

.book-list .book-item-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 76px;
  transition:
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease;
  cursor: grab;
  user-select: none;
}

.book-list .book-item-wrapper:hover {
  transform: translateY(-4px) rotate(1.5deg) scale(1.03);
}

.book-list .book-item-wrapper .remove-btn {
  display: none;
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 99;
}

.book-list .book-item-wrapper:hover .remove-btn {
  display: flex;
}

.ghost-library {
  opacity: 0.5;
}

.empty-book-list {
  opacity: 0.5;
}
</style>
