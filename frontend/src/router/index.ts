import { createRouter, createWebHistory } from 'vue-router'

import EditorView from '@/views/EditorView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'editor', component: EditorView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/user-profile', name: 'profile', component: ProfileView },
  ],
})

export default router
