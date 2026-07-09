import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { type BookSearchTarget, bookKey } from '@/types/book'
import { KakaoApiError } from '@/api/kakaoClient'
import { useBookSearch } from '@/features/books/hooks/useBookSearch'
import { useBookSearchInfinite } from '@/features/books/hooks/useBookSearchInfinite'
import { BookSearchForm } from '@/features/books/components/BookSearchForm'
import { BookList } from '@/features/books/components/BookList'
import { SearchCountText } from '@/features/books/components/SearchCountText'
import { getTotalPages, isBookSearchTarget } from '@/features/books/constants'
import { NoData } from '@/components/ui/NoData'
import { Pagination } from '@/components/ui/Pagination'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { uniqueBy } from '@/utils/uniqueBy'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const rawTarget = searchParams.get('target')
  const target: BookSearchTarget | undefined = isBookSearchTarget(rawTarget)
    ? rawTarget
    : undefined
  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  // 데스크톱: 페이지네이션 / 모바일: 무한 스크롤 (활성화된 쪽만 요청)
  const isMobile = useIsMobile()
  const paged = useBookSearch({ query, target, page, enabled: !isMobile })
  const infinite = useBookSearchInfinite({ query, target, enabled: isMobile })

  const active = isMobile ? infinite : paged
  const errorMessage =
    active.error instanceof KakaoApiError
      ? active.error.userMessage
      : '검색 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'

  const books = isMobile
    ? uniqueBy(infinite.data?.pages.flatMap((p) => p.documents) ?? [], bookKey)
    : (paged.data?.documents ?? [])
  const totalCount = isMobile
    ? (infinite.data?.pages[0]?.meta.total_count ?? 0)
    : (paged.data?.meta.total_count ?? 0)
  const totalPages = getTotalPages(paged.data?.meta.pageable_count ?? 0)

  // 모바일 무한 스크롤: 센티넬이 보이면 다음 페이지 로드
  const fetchNextPage = infinite.fetchNextPage
  const onLoadMore = useCallback(() => {
    fetchNextPage()
  }, [fetchNextPage])
  const sentinelRef = useInfiniteScroll({
    hasMore: !!infinite.hasNextPage,
    onLoadMore,
    disabled: !isMobile || infinite.isFetchingNextPage,
  })

  // 데스크톱 페이지 이동 (검색어/타깃 유지, 상단으로 스크롤)
  const goToPage = (nextPage: number) => {
    const params: Record<string, string> = { q: query }
    if (target) params.target = target
    if (nextPage > 1) params.page = String(nextPage)
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 전체 검색: target 제거(→ page도 초기화). 상세 검색: target 유지(→ page 초기화).
  const handleNormalSearch = (keyword: string) => {
    setSearchParams(keyword ? { q: keyword } : {})
  }
  const handleDetailSearch = (nextTarget: BookSearchTarget, keyword: string) => {
    setSearchParams({ q: keyword, target: nextTarget })
  }

  const showResults = !active.isLoading && !active.isError && books.length > 0

  return (
    <section>
      <h1 className="mb-6 text-title2 font-bold">도서 검색</h1>

      <BookSearchForm
        keyword={target ? '' : query}
        onNormalSearch={handleNormalSearch}
        onDetailSearch={handleDetailSearch}
      />

      <div className="mt-6">
        {/* 검색어가 있으면 "검색어" 검색 결과 총 N건, 없으면 검색 결과 총 0건 */}
        <SearchCountText
          label="검색 결과"
          count={totalCount}
          keyword={query || undefined}
        />
      </div>

      {active.isLoading && (
        <p className="py-24 text-center text-body2 text-text-secondary">
          검색 중입니다…
        </p>
      )}

      {active.isError && (
        <p className="py-24 text-center text-body2 text-red">{errorMessage}</p>
      )}

      {!active.isLoading && !active.isError && books.length === 0 && (
        <NoData message="검색된 결과가 없습니다." />
      )}

      {showResults && (
        <>
          <div className="mt-4">
            <BookList books={books} />
          </div>

          {isMobile ? (
            <>
              <div ref={sentinelRef} aria-hidden="true" />
              {infinite.isFetchingNextPage && (
                <p className="py-6 text-center text-body2 text-text-secondary">
                  불러오는 중…
                </p>
              )}
            </>
          ) : (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </section>
  )
}
