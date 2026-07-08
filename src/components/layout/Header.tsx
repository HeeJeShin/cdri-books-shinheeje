import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

// 액티브 메뉴: 글자는 항상 검정(text-primary) 유지, "언더바만" 파란색.
// 글자와 언더바 사이는 pb-2(8px)로 띄우고, 언더바 두께는 2px.
const navItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative pb-2 text-body1 text-text-primary transition-colors',
    isActive &&
      'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary',
  )

export const Header = () => (
  <header className="sticky top-0 z-20 border-b border-palette-gray bg-white">
    <div className="relative mx-auto flex h-20 max-w-[1200px] items-center px-6 md:px-10">
      <NavLink to="/" className="text-title1 font-bold tracking-tight">
        CERTICOS BOOKS
      </NavLink>

      <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10">
        <NavLink to="/" end className={navItemClass}>
          도서 검색
        </NavLink>
        <NavLink to="/favorites" className={navItemClass}>
          내가 찜한 책
        </NavLink>
      </nav>
    </div>
  </header>
)
