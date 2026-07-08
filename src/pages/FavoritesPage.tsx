import { useEffect, useState } from 'react'
import { useFavorites } from '@/features/favorites/useFavorites'
import { BookList } from '@/features/books/components/BookList'
import { SearchCountText } from '@/features/books/components/SearchCountText'
import { PAGE_SIZE } from '@/features/books/constants'
import { NoData } from '@/components/ui/NoData'
import { Pagination } from '@/components/ui/Pagination'

export const FavoritesPage = () => {
  const { favorites } = useFavorites()
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(favorites.length / PAGE_SIZE))
  const shown = favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // 찜을 지워서 현재 페이지가 비면 마지막 페이지로 되돌립니다.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const goToPage = (nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </section>
  )
}
