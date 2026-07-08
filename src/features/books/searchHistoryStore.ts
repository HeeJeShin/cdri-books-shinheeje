// 검색 기록 공통 스토어 (찜 스토어와 동일한 useSyncExternalStore 패턴).
// 요구사항: 최대 8개, 8개 초과 시 오래된 것부터 삭제, 브라우저 재시작 후에도 유지(localStorage).

const STORAGE_KEY = 'cdri-books:search-history'
const MAX_HISTORY = 8

type Listener = () => void
const listeners = new Set<Listener>()

const read = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

let snapshot: string[] = read()

const emit = () => listeners.forEach((listener) => listener())

const write = (next: string[]) => {
  snapshot = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* 저장 실패(용량/프라이빗 모드)해도 메모리 상태는 갱신 */
  }
  emit()
}

// 다른 탭과 동기화
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      snapshot = read()
      emit()
    }
  })
}

export const searchHistoryStore = {
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: (): string[] => snapshot,
  getServerSnapshot: (): string[] => [],
  /** 검색어 추가: 중복은 최신으로 끌어올리고, 최신순 앞에 두며, 최대 8개 유지(초과분은 오래된 것부터 제거). */
  add: (keyword: string): void => {
    const kw = keyword.trim()
    if (!kw) return
    const next = [kw, ...snapshot.filter((item) => item !== kw)].slice(0, MAX_HISTORY)
    write(next)
  },
  remove: (keyword: string): void => {
    write(snapshot.filter((item) => item !== keyword))
  },
  clear: (): void => write([]),
}
