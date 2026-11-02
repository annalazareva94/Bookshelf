<script setup lang="ts">
import mainIcon from '@/assets/img/icon.svg'
import { useAuthStore } from '@/stores/useAuthStore'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useRouter } from 'vue-router'
import {ref} from "vue";

const authStore = useAuthStore()
const router = useRouter()
const showModal = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="app-header">
    <div class="logo-block">
      <img :src="mainIcon" />
      <h1>Bookshelf</h1>
    </div>

    <button
      v-if="!authStore.isAuthenticated"
      @click="showModal = true"
      class="login-btn"
    >
      Login / register
    </button>

    <div v-else class="user-block">
      <span class="user-email">{{ authStore.userEmail }}</span>
      <button @click="handleLogout" class="login-btn">
        Logout
      </button>
    </div>

    <LoginForm v-model="showModal" />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

.logo-block {
  display: flex;
  align-items: center;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.app-header h1 {
  margin: 0;
  font-weight: 500;
}

.login-btn {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 4px 10px -2px rgba(0, 0, 0, 0.02);
    border-radius: 18px;
    padding: 10px 20px;
    color: rgb(51 65 85);
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    cursor: pointer;
}
</style>
