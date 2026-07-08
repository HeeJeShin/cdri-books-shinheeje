import { useSearchParams } from 'react-router-dom'
import { useBookSearch } from '@/features/books/hooks/useBookSearch'
import { SearchBar } from '@/features/books/components/SearchBar'
import { BookList } from '@/features/books/components/BookList'
import { Button } from '@/components/ui/Button'

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') ?? ''

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useBookSearch({ query: keyword })

  const books = data?.pages.flatMap((page) => page.documents) ?? []
  const totalCount = data?.pages[0]?.meta.total_count ?? 0

  const handleSearch = (next: string) => {
    setSearchParams(next ? { q: next } : {})
  }

  return (
    <section className="py-6">
      <h1 className="mb-6 text-2xl font-bold">도서 검색</h1>

      <SearchBar onSearch={handleSearch} initialKeyword={keyword} />

      {keyword && (
        <p className="mt-6 text-sm text-text-secondary">
          도서 검색 결과 총{' '}
          <span className="font-bold text-primary">
            {totalCount.toLocaleString('ko-KR')}
          </span>
          건
        </p>
      )}

      <div className="mt-4">
        {isLoading && (
          <p className="py-20 text-center text-text-secondary">검색 중입니다…</p>
        )}

        {isError && (
          <p className="py-20 text-center text-accent-red">
            검색 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        {!isLoading && !isError && keyword && books.length === 0 && (
          <p className="py-20 text-center text-text-secondary">
            검색된 결과가 없습니다.
          </p>
        )}

        {!isError && books.length > 0 && (
          <>
            <BookList books={books} />
            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <Button
                  variant="secondary"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? '불러오는 중…' : '결과 더보기'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
