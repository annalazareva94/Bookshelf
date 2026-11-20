<template>
  <form @submit.prevent="handleRegister">
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <label for="username">Username *</label>
    <input id="username" name="username" v-model="username" required />
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" v-model="email" required />
    <label for="password">Password *</label>
    <input type="password" id="password" name="password" v-model="password" required />
    <label for="confirmPassword">Confirm password *</label>
    <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" required />
    <input type="checkbox" id="agreement" name="agreement" v-model="agreement" />
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

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreement = ref(true)

const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''

  //all fields filled verification
  if (
    [username.value, email.value, password.value, confirmPassword.value].some(
      (field) => !field.trim(),
    )
  ) {
    errorMessage.value = 'Fields are required'
    return
  }

  //password length verification
  if (password.value.length < 6) {
    errorMessage.value = 'Too short password'
    return
  }

  // password == confirmPassword verification
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  // agreement verification
  if (agreement.value !== true) {
    //здесь нужно будет заблокировать кнопку "зарегестрироваться"
    errorMessage.value = 'There consent to Data Processing is needed for registration'
    return
  }

  //email verification (presence of an @ symbol and a dot).
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    errorMessage.value = 'Enter correct email (example: user@gmail.com)'
    return
  }

  const result = await authStore.register(
    username.value,
    email.value,
    password.value,
  )

  if (result.success) {
    //its temporary decision, before connecting to backend.
    // we will remove autologin afterwards autologin, because we will have an email verification
    await authStore.login(email.value, password.value)

    const loginResult = await authStore.login(email.value, password.value)
    if (loginResult.success) {
      router.push('/user-profile')
    } else {
      errorMessage.value = loginResult.message
      router.push('/login')
    }
  }


}
</script>

<style scoped></style>
