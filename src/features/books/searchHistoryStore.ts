import { createPersistedStore } from '@/utils/createPersistedStore'

// 검색 기록 스토어.
// 요구사항: 최대 8개, 8개 초과 시 오래된 것부터 삭제, 브라우저 재시작 후에도 유지(localStorage).
const MAX_HISTORY = 8

const store = createPersistedStore<string[]>('cdri-books:search-history', [])

export const searchHistoryStore = {
  subscribe: store.subscribe,
  getSnapshot: store.getSnapshot,
  getServerSnapshot: store.getServerSnapshot,
  /** 검색어 추가: 중복은 최신으로 끌어올리고, 최신순 앞에 두며, 최대 8개 유지(초과분은 오래된 것부터 제거). */
  add: (keyword: string): void => {
    const kw = keyword.trim()
    if (!kw) return
    const next = [kw, ...store.get().filter((item) => item !== kw)].slice(
      0,
      MAX_HISTORY,
    )
    store.set(next)
  },
  remove: (keyword: string): void => {
    store.set(store.get().filter((item) => item !== keyword))
  },
  clear: (): void => store.set([]),
}
