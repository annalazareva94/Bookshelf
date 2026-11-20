import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import {useAuthStore} from "@/stores/useAuthStore";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const auth = useAuthStore()
try {
   await auth.checkAuth()
 } catch (e) {
   console.error(e)
 }

app.mount('#app')
