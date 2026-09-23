<script setup lang="ts">
import mainIcon from '@/assets/img/icon.svg'
</script>

<template>
  <header class="app-header">
    <img :src="mainIcon" />
    <h1>Bookshelf</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.app-header h1 {
  margin: 0;
  font-weight: 500;
}
</style>
