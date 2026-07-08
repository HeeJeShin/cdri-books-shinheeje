import { useInfiniteQuery } from '@tanstack/react-query'
import type { BookSearchParams } from '@/types/book'
import { KakaoApiError, isRetryableStatus } from '@/api/kakaoClient'
import { searchBooks } from '../api/searchBooks'
import { PAGE_SIZE } from '../constants'

// React Query 캐시 키. 검색 조건이 바뀌면 키가 달라져 자동으로 다시 조회됩니다.
export const bookKeys = {
  all: ['books'] as const,
  search: (params: Omit<BookSearchParams, 'page'>) =>
    [...bookKeys.all, 'search', params] as const,
}

type UseBookSearchParams = Omit<BookSearchParams, 'page' | 'size'>

/**
 * 페이지 단위 무한 도서 검색 훅 (React Query 기반).
 * 검색어가 비어 있으면 요청을 보내지 않도록 enabled로 막습니다.
 */
export const useBookSearch = (params: UseBookSearchParams) => {
  const query = params.query.trim()

  return useInfiniteQuery({
    queryKey: bookKeys.search({ ...params, query }),
    queryFn: async ({ pageParam, signal }) => {
      const response = await searchBooks(
        { ...params, query, page: pageParam, size: PAGE_SIZE },
        signal,
      )
      return response
    },
    initialPageParam: 1,
    // is_end가 false일 때만 다음 페이지 번호를 반환 (마지막 페이지면 더 안 부름)
    getNextPageParam: (lastPage, allPages) =>
      lastPage.meta.is_end ? undefined : allPages.length + 1,
    enabled: query.length > 0,
    // 400·401 같은 영구 오류는 재시도해도 소용없으므로, 429·5xx만 최대 2번 재시도
    retry: (failureCount, error) =>
      error instanceof KakaoApiError &&
      isRetryableStatus(error.status) &&
      failureCount < 2,
  })
}
