import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

// 액티브 메뉴: 글자는 항상 검정(text-primary) 유지, "언더바만" 파란색.
// 글자와 언더바 사이는 pb-2(8px)로 띄우고, 언더바 두께는 2px. 폰트는 body1/500.
const navItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative pb-2 text-body1 font-medium text-text-primary transition-colors',
    isActive &&
      'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary',
  )

// Figma 기준: 로고는 화면 왼쪽 가까이(≈160/1920), 바디(960 중앙)보다 훨씬 왼쪽.
// 그래서 헤더는 바디(max-w-960)보다 넓은 컨테이너(max-w-1600)를 써서 로고를 왼쪽에 둡니다.
export const Header = () => (
  <header className="sticky top-0 z-20 border-b border-palette-gray bg-white">
    <div className="relative mx-auto flex h-20 w-full max-w-[1600px] items-center px-6">
      <NavLink to="/" className="text-title1 font-bold tracking-tight">
        CERTICOS BOOKS
      </NavLink>

      {/* Figma상 네비는 정중앙이 아니라 약간 왼쪽(≈46%)에 위치 */}
      <nav className="absolute left-[46%] flex -translate-x-1/2 items-center gap-10">
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
