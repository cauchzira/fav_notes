import apiClient from '../../../api/service/Client.ts'
import { NoteAttributes } from '../metadata/dataAttributes.ts'

export type SearchResult = {
  count: number
  page: number
  results: NoteAttributes[]
  totalCount: number
  totalPages: number
}

class NotesDataService {
  constructor() {}

  async getRandomNotes(params?: { limit: number }): Promise<NoteAttributes[]> {
    try {
      return await apiClient.get('/quotes/random', { params })
    } catch (error) {
      console.error('Error fetching random notes:', error)
      throw error
    }
  }

  async getNotesByAuthor(params: {
    query: string
    fields: string
    limit?: number
  }): Promise<SearchResult> {
    try {
      return await apiClient.get('/search/quotes', { params })
    } catch (error) {
      console.error('Error fetching notes by author:', error)
      throw error
    }
  }
}

export default NotesDataService
