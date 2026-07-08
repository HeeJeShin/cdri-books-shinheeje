import { Outlet } from 'react-router-dom'
import { ToastViewport } from '@/components/ui/toast'
import { Header } from './Header'

export const RootLayout = () => (
  <div className="min-h-full bg-white">
    <Header />
    <main className="mx-auto w-full max-w-[960px] px-6 pt-14 pb-24">
      <Outlet />
    </main>
    {/* 앱 전역 토스트 (화면 우측 하단) */}
    <ToastViewport />
  </div>
)
