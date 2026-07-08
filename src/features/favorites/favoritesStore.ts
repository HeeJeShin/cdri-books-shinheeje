import type { Book } from '@/types/book'

const STORAGE_KEY = 'cdri-books:favorites'

type Listener = () => void

const listeners = new Set<Listener>()

/** Stable identifier for a book (ISBN, falling back to the detail URL). */
export const favoriteKey = (book: Pick<Book, 'isbn' | 'url'>): string =>
  book.isbn || book.url

const read = (): Book[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Book[]) : []
  } catch {
    return []
  }
}

/**
 * Cached snapshot. useSyncExternalStore requires getSnapshot to return a
 * referentially-stable value between changes, so we only swap this reference
 * when the list actually mutates.
 */
let snapshot: Book[] = read()

const emit = () => listeners.forEach((listener) => listener())

const write = (next: Book[]) => {
  snapshot = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* ignore quota / private-mode errors — in-memory state still updates */
  }
  emit()
}

// Keep multiple tabs in sync.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      snapshot = read()
      emit()
    }
  })
}

export const favoritesStore = {
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: (): Book[] => snapshot,
  getServerSnapshot: (): Book[] => [],
  isFavorite: (key: string): boolean =>
    snapshot.some((book) => favoriteKey(book) === key),
  /**
   * Adds the book (storing a snapshot of its data at this moment, per spec)
   * or removes it if already favorited. Newest favorites are kept first.
   */
  toggle: (book: Book): void => {
    const key = favoriteKey(book)
    const exists = snapshot.some((item) => favoriteKey(item) === key)
    write(
      exists
        ? snapshot.filter((item) => favoriteKey(item) !== key)
        : [book, ...snapshot],
    )
  },
}
