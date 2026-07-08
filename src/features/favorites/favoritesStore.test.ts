import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeBook } from '@/test/fixtures'

const STORAGE_KEY = 'cdri-books:favorites'

/** Re-import the store fresh so its module-level snapshot re-reads storage. */
const loadStore = async () => {
  vi.resetModules()
  return import('./favoritesStore')
}

beforeEach(() => {
  localStorage.clear()
})

describe('favoritesStore', () => {
  it('starts empty', async () => {
    const { favoritesStore } = await loadStore()
    expect(favoritesStore.getSnapshot()).toEqual([])
  })

  it('toggles a book on and off', async () => {
    const { favoritesStore } = await loadStore()
    const book = makeBook({ isbn: 'A' })

    favoritesStore.toggle(book)
    expect(favoritesStore.isFavorite('A')).toBe(true)
    expect(favoritesStore.getSnapshot()).toHaveLength(1)

    favoritesStore.toggle(book)
    expect(favoritesStore.isFavorite('A')).toBe(false)
    expect(favoritesStore.getSnapshot()).toHaveLength(0)
  })

  it('persists to localStorage as a snapshot of book data', async () => {
    const { favoritesStore } = await loadStore()
    favoritesStore.toggle(makeBook({ isbn: 'B', title: '스냅샷 도서' }))

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].title).toBe('스냅샷 도서')
  })

  it('rehydrates existing favorites from localStorage on init', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([makeBook({ isbn: 'C' })]))
    const { favoritesStore } = await loadStore()
    expect(favoritesStore.isFavorite('C')).toBe(true)
  })

  it('keeps the newest favorite first', async () => {
    const { favoritesStore } = await loadStore()
    favoritesStore.toggle(makeBook({ isbn: 'first', title: '첫번째' }))
    favoritesStore.toggle(makeBook({ isbn: 'second', title: '두번째' }))
    expect(favoritesStore.getSnapshot()[0].title).toBe('두번째')
  })

  it('notifies subscribers on change', async () => {
    const { favoritesStore } = await loadStore()
    const listener = vi.fn()
    const unsubscribe = favoritesStore.subscribe(listener)

    favoritesStore.toggle(makeBook({ isbn: 'D' }))
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    favoritesStore.toggle(makeBook({ isbn: 'E' }))
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
