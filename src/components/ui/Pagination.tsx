import { ChevronDownIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  /** 한 번에 보여줄 페이지 번호 개수 */
  windowSize?: number
}

/** currentPage 주변으로 보여줄 페이지 번호 배열을 계산합니다. */
const getPageWindow = (current: number, total: number, size: number): number[] => {
  const half = Math.floor(size / 2)
  let start = Math.max(1, current - half)
  const end = Math.min(total, start + size - 1)
  start = Math.max(1, end - size + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const arrowClass =
  'flex h-9 w-9 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-palette-lightgray disabled:pointer-events-none disabled:opacity-30'

/** 재사용 페이지네이션. 검색 결과·찜 목록 등 어디서든 사용. */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  windowSize = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const pages = getPageWindow(currentPage, totalPages, windowSize)

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-1"
      aria-label="페이지네이션"
    >
      <button
        type="button"
        className={arrowClass}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="이전 페이지"
      >
        <ChevronDownIcon className="rotate-90" />
      </button>

      {pages.map((page) => {
        const isCurrent = page === currentPage
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
              'h-9 min-w-9 rounded-md px-2 text-body2 transition-colors',
              isCurrent
                ? 'bg-primary font-medium text-white'
                : 'text-text-secondary hover:bg-palette-lightgray',
            )}
          >
            {page}
          </button>
        )
      })}

      <button
        type="button"
        className={arrowClass}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="다음 페이지"
      >
        <ChevronDownIcon className="-rotate-90" />
      </button>
    </nav>
  )
}
