import { type FormEvent } from 'react'
import { SearchIcon } from '@/components/ui/icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
}

/** The rounded search pill. Controlled by the parent so its value can be
 *  reset when a detail search takes over (mutual exclusion). */
export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = '검색어를 입력하세요',
}: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="max-w-[480px] flex-1">
      <label className="flex h-[50px] items-center gap-2 rounded-full bg-palette-lightgray px-5">
        <SearchIcon className="shrink-0 text-text-primary" width={20} height={20} />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label="도서 검색어"
          className="w-full bg-transparent text-caption outline-none placeholder:text-text-subtitle"
        />
      </label>
    </form>
  )
}
