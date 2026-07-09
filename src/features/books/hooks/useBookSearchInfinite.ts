import { useInfiniteQuery } from '@tanstack/react-query'
import type { BookSearchParams } from '@/types/book'
import { KakaoApiError, isRetryableStatus } from '@/api/kakaoClient'
import { searchBooks } from '../api/searchBooks'
import { bookKeys } from './useBookSearch'
import { PAGE_SIZE } from '../constants'

type UseBookSearchInfiniteParams = Omit<
  BookSearchParams,
  'size' | 'sort' | 'page'
> & {
  /** 비활성화(예: 데스크톱에선 페이지네이션을 쓰므로 끔) */
  enabled?: boolean
}

/**
 * 무한 스크롤용 도서 검색 훅 (모바일 전용). is_end가 false인 동안 다음 페이지를 누적합니다.
 */
export const useBookSearchInfinite = ({
  query,
  target,
  enabled = true,
}: UseBookSearchInfiniteParams) => {
  const trimmed = query.trim()

  return useInfiniteQuery({
    queryKey: [...bookKeys.all, 'infinite', { query: trimmed, target }] as const,
    queryFn: async ({ pageParam, signal }) => {
      return searchBooks(
        { query: trimmed, target, page: pageParam, size: PAGE_SIZE },
        signal,
      )
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.meta.is_end ? undefined : allPages.length + 1,
    enabled: enabled && trimmed.length > 0,
    retry: (failureCount, error) =>
      error instanceof KakaoApiError &&
      isRetryableStatus(error.status) &&
      failureCount < 2,
  })
}
