import { type Book, bookKey } from '@/types/book'
import { HeartFillIcon, HeartOutlineIcon } from '@/components/ui/icons'
import { toast } from '@/components/ui/toast'
import { cn } from '@/utils/cn'
import { favoritesStore } from '../favoritesStore'
import { useIsFavorite } from '../useFavorites'

interface FavoriteButtonProps {
  book: Book
  size?: number
}

/**
 * 책 썸네일 위에 얹는 찜(하트) 토글 버튼.
 * 안 찜: 회색 외곽선 하트 / 찜: 빨간 채움 하트.
 * hover 시 살짝 커지고(scale-110) 빨간색으로 강조됩니다.
 */
export const FavoriteButton = ({ book, size = 16 }: FavoriteButtonProps) => {
  const favorited = useIsFavorite(bookKey(book))
  const HeartIcon = favorited ? HeartFillIcon : HeartOutlineIcon

  const handleClick = () => {
    favoritesStore.toggle(book)
    // toggle 이후 상태는 현재(favorited)의 반대
    toast.show(favorited ? '찜을 해제했어요.' : '내가 찜한 책에 담았어요.')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={favorited}
      aria-label={favorited ? '찜 해제' : '찜하기'}
      className={cn(
        'absolute top-1.5 right-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]',
        'transition duration-150 hover:scale-125 hover:text-red',
        favorited ? 'text-red' : 'text-palette-gray',
      )}
    >
      <HeartIcon width={size} height={size} />
    </button>
  )
}
