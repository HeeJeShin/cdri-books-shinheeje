import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  hasMore: boolean
  onLoadMore: () => void
  /** 관찰을 멈출지 (예: 이미 로딩 중이거나 모바일이 아닐 때) */
  disabled?: boolean
}

/**
 * 센티넬 요소가 화면에 들어오면 onLoadMore를 호출합니다.
 * 반환된 ref를 리스트 하단 요소에 붙여 사용합니다.
 */
export const useInfiniteScroll = ({
  hasMore,
  onLoadMore,
  disabled = false,
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || !hasMore) return
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore()
      },
      { rootMargin: '200px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, disabled, onLoadMore])

  return sentinelRef
}
