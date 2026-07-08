import { useSearchParams } from 'react-router-dom'
import type { BookSearchTarget } from '@/types/book'
import { KakaoApiError } from '@/api/kakaoClient'
import { useBookSearch } from '@/features/books/hooks/useBookSearch'
import { BookSearchForm } from '@/features/books/components/BookSearchForm'
import { BookList } from '@/features/books/components/BookList'
import { SearchCountText } from '@/features/books/components/SearchCountText'
import { getTotalPages } from '@/features/books/constants'
import { NoData } from '@/components/ui/NoData'
import { Pagination } from '@/components/ui/Pagination'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const target = (searchParams.get('target') as BookSearchTarget | null) ?? undefined
  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  const { data, isLoading, isError, error } = useBookSearch({ query, target, page })

  // 상태코드별 한글 메시지가 있으면 그걸, 아니면 기본 문구를 보여줍니다.
  const errorMessage =
    error instanceof KakaoApiError
      ? error.userMessage
      : '검색 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'

  const books = data?.documents ?? []
  const totalCount = data?.meta.total_count ?? 0
  const totalPages = getTotalPages(data?.meta.pageable_count ?? 0)

  // 검색어/타깃을 유지한 채 페이지만 변경. 페이지 이동 시 상단으로 스크롤.
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
        {/* 검색어가 있으면 "검색어" 검색 결과 총 N건, 없으면 검색 결과 총 0건 */}
        <SearchCountText
          label="검색 결과"
          count={totalCount}
          keyword={query || undefined}
        />
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
