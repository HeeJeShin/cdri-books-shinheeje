import { describe, expect, it } from 'vitest'
import { KakaoApiError, isRetryableStatus } from './kakaoClient'

describe('KakaoApiError', () => {
  it('상태코드에 맞는 한글 메시지를 만든다', () => {
    expect(new KakaoApiError(0).userMessage).toContain('.env')
    expect(new KakaoApiError(400).userMessage).toContain('잘못된 요청')
    expect(new KakaoApiError(401).userMessage).toContain('인증')
    expect(new KakaoApiError(429).userMessage).toContain('잠시 후')
    expect(new KakaoApiError(503).userMessage).toContain('서버')
  })

  it('상태코드를 그대로 보관한다', () => {
    expect(new KakaoApiError(404).status).toBe(404)
  })
})

describe('isRetryableStatus', () => {
  it('429와 5xx만 재시도 대상이다', () => {
    expect(isRetryableStatus(429)).toBe(true)
    expect(isRetryableStatus(500)).toBe(true)
    expect(isRetryableStatus(503)).toBe(true)
  })

  it('400·401 같은 영구 오류는 재시도하지 않는다', () => {
    expect(isRetryableStatus(400)).toBe(false)
    expect(isRetryableStatus(401)).toBe(false)
  })
})
