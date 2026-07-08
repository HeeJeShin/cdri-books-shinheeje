import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const RootLayout = () => (
  <div className="min-h-full bg-white">
    <Header />
    <main className="mx-auto w-full max-w-[960px] px-6 pt-14 pb-24">
      <Outlet />
    </main>
  </div>
)
