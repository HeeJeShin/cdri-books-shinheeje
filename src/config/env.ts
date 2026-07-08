// 앱에서 쓰는 환경 변수(.env)를 한 곳에 모아 관리합니다.
// 새 환경 변수가 생기면 여기에만 추가하면 됩니다.
//
// 값을 상수로 고정하지 않고 getter로 감싼 이유:
//  - import.meta.env를 "읽는 시점"에 접근하므로, 테스트에서 값을 바꿔 끼우기(stubEnv) 쉽습니다.
export const env = {
  /** 카카오 REST API 키 (Authorization 헤더에 사용) */
  get kakaoApiKey(): string {
    return import.meta.env.VITE_KAKAO_API_KEY
  },
  /** 카카오 API 기본 URL (예: https://dapi.kakao.com) */
  get kakaoApiBaseUrl(): string {
    return import.meta.env.VITE_KAKAO_API_BASE_URL
  },
}
