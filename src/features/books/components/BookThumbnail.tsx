import type { Book } from '@/types/book'
import { FavoriteButton } from '@/features/favorites/components/FavoriteButton'
import { cn } from '@/utils/cn'

interface BookThumbnailProps {
  book: Book
  className?: string
  heartSize?: number
}

export const BookThumbnail = ({
  book,
  className,
  heartSize = 16,
}: BookThumbnailProps) => (
  <div className={cn('relative shrink-0 overflow-hidden rounded', className)}>
    {book.thumbnail ? (
      <img
        src={book.thumbnail}
        alt={book.title}
        className="h-full w-full bg-palette-lightgray object-cover"
        loading="lazy"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-palette-lightgray text-small text-text-subtitle">
        No Image
      </div>
    )}
    <FavoriteButton book={book} size={heartSize} />
  </div>
)
