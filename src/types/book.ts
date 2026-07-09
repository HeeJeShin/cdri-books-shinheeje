/** A single book document returned by the Kakao Book Search API. */
export interface Book {
  authors: string[]
  contents: string
  datetime: string
  isbn: string
  price: number
  publisher: string
  sale_price: number
  status: string
  thumbnail: string
  title: string
  translators: string[]
  url: string
}

/** Pagination metadata from the Kakao search response. */
export interface BookSearchMeta {
  /** Total number of matched documents. */
  total_count: number
  /** Number of documents exposable via pagination. */
  pageable_count: number
  /** Whether the current page is the last one. */
  is_end: boolean
}

export interface BookSearchResponse {
  documents: Book[]
  meta: BookSearchMeta
}

export type BookSort = 'accuracy' | 'latest'
export type BookSearchTarget = 'title' | 'person' | 'publisher'

export interface BookSearchParams {
  query: string
  sort?: BookSort
  target?: BookSearchTarget
  page?: number
  size?: number
}

/** 도서 고유 키 (ISBN 우선, 없으면 상세 URL). 목록 key·찜·중복제거에서 공용. */
export const bookKey = (book: Pick<Book, 'isbn' | 'url'>): string =>
  book.isbn || book.url
