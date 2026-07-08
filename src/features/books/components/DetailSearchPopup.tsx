import { type KeyboardEvent, useRef, useState } from 'react'
import type { BookSearchTarget } from '@/types/book'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { CloseIcon } from '@/components/ui/icons'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { SEARCH_TARGET_OPTIONS } from '../constants'

interface DetailSearchPopupProps {
  onSearch: (target: BookSearchTarget, keyword: string) => void
  onClose: () => void
}

export const DetailSearchPopup = ({ onSearch, onClose }: DetailSearchPopupProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<BookSearchTarget>('title')
  const [keyword, setKeyword] = useState('')

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
      className="absolute top-[calc(100%+8px)] right-0 z-30 w-[400px] rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-4 right-4 text-text-subtitle hover:text-text-primary"
      >
        <CloseIcon />
      </button>

      <div className="mt-6 flex items-end gap-5">
        <Select
          value={target}
          options={SEARCH_TARGET_OPTIONS}
          onChange={setTarget}
          className="w-24 shrink-0"
        />

        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          autoFocus
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder="검색어 입력"
          aria-label="상세 검색어"
          className="min-w-0 flex-1 border-b border-palette-gray pb-2 text-body2 text-text-primary outline-none placeholder:text-text-subtitle focus:border-primary"
        />
      </div>

      <Button className="mt-6 w-full" onClick={submit} disabled={!keyword.trim()}>
        검색하기
      </Button>
    </div>
  )
}
