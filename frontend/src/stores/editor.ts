import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Book, Rating, Template } from '@/types'

const DEFAULT_TEMPLATE: Template = {
  ratings: [5, 4, 3, 2, 1].map((n) => ({
    id: n,
    name: `Rating ${n}`,
    rating: n,
    books: [],
  })),
}

function loadFromStorage<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key)
  if (!saved) return fallback
  try {
    return JSON.parse(saved) as T
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e)
    return fallback
  }
}

export const useEditorStore = defineStore('editor', () => {
  // ─── State ───
  const template = ref<Template>(loadFromStorage('bookshelfTemplate', DEFAULT_TEMPLATE))
  const libraryBooks = ref<Book[]>(loadFromStorage('booksList', []))
  const searchQuery = ref('')

  // ─── Persistence ───
  watch(template, (v) => localStorage.setItem('bookshelfTemplate', JSON.stringify(v)), {
    deep: true,
  })
  watch(libraryBooks, (v) => localStorage.setItem('booksList', JSON.stringify(v)), { deep: true })

  // ─── Actions ───
  function addBook(newBook: Omit<Book, 'id'>) {
    libraryBooks.value.push({ ...newBook, id: Date.now() })
  }

  function deleteBook(book: Book) {
    libraryBooks.value = libraryBooks.value.filter((b) => b.id !== book.id)
  }

  function renameRating(ratingId: number, newName: string) {
    const rating = template.value.ratings.find((r) => r.id === ratingId)
    if (rating) {
      rating.name = newName
    }
  }

  function removeBookFromRating(book: Book, ratingId: number) {
    const rating = template.value.ratings.find((r) => r.id === ratingId)
    if (!rating) return

    rating.books = rating.books.filter((b) => b.id !== book.id)

    // Если книги нет ни в одной зоне — вернуть в библиотеку
    const stillUsed = template.value.ratings.some((r) => r.books.some((b) => b.id === book.id))
    if (!stillUsed && !libraryBooks.value.some((b) => b.id === book.id)) {
      libraryBooks.value.push(book)
    }
  }

  return {
    template,
    libraryBooks,
    searchQuery,
    addBook,
    deleteBook,
    renameRating,
    removeBookFromRating,
  }
})
