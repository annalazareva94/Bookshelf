<script setup lang="ts">
import bookIcon from '@/assets/img/books.svg'
import { useEditorStore } from '@/stores/editor'
import CreateBook from '@/components/CreateBook.vue'
import BookList from '@/components/BookList.vue'
import TemplateBookshelf from '@/components/TemplateBookshelf.vue'
import type { Book } from '@/types'
import { computed } from 'vue'

const store = useEditorStore()

const bookCounter = computed(() => {

  if (store.libraryBooks.length === 1) {
    return `${store.libraryBooks.length} book`
  } else {
    return `${store.libraryBooks.length} books`
  }
})

// ─── Обработчики событий от дочерних компонентов ───

function handleBookCreated(book: Omit<Book, 'id'>) {
  store.addBook(book)
}

function handleDeleteBook(book: Book) {
  store.deleteBook(book)
}

function handleRenameRating(ratingId: number, newName: string) {
  store.renameRating(ratingId, newName)
}

function handleRemoveBookFromRating(book: Book, ratingId: number) {
  store.removeBookFromRating(book, ratingId)
}
</script>

<template>
  <div class="editor">
    <div class="shelf-block">
      <!-- Левая колонка: полка с рейтингами -->
      <TemplateBookshelf
        :template="store.template"
        @rename-rating="handleRenameRating"
        @remove-book="handleRemoveBookFromRating"
      />

      <!-- Правая колонка: библиотека -->
      <div class="library">
        <div class="library-form">
          <h1>Library</h1>
          <CreateBook @book-created="handleBookCreated" />
        </div>

        <div class="undistributed-books">
          <div class="books-staff">
            <img :src="bookIcon" />
            <h3> UNSORTED BOOKS</h3>
            <span>{{ bookCounter }}</span>
          </div>
          <input
            type="search"
            v-model="store.searchQuery"
            placeholder="🔍 Quick search..."
            class="filter-search filter-style"
          />
          <BookList v-model:books="store.libraryBooks" @delete-book="handleDeleteBook" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shelf-block {
  margin-top: 30px;
  display: grid;
  align-items: flex-start;
  gap: 20px;
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.library {
  display: grid;
  gap: 20px;
  grid-column: span 5 / span 5;
}

.library > div {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow:
    0 10px 30px -5px rgba(0, 0, 0, 0.04),
    0 4px 10px -2px rgba(0, 0, 0, 0.02);
  border-radius: 18px;
  padding: 20px;
}

.library-form h1 {
  margin: 0;
  font-size: 20px;
  color: rgb(51 65 85);
  font-weight: 800;
}

.books-staff {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.books-staff img {
  max-width: 30px;
}

.books-staff h3 {
  font-size: 18px;
  font-weight: 800;
}

.books-staff span {
  margin-left: auto;
  color: rgb(79 70 229);
  font-weight: 600;
  font-size: 11px;
  padding: 2px 8px;
  background-color: rgb(238 242 255);
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
}

.undistributed-books input {
  color: rgb(51 65 85);
  font-size: 12px;
  line-height: 16px;
  opacity: 0.7;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s ease;
  width: 100%;
  margin-bottom: 12px;
}

.undistributed-books input:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
}
</style>
