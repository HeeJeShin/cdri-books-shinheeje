import { type FormEvent, useRef, useState } from 'react'
import { CloseIcon, SearchIcon } from '@/components/ui/icons'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  /** 최근 검색어 목록 */
  history?: string[]
  onSelectHistory?: (keyword: string) => void
  onRemoveHistory?: (keyword: string) => void
}

/**
 * 둥근 검색 pill. 값은 부모가 제어(상세 검색과 상호 배타 시 초기화 위함).
 * 포커스 시 검색창 아래로 이어지는 하나의 컨테이너에 최근 검색어를 표시합니다.
 */
export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = '검색어 입력',
  history = [],
  onSelectHistory,
  onRemoveHistory,
}: SearchBarProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setOpen(false))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
    setOpen(false)
  }

  const showHistory = open && history.length > 0

  return (
    <div ref={ref} className="relative max-w-[480px] flex-1">
      <form onSubmit={handleSubmit} role="search">
        {/* 검색창: 기록이 열리면 아래 패널과 이어지도록 아래 모서리를 편다 */}
        <label
          className={cn(
            'flex h-[50px] items-center gap-2 bg-palette-lightgray px-5',
            showHistory ? 'rounded-t-[24px]' : 'rounded-full',
          )}
        >
          <SearchIcon className="shrink-0 text-text-primary" width={20} height={20} />
          <input
            type="search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            aria-label="도서 검색어"
            className="w-full bg-transparent text-caption outline-none placeholder:text-text-subtitle"
          />
        </label>
      </form>

      {showHistory && (
        // 검색창과 이어지는 하나의 둥근 컨테이너 (간격 없음, 아래 모서리만 둥글게)
        <ul className="absolute inset-x-0 top-full z-20 rounded-b-[24px] bg-palette-lightgray pb-3">
          {history.map((keyword) => (
            <li
              key={keyword}
              className="flex items-center justify-between py-1.5 pr-6 pl-[52px]"
            >
              <button
                type="button"
                className="min-w-0 flex-1 truncate text-left text-caption text-text-subtitle"
                onClick={() => {
                  onSelectHistory?.(keyword)
                  setOpen(false)
                }}
              >
                {keyword}
              </button>
              <button
                type="button"
                aria-label={`${keyword} 검색기록 삭제`}
                className="shrink-0 text-text-primary hover:text-text-secondary"
                onClick={() => onRemoveHistory?.(keyword)}
              >
                <CloseIcon width={20} height={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
