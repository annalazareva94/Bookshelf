<!--это базовый темплейт для модалок, его структуру и стили можно будет переиспользовать под другие модалки на сайте-->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay modal-content" @click.self="emit('update:modelValue', false)">
          <form class="form-body" @submit.prevent="handleSubmit">
            <p v-if="error" class="error">{{ error }}</p>


            <slot name="fields" />

            <div class="actions">
              <button type="submit">{{ submitLabel }}</button>
              <button type="button" @click="emit('update:modelValue', false)">Cancel</button>
            </div>
          </form>
      </div>
    </Transition>
  </Teleport>

</template>

<script setup lang="ts">
  import {  defineProps, defineEmits  } from 'vue'

  const emit = defineEmits(['update:modelValue', 'submit'])
  const props = defineProps({
    modelValue: Boolean,
    error: String,
    submitLabel: { type: String, default: 'Save' }
  })




  const handleSubmit = () => {

    emit('submit')
  }



</script>

<style scoped>

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Начальное состояние (перед появлением) */
  .modal-enter-from {
    opacity: 0;
  }

  /*:deep() позволяет применять стили родителя к элементам дочерних компонентов.*/
  .modal-enter-from :deep(.form-body) {
    transform: translateY(-50px);
    opacity: 0;
  }

  /* Конечное состояние (после появления) */
  .modal-enter-to {
    opacity: 1;
  }
  .modal-enter-to :deep(.form-body) {
    transform: translateY(0);
    opacity: 1;
  }

  /* Состояние при уходе (начало исчезновения) */
  .modal-leave-from {
    opacity: 1;
  }
  .modal-leave-from :deep(.form-body) {
    transform: translateY(0);
    opacity: 1;
  }

  /* Состояние после завершения исчезновения */
  .modal-leave-to {
    opacity: 0;
  }
  .modal-leave-to :deep(.form-body) {
    transform: translateY(-50px);
    opacity: 0;
  }

  /* Плавность переходов */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .modal-enter-active :deep(.form-body),
  .modal-leave-active :deep(.form-body) {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .form-body {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 15px;
    min-width: 500px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }


</style>
