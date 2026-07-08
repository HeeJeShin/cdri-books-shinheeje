import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CloseIcon, MenuIcon } from '@/components/ui/icons'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { cn } from '@/utils/cn'

// 데스크톱 액티브 메뉴: 글자는 검정 유지, "언더바만" 파란색.
const navItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative pb-3 text-body1 font-medium text-text-primary transition-colors',
    isActive &&
      'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:rounded-full after:bg-primary',
  )

// 모바일 드롭다운 메뉴 아이템: 액티브면 연회색 배경 + primary 글자.
const mobileItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'block rounded-md px-4 py-3 text-body1 font-medium transition-colors',
    isActive ? 'bg-palette-lightgray text-primary' : 'text-text-primary',
  )

// Figma 기준: 로고는 화면 왼쪽 가까이, 바디(960 중앙)보다 훨씬 왼쪽.
// 그래서 헤더는 바디보다 넓은 컨테이너(max-w-1600)를 씁니다.
// 모바일(md 미만)에서는 네비를 햄버거 메뉴로 접습니다.
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(mobileRef, () => setMenuOpen(false))

  return (
    <header className="sticky top-0 z-20 border-b border-palette-gray bg-white">
      <div className="relative mx-auto flex h-20 w-full max-w-[1600px] items-center px-6">
        <NavLink to="/" className="text-title1 font-bold tracking-tight">
          CERTICOS BOOKS
        </NavLink>

        {/* 데스크톱 네비 (md 이상) — 정중앙보다 약간 왼쪽(≈46%) */}
        <nav className="absolute left-[46%] hidden -translate-x-1/2 items-center gap-10 md:flex">
          <NavLink to="/" end className={navItemClass}>
            도서 검색
          </NavLink>
          <NavLink to="/favorites" className={navItemClass}>
            내가 찜한 책
          </NavLink>
        </nav>

        {/* 모바일 햄버거 (md 미만) */}
        <div ref={mobileRef} className="ml-auto md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center text-text-primary"
          >
            {menuOpen ? <CloseIcon width={24} height={24} /> : <MenuIcon />}
          </button>

          {menuOpen && (
            <nav className="absolute top-full right-6 mt-2 w-44 rounded-lg border border-palette-lightgray bg-white p-2 shadow-lg">
              <NavLink
                to="/"
                end
                className={mobileItemClass}
                onClick={() => setMenuOpen(false)}
              >
                도서 검색
              </NavLink>
              <NavLink
                to="/favorites"
                className={mobileItemClass}
                onClick={() => setMenuOpen(false)}
              >
                내가 찜한 책
              </NavLink>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
