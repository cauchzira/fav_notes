<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { NoteAttributes } from './metadata/dataAttributes'
import DelIcon from '../../assets/img/delete.svg?component'
import FavIcon from '../../assets/img/fav.svg?component'

export default defineComponent({
  name: 'Note',
  emits: ['setAuthor', 'delFav'],
  components: {
    DelIcon,
    FavIcon,
  },
  props: {
    note: {
      type: Object as PropType<NoteAttributes>,
      required: true,
    },
    canClick: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const getAuthor = (author: NoteAttributes['author']) => {
      if (!props.canClick) return

      emit('setAuthor', author)
    }

    const addToFav = (note: NoteAttributes) => {
      window.localStorage.setItem(note._id, JSON.stringify(note))
    }

    const deleteFromFav = (id: NoteAttributes['_id']) => {
      window.localStorage.removeItem(id)

      emit('delFav')
    }

    return {
      getAuthor,
      addToFav,
      deleteFromFav,

      DelIcon,
      FavIcon,
    }
  },
})
</script>

<template>
  <div class="">
    <span class="notes_item-author" @click="() => getAuthor(note.author)">{{
      note.author
    }}</span>

    <p class="notes_item-content">{{ note.content }}</p>

    <div class="notes_item-btns">
      <button @click="() => addToFav(note)" class="notes_item-btn btn-fav">
        <FavIcon class="notes_item-btn-icon" />
      </button>
      <button
        @click="() => deleteFromFav(note._id)"
        class="notes_item-btn btn-del"
      >
        <DelIcon class="notes_item-btn-icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.notes {
  &_item {
    position: relative;
    flex: 1 1 40%;
    background: azure;
    margin: 6px;
    padding: 25px;
    border-radius: 4px;
    min-height: 140px;
  }

  &_item-author {
    display: inline-block;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
    cursor: pointer;
  }

  &_item-btns {
    display: flex;
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  &_item-btn {
    display: flex;
    justify-content: center;
    background: transparent;
    border-radius: 6px;
    outline: none;
    border: none;
    width: 31px;
    height: 31px;
    margin-right: 8px;
    cursor: pointer;

    &-icon {
      width: 30px;
      height: 30px;
    }
  }
}

.btn-fav {
  transition: background-color 0.5s ease;
  background-color: #99bc85;

  &:hover {
    background-color: #bfd8af;
  }
}

.btn-del {
  transition: background-color 0.5s ease;
  background-color: #b06161;

  &:hover {
    background-color: #dc8686;
  }
}
</style>
