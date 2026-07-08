import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative text-body1 transition-colors',
    isActive
      ? 'font-medium text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-primary'
      : 'text-text-primary hover:text-text-secondary',
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
