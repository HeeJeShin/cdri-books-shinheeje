// 토스트 공통 스토어.
// 컴포넌트 밖(스토어/이벤트 핸들러 등) 어디서든 toast.show('...') 로 띄울 수 있습니다.
// 찜 스토어와 동일하게 useSyncExternalStore 패턴을 씁니다.

export type ToastVariant = 'default' | 'success' | 'error'

export interface Toast {
  id: number
  message: string
  variant: ToastVariant
}

/** 토스트가 자동으로 사라지는 시간(ms) */
const DURATION = 2500

let toasts: Toast[] = []
let nextId = 1
const listeners = new Set<() => void>()

const emit = () => listeners.forEach((listener) => listener())

const remove = (id: number) => {
  toasts = toasts.filter((toast) => toast.id !== id)
  emit()
}

const show = (message: string, variant: ToastVariant = 'default'): number => {
  const id = nextId++
  toasts = [...toasts, { id, message, variant }]
  emit()
  setTimeout(() => remove(id), DURATION)
  return id
}

/** 뷰포트 컴포넌트가 구독하는 스토어 */
export const toastStore = {
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: (): Toast[] => toasts,
  getServerSnapshot: (): Toast[] => [],
  dismiss: remove,
}

/** 어디서든 호출하는 공통 API */
export const toast = {
  show: (message: string) => show(message, 'default'),
  success: (message: string) => show(message, 'success'),
  error: (message: string) => show(message, 'error'),
}
