interface BookModelType {
  name: string
  author: string
  publisher: string
  publishingYear: number
  category: string
  format: string[]
  summary?: string
  quantity?: number
  images: string[]
  coverImage?: string
  language?: string
}

export { BookModelType }
