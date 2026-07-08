import { type FormEvent, useState } from 'react'

interface SearchBarProps {
  /** Fired when the user submits a non-empty keyword. */
  onSearch: (keyword: string) => void
  initialKeyword?: string
}

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" strokeLinecap="round" />
  </svg>
)

export const SearchBar = ({ onSearch, initialKeyword = '' }: SearchBarProps) => {
  const [value, setValue] = useState(initialKeyword)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const keyword = value.trim()
    if (keyword) onSearch(keyword)
  }

  return (
    <form onSubmit={handleSubmit} role="search">
      <label className="flex h-12 items-center gap-2 rounded-full bg-palette-lightgray px-5">
        <span className="text-text-subtitle">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full bg-transparent text-base outline-none placeholder:text-text-subtitle"
          aria-label="도서 검색어"
        />
      </label>
    </form>
  )
}
