import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  hasMore: boolean
  onLoadMore: () => void
  /** Pause observing (e.g. while a fetch is already in flight). */
  disabled?: boolean
}

/**
 * Observes a sentinel element and calls `onLoadMore` when it scrolls into
 * view. Returns the ref to attach to the sentinel.
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
