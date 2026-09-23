<script setup lang="ts">
import type { Book } from '@/types'

const props = defineProps<{
  book: Book
  inZone?: boolean
}>()
</script>

<template>
  <div
    class="book-item"
    :class="{ 'in-zone': inZone }"
    :title="`${book.title}, Rating: ${book.general_rating}`"
  >
    <div class="cover-frame">
      <img v-if="book.cover" :src="book.cover" :alt="book.title" width="100" />
    </div>
    <span class="book-name">{{ book.title }}</span>
    <p>
      Rating: <span>{{ book.general_rating }}</span>
    </p>
  </div>
</template>

<style scoped>
.book-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  z-index: 99;
  position: relative;
  width: 100%;
}

.book-item span,
.book-item.in-zone .book-name {
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.book-item p {
  margin-top: 2px;
  font-size: 9px;
  color: rgb(100 116 139);
  font-weight: 500;
}

.book-item p span {
  color: rgb(51 65 85);
  font-weight: 700;
}

.book-item img {
  border-radius: 7px;
  width: 100px;
  height: 150px;
}

.book-item.in-zone img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
}

.book-item.in-zone p {
  bottom: 10px;
  font-size: 11px;
}

.cover-frame {
  overflow: hidden;
  background-color: rgb(241 245 249);
  width: 72px;
  height: 100px;
  display: flex;
  margin-bottom: 4px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.book-list .book-item-wrapper:hover .cover-frame img {
  transform: scale(1.05);
}

.book-list .book-item-wrapper .cover-frame img {
  display: block;
  vertical-align: middle;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 100%;
}

.book-item.in-zone,
.book-item.in-zone .cover-frame {
  background-color: unset;
  border: unset;
  box-shadow: unset;
}


</style>
