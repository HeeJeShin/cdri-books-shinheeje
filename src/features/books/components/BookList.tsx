import type { Book } from '@/types/book'
import { BookListItem } from './BookListItem'

interface BookListProps {
  books: Book[]
}

export const BookList = ({ books }: BookListProps) => (
  <ul>
    {books.map((book) => (
      <BookListItem key={book.isbn || book.url} book={book} />
    ))}
  </ul>
)
