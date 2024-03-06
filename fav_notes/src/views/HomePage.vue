<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import NotesDataService from '../components/Notes/Services/NotesDataService.ts'
import type { NoteAttributes } from '../components/Notes/metadata/dataAttributes.ts'

import Note from '../components/Notes/Note.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Note,
  },
  setup() {
    const service = new NotesDataService()
    const randomNotes = ref<NoteAttributes[]>([])
    const notesByAuthor = ref<NoteAttributes[]>([])
    const byAuthor = ref<NoteAttributes['author']>('')

    const getNotesByAuthor = async (author: NoteAttributes['author']) => {
      const response = await service.getNotesByAuthor({
        query: author,
        fields: 'author',
        limit: 150,
      })

      if (response.results.length) {
        byAuthor.value = author
        notesByAuthor.value = response.results.filter(
          (note) => note.author === author,
        )
      }
    }

    const clearByAuthor = () => {
      byAuthor.value = ''
      notesByAuthor.value = []
    }

    onMounted(async (): Promise<void> => {
      try {
        const response = await service.getRandomNotes({
          limit: 10,
        })
        randomNotes.value = response
      } catch (error) {
        console.error('Error fetching random notes:', error)
      }
    })

    return {
      randomNotes,
      notesByAuthor,
      byAuthor,

      getNotesByAuthor,
      clearByAuthor,
    }
  },
})
</script>

<template>
  <section class="notes" v-if="!byAuthor && !notesByAuthor.length">
    <ul class="notes_list">
      <li v-for="note in randomNotes" :key="note.id" class="notes_item">
        <Note :can-click="true" :note="note" @setAuthor="getNotesByAuthor" />
      </li>
    </ul>
  </section>

  <section v-else class="notes_filtered">
    <h2 class="notes_current-author" @click="clearByAuthor">{{ byAuthor }}</h2>

    <ul class="notes_list">
      <li v-for="note in notesByAuthor" :key="note.id" class="notes_item">
        <Note :can-click="true" :note="note" @setAuthor="getNotesByAuthor" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.notes,
.notes_filtered {
  margin: 0 auto;
  width: 800px;

  &_current-author {
    font-size: 18px;
    display: flex;
    justify-content: center;
  }

  &_list {
    width: auto;

    @media (max-width: 1024px) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  }

  &_current-author {
    font-size: 36px;
    text-align: center;
    margin: 20px 0;
    cursor: pointer;
  }
}
</style>
