import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { BookSearchTarget } from '@/types/book'
import { KakaoApiError } from '@/api/kakaoClient'
import { useBookSearch } from '@/features/books/hooks/useBookSearch'
import { BookSearchForm } from '@/features/books/components/BookSearchForm'
import { BookList } from '@/features/books/components/BookList'
import { SearchCountText } from '@/features/books/components/SearchCountText'
import { NoData } from '@/components/ui/NoData'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const target = (searchParams.get('target') as BookSearchTarget | null) ?? undefined

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useBookSearch({ query, target })

  // 상태코드별 한글 메시지가 있으면 그걸, 아니면 기본 문구를 보여줍니다.
  const errorMessage =
    error instanceof KakaoApiError
      ? error.userMessage
      : '검색 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'

  const books = data?.pages.flatMap((page) => page.documents) ?? []
  const totalCount = data?.pages[0]?.meta.total_count ?? 0

  const onLoadMore = useCallback(() => fetchNextPage(), [fetchNextPage])
  const sentinelRef = useInfiniteScroll({
    hasMore: hasNextPage,
    onLoadMore,
    disabled: isFetchingNextPage,
  })

  // Normal search: drop the detail target. Detail search: keep both.
  const handleNormalSearch = (keyword: string) => {
    setSearchParams(keyword ? { q: keyword } : {})
  }
  const handleDetailSearch = (nextTarget: BookSearchTarget, keyword: string) => {
    setSearchParams({ q: keyword, target: nextTarget })
  }

  const showResults = !isLoading && !isError && books.length > 0

  return (
    <section>
      <h1 className="mb-6 text-title2 font-bold">도서 검색</h1>

      <BookSearchForm
        keyword={target ? '' : query}
        onNormalSearch={handleNormalSearch}
        onDetailSearch={handleDetailSearch}
      />

      <div className="mt-6">
        <SearchCountText label="도서 검색 결과" count={totalCount} />
      </div>

      {isLoading && (
        <p className="py-24 text-center text-body2 text-text-secondary">
          검색 중입니다…
        </p>
      )}

      {isError && (
        <p className="py-24 text-center text-body2 text-red">{errorMessage}</p>
      )}

      {!isLoading && !isError && books.length === 0 && (
        <NoData message="검색된 결과가 없습니다." />
      )}

      {showResults && (
        <>
          <div className="mt-4">
            <BookList books={books} />
          </div>
          <div ref={sentinelRef} aria-hidden="true" />
          {isFetchingNextPage && (
            <p className="py-6 text-center text-body2 text-text-secondary">
              불러오는 중…
            </p>
          )}
        </>
      )}
    </section>
  )
}
