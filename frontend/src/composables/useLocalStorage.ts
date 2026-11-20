// type Ref — this is a TypeScript type (imported solely for type-checking purposes; it does not exist at runtime).
// Ref<T> —"reactive wrapper around T" type.
import { ref, watch, type Ref } from 'vue'

// <T> — This is a generic, or in other words, a "type parameter."
// This means that when calling `useLocalStorage<Book[]>('booksList', [])`,
// Vue will understand that it contains a `Book[]` and will highlight any type errors.
// It returns a `Ref<T>` — a reactive variable with the same type as the `default` value.
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const saved = localStorage.getItem(key)

  // We create a variable named `initial` (declared using `let` because we intend to change it).
  // and by default, we put `defaultValue` in there.
  // This is a fallback option for cases where there is nothing in localStorage or the JSON there is broken.
  let initial = defaultValue

  if (saved) {
    try {
      initial = JSON.parse(saved)
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage`, e)
    }
  }

  const value = ref(initial) as Ref<T>

  // We track the `value`. Each time the value changes, the callback writes the updated JSON to `localStorage`.
  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  // The third argument, `{ deep: true }`, is critical. Without it, Vue only tracks the reference to the object or array
  //   // (i.e., it only detects changes if you replace the entire array).
  //   // With `deep: true`, it tracks internal changes—for example, `books.value.push(...)` or `books.value[0].title = 'new'`.
  //   // Since your arrays are being mutated internally within the editor, `deep` is mandatory.

  return value
}
