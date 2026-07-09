import { type Book, bookKey } from '@/types/book'
import { BookListItem } from './BookListItem'

interface BookListProps {
  books: Book[]
}

export const BookList = ({ books }: BookListProps) => (
  <ul>
    {books.map((book) => (
      <BookListItem key={bookKey(book)} book={book} />
    ))}
  </ul>
)
