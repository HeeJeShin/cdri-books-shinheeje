import { useSyncExternalStore } from 'react'

// 모바일 판단 기준: Tailwind md 미만(<768px)
const MOBILE_QUERY = '(max-width: 767px)'

const subscribe = (onChange: () => void): (() => void) => {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

/** 현재 뷰포트가 모바일(<768px)인지 반응형으로 반환. */
export const useIsMobile = (): boolean =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
