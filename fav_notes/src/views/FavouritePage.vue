<script setup lang="ts">
import { ref } from 'vue'
import { NoteAttributes } from '../components/Notes/metadata/dataAttributes.ts'
import Note from '../components/Notes/Note.vue'

const notes = ref<NoteAttributes[]>([])

notes.value = Object.entries(window.localStorage).map((item) =>
  JSON.parse(item[1]),
)

const delFav = () => {
  notes.value = Object.entries(window.localStorage).map((item) =>
    JSON.parse(item[1]),
  )
}

const clearAll = () => {
  notes.value = []

  window.localStorage.clear()
}
</script>

<template>
  <section class="notes" v-if="notes.length">
    <button class="notes_remove notes_item-btn btn-del" @click="clearAll">
      Remove all
    </button>

    <ul class="notes_list">
      <li v-for="note in notes" :key="note.id" class="notes_item">
        <Note @delFav="delFav" :note="note" />
      </li>
    </ul>
  </section>

  <section class="empty" v-else>
    <h2>Your favourite list is empty!</h2>
  </section>
</template>

<style scoped>
.notes {
  position: relative;
}

.btn-del {
  transition: background-color 0.5s ease;
  background-color: #b06161;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;

  &:hover {
    background-color: #dc8686;
  }
}

.notes_remove {
  position: absolute;

  top: -35px;
  right: 20px;
}

.empty {
  width: 200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 12px;
  border-radius: 4px;
}
</style>
