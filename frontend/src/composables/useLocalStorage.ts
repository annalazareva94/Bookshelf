// type Ref — это TypeScript-тип (импортируется только для типизации, в рантайме не существует).
// Ref<T> — тип «реактивная обёртка вокруг T».
import { ref, watch, type Ref } from 'vue'

// <T> — это generic, то есть «тип-параметр».
// Это значит, что при вызове useLocalStorage<Book[]>('booksList',
// []) Vue поймёт, что внутри лежит Book[], и подсветит ошибки типов.
// Возвращаем Ref<T> — реактивную переменную с тем же типом, что и default.
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const saved = localStorage.getItem(key)

  // Заводим переменную initial (объявлена через let, потому что будем её менять)
  // и по умолчанию кладём туда defaultValue.
  // Это запасной вариант, если в localStorage ничего нет или там сломанный JSON.
  let initial = defaultValue

  if (saved) {
    try {
      initial = JSON.parse(saved)
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage`, e)
    }
  }

  const value = ref(initial) as Ref<T>

  // Следим за value. Каждый раз, когда значение меняется, колбэк пишет обновлённый JSON в localStorage.
  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  // Третий аргумент { deep: true } — критичный. Без него Vue следит только за ссылкой на объект/массив
  // (то есть если вы замените массив целиком).
  // С deep: true — следит за изменениями внутри, например books.value.push(...) или books.value[0].title = 'new'.
  // У вас в редакторе массивы мутируются внутри, поэтому deep обязателен.

  return value
}
