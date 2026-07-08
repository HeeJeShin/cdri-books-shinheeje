import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const RootLayout = () => {
  return (
    <div className="min-h-full">
      <Header />
      <main className="mx-auto w-full max-w-[960px] px-4 pb-24">
        <Outlet />
      </main>
    </div>
  )
}
