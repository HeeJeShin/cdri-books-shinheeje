import { type KeyboardEvent, useRef, useState } from 'react'
import type { BookSearchTarget } from '@/types/book'
import { Button } from '@/components/ui/Button'
import { ChevronDownIcon, CloseIcon } from '@/components/ui/icons'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { cn } from '@/utils/cn'
import { SEARCH_TARGET_OPTIONS, targetLabel } from '../constants'

interface DetailSearchPopupProps {
  onSearch: (target: BookSearchTarget, keyword: string) => void
  onClose: () => void
}

export const DetailSearchPopup = ({ onSearch, onClose }: DetailSearchPopupProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<BookSearchTarget>('title')
  const [keyword, setKeyword] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useOnClickOutside(ref, onClose)

  const submit = () => {
    const trimmed = keyword.trim()
    if (trimmed) onSearch(target, trimmed)
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') submit()
  }

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="상세 검색"
      className="absolute top-[calc(100%+8px)] right-0 z-30 w-[400px] rounded-lg border border-palette-lightgray bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-3 right-3 text-text-subtitle hover:text-text-primary"
      >
        <CloseIcon />
      </button>

      <div className="mt-6 flex items-center gap-3">
        {/* Target dropdown */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            className="flex w-[92px] items-center justify-between rounded-md bg-palette-lightgray px-3 py-2 text-body2"
          >
            {targetLabel(target)}
            <ChevronDownIcon
              className={cn('transition-transform', dropdownOpen && 'rotate-180')}
            />
          </button>

          {dropdownOpen && (
            <ul
              role="listbox"
              className="absolute top-[calc(100%+4px)] left-0 z-10 w-full overflow-hidden rounded-md border border-palette-lightgray bg-white shadow-md"
            >
              {SEARCH_TARGET_OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === target}
                    onClick={() => {
                      setTarget(option.value)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      'block w-full px-3 py-2 text-left text-body2 hover:bg-palette-lightgray',
                      option.value === target && 'text-primary',
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Keyword input */}
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          autoFocus
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder="검색어 입력"
          aria-label="상세 검색어"
          className="min-w-0 flex-1 border-b border-palette-gray py-2 text-body2 outline-none placeholder:text-text-subtitle focus:border-primary"
        />
      </div>

      <Button className="mt-4 w-full" onClick={submit} disabled={!keyword.trim()}>
        검색하기
      </Button>
    </div>
  )
}
