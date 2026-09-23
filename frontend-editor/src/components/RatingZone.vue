<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import BookItem from './BookItem.vue'
import RemoveButton from './RemoveButton.vue'
import type { Book } from '@/types'

const props = defineProps<{
  name: string
}>()

// Двусторонняя привязка массива книг к родителю.
// Родитель пишет: v-model:books="rating.books"
// В Vue 3.4+ появился макрос defineModel.
// Он заменяет собой старый паттерн «пропс + emit на каждое изменение»
// Эта строчка делает две вещи:
// Объявляет пропс books.
// Автоматически создаёт событие update:books, которое эмитится при любом books.value = ....
const books = defineModel<Book[]>('books', { required: true })

const emit = defineEmits<{
  (e: 'name-change', newName: string): void
  (e: 'remove-book', book: Book): void
}>()

const h3Ref = ref<HTMLElement | null>(null)

const bookInZoneCounter = computed(() => {

  if (books.value.length === 1) {
    return `${books.value.length} book`
  } else {
    return `${books.value.length} books`
  }

})

// Устанавливаем начальный текст после монтирования.
onMounted(() => {
  if (h3Ref.value) h3Ref.value.textContent = props.name
})

// Если родитель меняет name извне — синхронизируем DOM.
watch(
  () => props.name,
  (newName) => {
    if (h3Ref.value && h3Ref.value.textContent !== newName) {
      h3Ref.value.textContent = newName
    }
  },
)

function handleBlur(e: FocusEvent) {
  const target = e.currentTarget as HTMLElement
  const newText = (target.textContent ?? '').trim()

  // Пустое имя — откатываем к прежнему
  if (!newText) {
    target.textContent = props.name
    return
  }

  if (newText !== props.name) {
    emit('name-change', newText)
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    ;(e.currentTarget as HTMLElement).blur()
  }
  if (e.key === 'Escape') {
    ;(e.currentTarget as HTMLElement).textContent = props.name
    ;(e.currentTarget as HTMLElement).blur()
  }
}
</script>

<template>
  <div class="rating-zone">
    <div class="zone-info">
      <h3 ref="h3Ref" contenteditable="true" @blur="handleBlur" @keydown="handleKeyDown"></h3>
      <p class="book-amount">{{bookInZoneCounter}}</p>
    </div>

    <VueDraggable
      v-model="books"
      group="shelf"
      :animation="150"
      ghost-class="ghost"
      class="books-in-rating"
    >
      <div v-for="book in books" :key="book.id" class="book-container">
        <BookItem :book="book" :in-zone="true" />
        <RemoveButton @click="emit('remove-book', book)" />
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped>
.books-in-rating {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-left: 15px;
  min-height: 72px;
  flex: 1 1 0%;
}

.rating-zone .zone-info {
  padding-right: 0.75rem;
  border-right: 1px solid rgb(253 230 138 / 0.6);
  width: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}


.rating-zone h3 {
  max-width: 80px;
  width: 100%;
  outline: none;
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: rgb(180 83 9);
}

.rating-zone p {
  margin-top: 5px;
  font-size: 9px;
  background-color: rgb(253 230 138 / 0.6);
  border-radius: 6px;
  width: max-content;
  padding: 2px 6px;

  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
  font-weight: 600;
}

.book-container {
  position: relative;
}

.book-container .remove-btn {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 15px;
  height: 15px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.15s;
}

.book-container:hover .remove-btn {
  opacity: 1;
  z-index: 99;
}

.rating-zone .book-container {
  width: 76px;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
  cursor: grab;
  user-select: none;
}

.rating-zone .book-container:hover {
    transform: translateY(-4px) rotate(1.5deg) scale(1.03);
}

.rating-zone .book-container:hover .cover-frame img {
    transform: scale(1.05);
}

.rating-zone .book-container .cover-frame img[data-v-f4ad0d37] {
    display: block;
    vertical-align: middle;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-width: 100%;
}


</style>
