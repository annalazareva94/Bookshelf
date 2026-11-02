import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  const checkAuth = () => {
    const user = localStorage.getItem('user')
    isAuthenticated.value = !!user // true, если есть запись
  }

  const checkUser = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    return users.some((u: any) => u.email === email && u.password === password)
  }
  const login = (email: string) => {
    localStorage.setItem('user', JSON.stringify({ email }))
    isAuthenticated.value = true
  }

  const logout = () => {
    localStorage.removeItem('user')
    isAuthenticated.value = false
  }

  const register = (
    name: string,
    surname: string,
    email: string,
    password: string,
  ) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.some((u: any) => u.email === email)) {
      return { success: false, message: 'Этот email уже зарегистрирован' }
    }

    const newUser = {
      name,
      surname,
      email,
      password,
    }

    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))

    return { success: true }
  }

  const userEmail = computed(() => {
    const data = localStorage.getItem('user')
    return data ? JSON.parse(data).email : ''
  })

  const userData = computed(() => {
    const currentUser = localStorage.getItem('user')
    if (!currentUser) return null
    const email = JSON.parse(currentUser).email

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const foundUser = users.find((u: any) => u.email === email)

    return foundUser || null
  })

  checkAuth()

  return { isAuthenticated, login, logout, userEmail, checkAuth, register, checkUser, userData }
})
