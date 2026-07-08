import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'relative py-2 text-base transition-colors',
    isActive ? 'text-text-primary font-medium' : 'text-text-secondary',
  ].join(' ')

export const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-[960px] items-center justify-between px-4 py-5">
      <NavLink to="/" className="text-xl font-bold tracking-tight">
        CERTICOS BOOKS
      </NavLink>

      <nav className="flex items-center gap-8">
        <NavLink to="/" end className={navLinkClass}>
          도서 검색
        </NavLink>
        <NavLink to="/favorites" className={navLinkClass}>
          내가 찜한 책
        </NavLink>
      </nav>
    </header>
  )
}
