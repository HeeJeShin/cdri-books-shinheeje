import { useCallback, useState } from 'react'
import { useFavorites } from '@/features/favorites/useFavorites'
import { BookList } from '@/features/books/components/BookList'
import { SearchCountText } from '@/features/books/components/SearchCountText'
import { PAGE_SIZE } from '@/features/books/constants'
import { NoData } from '@/components/ui/NoData'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export const FavoritesPage = () => {
  const { favorites } = useFavorites()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const shown = favorites.slice(0, visibleCount)
  const hasMore = visibleCount < favorites.length

  const onLoadMore = useCallback(
    () => setVisibleCount((count) => count + PAGE_SIZE),
    [],
  )
  const sentinelRef = useInfiniteScroll({ hasMore, onLoadMore })

  return (
    <section>
      <h1 className="mb-6 text-title2 font-bold">내가 찜한 책</h1>

      <SearchCountText label="찜한 책" count={favorites.length} />

      {favorites.length === 0 ? (
        <NoData message="찜한 책이 없습니다." />
      ) : (
        <>
          <div className="mt-4">
            <BookList books={shown} />
          </div>
          <div ref={sentinelRef} aria-hidden="true" />
        </>
      )}
    </section>
  )
}
