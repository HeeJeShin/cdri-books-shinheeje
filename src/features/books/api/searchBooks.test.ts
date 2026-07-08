import { afterEach, describe, expect, it, vi } from 'vitest'
import { searchBooks } from './searchBooks'

const okResponse = {
  ok: true,
  json: async () => ({
    documents: [],
    meta: { total_count: 0, pageable_count: 0, is_end: true },
  }),
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('searchBooks', () => {
  it('calls the book endpoint with auth header and query params', async () => {
    vi.stubEnv('VITE_KAKAO_API_KEY', 'test-key')
    vi.stubEnv('VITE_KAKAO_API_BASE_URL', 'https://dapi.kakao.com')
    const fetchMock = vi.fn().mockResolvedValue(okResponse)
    vi.stubGlobal('fetch', fetchMock)

    await searchBooks({ query: '리액트', page: 2, size: 10, target: 'title' })

    const [url, init] = fetchMock.mock.calls[0]
    const requestUrl = url as URL
    expect(requestUrl.pathname).toBe('/v3/search/book')
    expect(requestUrl.searchParams.get('query')).toBe('리액트')
    expect(requestUrl.searchParams.get('page')).toBe('2')
    expect(requestUrl.searchParams.get('target')).toBe('title')
    expect((init as RequestInit).headers).toMatchObject({
      Authorization: 'KakaoAK test-key',
    })
  })

  it('throws KakaoApiError when the key is missing', async () => {
    vi.stubEnv('VITE_KAKAO_API_KEY', '')
    await expect(searchBooks({ query: '리액트' })).rejects.toThrow(/VITE_KAKAO_API_KEY/)
  })
})
