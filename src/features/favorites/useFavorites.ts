import { useSyncExternalStore } from 'react'
import { favoritesStore } from './favoritesStore'

/** Subscribe to the favorites list (persisted in localStorage). */
export const useFavorites = () => {
  const favorites = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot,
  )

  return {
    favorites,
    toggleFavorite: favoritesStore.toggle,
  }
}

/** Reactive boolean for a single book's favorite state. */
export const useIsFavorite = (key: string): boolean =>
  useSyncExternalStore(
    favoritesStore.subscribe,
    () => favoritesStore.isFavorite(key),
    () => false,
  )
