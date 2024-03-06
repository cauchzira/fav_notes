export type NoteAttributes = ReturnType<typeof dataAttributes>
const dataAttributes = () => ({
  id: '',
  content: '',
  author: '',
  authorSlug: '',
  length: 0,
  tags: [] as string[],
})

export default dataAttributes
