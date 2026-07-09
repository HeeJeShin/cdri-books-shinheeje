// localStorage에 영속되는 외부 스토어를 만드는 공통 팩토리.
// useSyncExternalStore(subscribe/getSnapshot)와 바로 연결되며,
// 읽기/쓰기(try-catch)·탭 간 동기화(storage 이벤트)를 한 곳에서 처리합니다.
// (찜 목록, 검색 기록 등에서 재사용)

export interface PersistedStore<T> {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => T
  getServerSnapshot: () => T
  /** 현재 값 (컴포넌트 밖에서 읽을 때) */
  get: () => T
  /** 값 갱신 + localStorage 저장 + 구독자 알림 */
  set: (next: T) => void
}

export const createPersistedStore = <T>(
  storageKey: string,
  initialValue: T,
): PersistedStore<T> => {
  const listeners = new Set<() => void>()

  const read = (): T => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  }

  // getSnapshot이 참조 안정성을 갖도록, 값이 바뀔 때만 새 스냅샷으로 교체
  let snapshot = read()

  const emit = () => listeners.forEach((listener) => listener())

  // 다른 탭과 동기화
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === storageKey) {
        snapshot = read()
        emit()
      }
    })
  }

  return {
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initialValue,
    get: () => snapshot,
    set: (next) => {
      snapshot = next
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        /* 저장 실패(용량/프라이빗 모드)해도 메모리 상태는 갱신 */
      }
      emit()
    },
  }
}
