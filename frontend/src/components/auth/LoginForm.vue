<template>
  <BaseForm v-model="isOpen" :error="errorMessage" submit-label="Login" @submit="handleLogin">
    <template #fields>
      <label for="email">Enter your Email:</label>
      <input type="email" id="email" name="email" v-model="email" required>
      <label for="password">Enter your password:</label>
      <input type="password" id="password" name="password" v-model="password" required>
      <router-link :to="{ name: 'register' }" @click="isOpen = false" >
        Register if you don't have an account
      </router-link>

    </template>
  </BaseForm>

</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/useAuthStore'
  import BaseForm from '../BaseForm.vue'
  import { ref } from "vue";
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const authStore = useAuthStore()

  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');

  const isOpen = defineModel<boolean>()

  const handleLogin = () => {
  if (authStore.checkUser(email.value, password.value)) {
    authStore.login(email.value)
    isOpen.value = false
    errorMessage.value = ''
    email.value = ''
    password.value = ''
    router.push('/user-profile');
  } else {
    errorMessage.value = 'Wrong email or password'
  }
}

</script>
