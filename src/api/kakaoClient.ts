// 카카오 REST API 공통 클라이언트
// 앱의 모든 카카오 호출은 이 파일의 kakaoGet 하나만 거칩니다.
// (기본 URL · 인증 헤더 · 에러 처리를 여기 한 곳에서 관리)

/** HTTP 상태코드를 사용자에게 보여줄 한글 메시지로 바꿔줍니다. */
const messageByStatus = (status: number): string => {
  switch (status) {
    case 0:
      return 'API 키가 설정되지 않았습니다. .env 파일을 확인해 주세요.'
    case 400:
      return '잘못된 요청입니다. 검색어를 확인해 주세요.'
    case 401:
    case 403:
      return '인증에 실패했습니다. REST API 키를 확인해 주세요.'
    case 429:
      return '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'
    default:
      return status >= 500
        ? '카카오 서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        : '검색 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
  }
}

/** 카카오 API 호출 중 발생한 오류. 상태코드와 화면용 한글 메시지를 함께 담습니다. */
export class KakaoApiError extends Error {
  /** HTTP 상태코드 (키 누락 등 요청 전 오류는 0) */
  readonly status: number
  /** 화면에 그대로 노출할 한글 메시지 */
  readonly userMessage: string

  constructor(status: number, detail?: string) {
    // 개발자용 메시지(콘솔/로그)에는 상세 원인을, 화면에는 userMessage를 사용
    super(detail ?? `카카오 API 요청 실패 (status: ${status})`)
    this.name = 'KakaoApiError'
    this.status = status
    this.userMessage = messageByStatus(status)
  }
}

/** 재시도할 가치가 있는 상태코드인지 판단 (일시적 오류인 429·5xx만 재시도) */
export const isRetryableStatus = (status: number): boolean =>
  status === 429 || status >= 500

/**
 * 카카오 REST API에 GET 요청을 보내는 얇은 래퍼.
 * - 기본 URL과 `KakaoAK` 인증 헤더를 자동으로 붙입니다.
 * - 실패 응답은 상태코드를 담은 KakaoApiError로 정규화합니다.
 */
export const kakaoGet = async <T>(
  path: string,
  params: Record<string, string | number | undefined>,
  signal?: AbortSignal,
): Promise<T> => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY
  const baseUrl = import.meta.env.VITE_KAKAO_API_BASE_URL

  // 키가 없으면 네트워크 요청을 보내기 전에 즉시 중단
  if (!apiKey) {
    throw new KakaoApiError(0, 'VITE_KAKAO_API_KEY가 비어 있습니다. .env를 확인하세요.')
  }

  // 경로 + 쿼리 파라미터 조립 (값이 없는 파라미터는 자동 제외)
  const url = new URL(path, baseUrl)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value))
    }
  }

  // 모든 요청에 인증 헤더를 공통으로 부착 (signal로 요청 취소도 지원)
  const response = await fetch(url, {
    headers: { Authorization: `KakaoAK ${apiKey}` },
    signal,
  })

  // 실패 응답 처리: 카카오가 내려주는 에러 본문({ errorType, message })을 최대한 활용
  if (!response.ok) {
    const detail = await response
      .json()
      .then((body: { message?: string }) => body?.message)
      .catch(() => undefined)
    throw new KakaoApiError(response.status, detail)
  }

  return response.json() as Promise<T>
}
