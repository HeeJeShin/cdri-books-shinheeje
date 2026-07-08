import { type RefObject, useEffect } from 'react'

/**
 * Calls `handler` when a pointer/keyboard interaction happens outside `ref`.
 * Also fires on the Escape key so popups can close naturally.
 */
export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
): void => {
  useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (el && !el.contains(event.target as Node)) handler()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler()
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [ref, handler])
}
