import { useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'
import { type ToastVariant, toastStore } from './toastStore'

// variant별 색상. 기본은 primary, 에러는 경고 색.
const variantClass: Record<ToastVariant, string> = {
  default: 'bg-primary text-white',
  success: 'bg-primary text-white',
  error: 'bg-red text-white',
}

/**
 * 토스트를 화면 우측 하단에 쌓아서 보여주는 뷰포트.
 * 앱에 한 번만 마운트하면 되고(RootLayout), body로 포탈됩니다.
 */
export const ToastViewport = () => {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot,
  )

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className="pointer-events-none fixed top-6 right-6 z-50 flex flex-col items-end gap-2"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => toastStore.dismiss(toast.id)}
          className={cn(
            'pointer-events-auto animate-[toast-in_0.2s_ease-out] rounded-lg px-4 py-3 text-body2 font-medium shadow-lg',
            variantClass[toast.variant],
          )}
        >
          {toast.message}
        </button>
      ))}
    </div>,
    document.body,
  )
}
