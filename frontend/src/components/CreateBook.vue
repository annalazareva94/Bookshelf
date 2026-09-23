<script setup lang="ts">
import { ref } from 'vue'
import uploadIcon from '@/assets/img/upload-icon.svg'

const emit = defineEmits<{
  (e: 'book-created', book: { title: string; general_rating: number; cover: string }): void
}>()

const title = ref('')
const imageFile = ref<File | null>(null)
const rating = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  imageFile.value = target.files?.[0] ?? null
}

const handleSubmit = async () => {
  // В Vue новая форма e.preventDefault() не нужна, если используем @submit.prevent в шаблоне.

  const ratingNumber = parseFloat(rating.value)
  if (isNaN(ratingNumber)) {
    alert('Enter a valid rating')
    return
  }

  const newBook = {
    title: title.value.trim(),
    general_rating: ratingNumber,
  }

  const coverDataUrl = await new Promise<string>((resolve, reject) => {
    if (!imageFile.value) {
      reject(new Error('No file selected'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(imageFile.value)
  })

  emit('book-created', { ...newBook, cover: coverDataUrl })

  // сброс формы
  title.value = ''
  imageFile.value = null
  rating.value = ''

  // чистим input type=file, иначе выбранный файл останется в UI
  if (fileInputRef.value) fileInputRef.value.value = ''
}
</script>

<template>
  <form class="form-add-book" @submit.prevent="handleSubmit">
    <div>
      <label for="title">Book name</label>
      <input class="text-input" type="text" id="title" v-model="title" required />
    </div>

    <div class="image-input">
      <label for="image">Image</label>
      <img :src="uploadIcon" />
      <input
        type="file"
        id="image"
        ref="fileInputRef"
        @change="handleFileChange"
        accept="image/*"
        class="file-input"
      />
    </div>

    <div>
      <label for="rating">General rating</label>
      <input
        class="number-input"
        type="number"
        min="0.00"
        max="10.00"
        step="0.5"
        id="rating"
        v-model="rating"
        required
      />
      <span class="info-span">Maximum rating – 10</span>
    </div>

    <button type="submit">+ Add new book</button>
  </form>
</template>

<style scoped>
.form-add-book {
  gap: 8px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.form-add-book .text-input,
.form-add-book .number-input {
  color: rgb(30 41 59);
  font-size: 12px;
  line-height: 16px;
  padding: 6px 12px;
  flex: 1 1 0%;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-add-book input:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
}

.form-add-book input {
  margin-left: 10px;
}

.form-add-book button {
  border: unset;
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  background-color: #1e293b;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition:
    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.form-add-book button:hover {
  background-color: #334155;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.image-input {
  position: relative;
}

.image-input img {
  position: absolute;
  width: 15px;
  left: 115px;
  top: 6px;
}

.file-input::file-selector-button {
  color: rgb(51 65 85);
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  padding: 6px 10px 6px 29px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(203 213 225);
  border-radius: 6px;
  cursor: pointer;
}

.library-form label {
  color: rgb(51 65 85);
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  width: 96px;
  display: inline-block;
}

.file-input[type='file'],
.info-span {
  color: rgb(148 163 184);
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.info-span {
  margin-left: 5px;
}
</style>
