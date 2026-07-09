import { type Book, bookKey } from '@/types/book'
import { createPersistedStore } from '@/utils/createPersistedStore'

const store = createPersistedStore<Book[]>('cdri-books:favorites', [])

export const favoritesStore = {
  subscribe: store.subscribe,
  getSnapshot: store.getSnapshot,
  getServerSnapshot: store.getServerSnapshot,
  isFavorite: (key: string): boolean =>
    store.get().some((book) => bookKey(book) === key),
  /**
   * 책을 찜 목록에 추가(찜한 시점의 데이터를 스냅샷으로 저장)하거나,
   * 이미 있으면 제거합니다. 최신 찜이 앞에 오도록 유지합니다.
   */
  toggle: (book: Book): void => {
    const key = bookKey(book)
    const current = store.get()
    const exists = current.some((item) => bookKey(item) === key)
    store.set(
      exists
        ? current.filter((item) => bookKey(item) !== key)
        : [book, ...current],
    )
  },
}
