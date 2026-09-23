export interface Book {
  id: number
  title: string
  general_rating: number
  cover?: string
}

export interface Rating {
  id: number
  name: string
  rating: number
  books: Book[]
}

export interface Template {
  ratings: Rating[]
}
