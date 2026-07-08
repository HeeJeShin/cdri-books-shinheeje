import type { Book } from '@/types/book'
import { HeartIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'
import { favoriteKey, favoritesStore } from '../favoritesStore'
import { useIsFavorite } from '../useFavorites'

interface FavoriteButtonProps {
  book: Book
  size?: number
}

/** Heart toggle overlaid on a book thumbnail. */
export const FavoriteButton = ({ book, size = 16 }: FavoriteButtonProps) => {
  const favorited = useIsFavorite(favoriteKey(book))

  return (
    <button
      type="button"
      onClick={() => favoritesStore.toggle(book)}
      aria-pressed={favorited}
      aria-label={favorited ? '찜 해제' : '찜하기'}
      className={cn(
        'absolute top-1.5 right-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-colors',
        favorited ? 'text-red' : 'text-white hover:text-red/70',
      )}
    >
      <HeartIcon filled width={size} height={size} strokeWidth={1.5} />
    </button>
  )
}
