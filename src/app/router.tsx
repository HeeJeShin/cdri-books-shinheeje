import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { SearchPage } from '@/pages/SearchPage'
import { FavoritesPage } from '@/pages/FavoritesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <SearchPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
    ],
  },
])
