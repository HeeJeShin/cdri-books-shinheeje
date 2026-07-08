import { kakaoGet } from '@/api/kakaoClient'
import type { BookSearchParams, BookSearchResponse } from '@/types/book'

/** Max documents per page allowed by the Kakao Book Search API. */
export const MAX_PAGE_SIZE = 50

/**
 * Calls GET /v3/search/book.
 * @see https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book
 */
export const searchBooks = (
  { query, sort = 'accuracy', target, page = 1, size = 10 }: BookSearchParams,
  signal?: AbortSignal,
): Promise<BookSearchResponse> =>
  kakaoGet<BookSearchResponse>(
    '/v3/search/book',
    { query, sort, target, page, size },
    signal,
  )
