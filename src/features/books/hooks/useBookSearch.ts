import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { type BookSearchParams, bookKey } from '@/types/book'
import { KakaoApiError, isRetryableStatus } from '@/api/kakaoClient'
import { uniqueBy } from '@/utils/uniqueBy'
import { searchBooks } from '../api/searchBooks'
import { PAGE_SIZE } from '../constants'

// React Query 캐시 키. 검색 조건(검색어/타깃/페이지)이 바뀌면 자동으로 다시 조회됩니다.
export const bookKeys = {
  all: ['books'] as const,
  search: (params: Omit<BookSearchParams, 'size'>) =>
    [...bookKeys.all, 'search', params] as const,
}

type UseBookSearchParams = Omit<BookSearchParams, 'size' | 'sort'>

/**
 * 페이지 단위 도서 검색 훅 (React Query 기반, 페이지당 10개).
 * 검색어가 비어 있으면 요청하지 않도록 enabled로 막습니다.
 * placeholderData로 페이지 전환 시 이전 결과를 잠깐 유지해 깜빡임을 줄입니다.
 */
export const useBookSearch = ({ query, target, page = 1 }: UseBookSearchParams) => {
  const trimmed = query.trim()

  return useQuery({
    queryKey: bookKeys.search({ query: trimmed, target, page }),
    queryFn: async ({ signal }) => {
      const response = await searchBooks(
        { query: trimmed, target, page, size: PAGE_SIZE },
        signal,
      )
      return response
    },
    enabled: trimmed.length > 0,
    placeholderData: keepPreviousData,
    // 카카오가 같은 isbn을 중복으로 내려주는 경우가 있어, 문서를 고유 키(isbn·없으면 url)로 중복 제거.
    // (같은 키가 여러 번 렌더되면 React key 충돌 + 찜 상태가 겹쳐 보이는 문제 발생)
    select: (data) => ({
      ...data,
      documents: uniqueBy(data.documents, bookKey),
    }),
    // 400·401 같은 영구 오류는 재시도 안 하고, 429·5xx만 최대 2번 재시도
    retry: (failureCount, error) =>
      error instanceof KakaoApiError &&
      isRetryableStatus(error.status) &&
      failureCount < 2,
  })
}
