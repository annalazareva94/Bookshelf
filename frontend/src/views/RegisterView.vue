<!--необходимо будет добавить ui ждля проверки почты-->

<template>
  <form @submit.prevent="handleRegister">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <label for="name">First name *</label>
    <input id="name" name="name" v-model="name" required />
    <label for="surname">Last name *</label>
    <input id="surname" name="surname" v-model="surname" required />
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" v-model="email" required />
    <label for="password">Password *</label>
    <input type="password" id="password" name="password" v-model="password" required />
    <label for="confirmPassword">Confirm password *</label>
    <input type="password" id="confirmPassword" name="password" v-model="confirmPassword" required />
    <input type="checkbox" id="agreement" name="agreement" v-model="agreement" checked />
    <label for="agreement">Consent to Data Processing</label>
    <p>* - required fields</p>
    <button type="submit">Register</button>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreement = ref(false)

const errorMessage = ref('')

const handleRegister = () => {
  errorMessage.value = ''

  //Проверить, что все поля заполнены (не пустые строки).
  if (
    [name.value, surname.value, email.value, password.value, confirmPassword.value].some(
      (field) => !field.trim(),
    )
  ) {
    errorMessage.value = 'Fields are required'
    return
  }

  //Проверить, что пароль содержит не менее 6 символов (можно больше).
  if (password.value.length < 6) {
    errorMessage.value = 'Too short password'
    return
  }

  //Проверить, что password совпадает с confirmPassword.
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  //Проверить, что agreement равно true (пользователь согласился).
  if (agreement.value !== true) {
    //здесь нужно будет заблокировать кнопку "зарегестрироваться"
    errorMessage.value = 'There consent to Data Processing is needed for registration'
    return
  }

  //Проверить, что email корректен (можно проверкой на наличие @ и точки).
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    errorMessage.value = 'Enter correct email (example: user@gmail.com)'
    return
  }

  const result = authStore.register(
    name.value,
    surname.value,
    email.value,
    password.value,
  )

  if (result) {
    router.push('/user-profile') // Успех — на страницу пользователя
  } else {
    errorMessage.value = 'This email is already in our base' // Ошибка
  }
  //Сохранить нового пользователя
  authStore.register(name.value, surname.value, email.value, password.value)

  //это временное решение до коннекта с бэком. потом автологин надо будет убрать, так как будетп роверка по почте
  authStore.login(email.value)
}
</script>

<style scoped></style>
