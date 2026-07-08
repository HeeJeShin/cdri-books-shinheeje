const BASE_URL = import.meta.env.VITE_KAKAO_API_BASE_URL
const API_KEY = import.meta.env.VITE_KAKAO_API_KEY

export class KakaoApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'KakaoApiError'
    this.status = status
  }
}

/**
 * Thin GET wrapper for the Kakao REST API.
 * Injects the base URL and `KakaoAK` auth header, and normalizes errors.
 */
export const kakaoGet = async <T>(
  path: string,
  params: Record<string, string | number | undefined>,
  signal?: AbortSignal,
): Promise<T> => {
  if (!API_KEY) {
    throw new KakaoApiError('VITE_KAKAO_API_KEY is not set. Check your .env file.', 0)
  }

  const url = new URL(path, BASE_URL)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value))
    }
  }

  const response = await fetch(url, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    signal,
  })

  if (!response.ok) {
    throw new KakaoApiError(
      `Kakao API request failed (${response.status})`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}
