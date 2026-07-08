import { useInfiniteQuery } from '@tanstack/react-query'
import type { BookSearchParams } from '@/types/book'
import { searchBooks } from '../api/searchBooks'
import { PAGE_SIZE } from '../constants'

export const bookKeys = {
  all: ['books'] as const,
  search: (params: Omit<BookSearchParams, 'page'>) =>
    [...bookKeys.all, 'search', params] as const,
}

type UseBookSearchParams = Omit<BookSearchParams, 'page' | 'size'>

/**
 * Infinite (page-based) book search backed by React Query.
 * The query stays disabled until a non-empty keyword is provided so we
 * never fire a request for an empty search box.
 */
export const useBookSearch = (params: UseBookSearchParams) => {
  const query = params.query.trim()

  return useInfiniteQuery({
    queryKey: bookKeys.search({ ...params, query }),
    queryFn: ({ pageParam, signal }) =>
      searchBooks({ ...params, query, page: pageParam, size: PAGE_SIZE }, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.meta.is_end ? undefined : allPages.length + 1,
    enabled: query.length > 0,
  })
}
