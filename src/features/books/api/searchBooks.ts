import { kakaoGet } from '@/api/kakaoClient'
import type { BookSearchParams, BookSearchResponse } from '@/types/book'

/** 카카오 책 검색 API가 허용하는 한 페이지 최대 문서 수 */
export const MAX_PAGE_SIZE = 50

/**
 * 카카오 책 검색 API 호출: GET /v3/search/book
 * @see https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
 */
export const searchBooks = async (
  { query, sort = 'accuracy', target, page = 1, size = 10 }: BookSearchParams,
  signal?: AbortSignal,
): Promise<BookSearchResponse> => {
  const response = await kakaoGet<BookSearchResponse>(
    '/v3/search/book',
    { query, sort, target, page, size },
    signal,
  )
  return response
}
