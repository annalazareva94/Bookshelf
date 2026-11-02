<!--кнопка с ссылкой на элемент, в случае если пользователь ее добавил-->

<script setup lang="ts">

defineProps<{
  link: string
}>()

</script>

<template>
  <a class="link-btn" :href="link" target="_blank" rel="noopener noreferrer">
    🔗
  </a>
</template>

<style scoped>

.link-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px; /* 1rem */
  height: 16px;
  font-size: 10px;
  background-color: white;
  border-radius: 9999px;
  box-shadow:
    0 10px 30px -5px rgba(0, 0, 0, 0.04),
    0 4px 10px -2px rgba(0, 0, 0, 0.02);
  text-decoration: none;
  cursor: pointer;
}

</style>
