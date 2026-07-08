import { useSyncExternalStore } from 'react'
import { searchHistoryStore } from './searchHistoryStore'

/** 검색 기록(최근 검색어 목록)을 구독하는 훅. */
export const useSearchHistory = () => {
  const history = useSyncExternalStore(
    searchHistoryStore.subscribe,
    searchHistoryStore.getSnapshot,
    searchHistoryStore.getServerSnapshot,
  )

  return {
    history,
    addHistory: searchHistoryStore.add,
    removeHistory: searchHistoryStore.remove,
    clearHistory: searchHistoryStore.clear,
  }
}
