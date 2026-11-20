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
  interface User {
    id: number
    username: string
    email: string
  }

  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)
  const TOKEN_KEY = 'token'

  // const resetAuth = () = {
  //   user.value = null
  //   localStorage.removeItem(TOKEN_KEY)
  // }


  const checkAuth = async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if(!token) {
      user.value = null
      return
    } else {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if(!response.ok) {
          localStorage.removeItem(TOKEN_KEY)
          user.value = null
          return
        } else {
          user.value = await response.json();
        }
      } catch (e) {
        console.error('checkAuth failed:', e)
        user.value = null
        localStorage.removeItem(TOKEN_KEY)
      }
    }

  };

  const login = async (email: string, password: string) => {
    try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if(!response.ok) {
          const data = await response.json();
          return { success: false, message: data.detail }
        } else {
          const data = await response.json();
          const accessToken = data.access_token;
          localStorage.setItem(TOKEN_KEY, accessToken)
          await checkAuth()
          return { success: true }
        }
      } catch (error) {
        return { success: false, message: 'Сервер недоступен' }
      }
  }


  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY)
    user.value = null
  }


  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {

    try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if(!response.ok) {
          return { success: false, message: data.detail }
        } else {
          return { success: true }
        }
      } catch (error) {
        return { success: false, message: 'Сервер недоступен' }
      }
  }

  const userEmail = computed(() => user.value?.email ?? '')

  const userData = computed(() => user.value)

  return {
    isAuthenticated,
    login,
    logout,
    userEmail,
    checkAuth,
    register,
    userData
  }
})
