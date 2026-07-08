import { useEffect, useState } from 'react'
import type { BookSearchTarget } from '@/types/book'
import { Button } from '@/components/ui/Button'
import { SearchBar } from './SearchBar'
import { DetailSearchPopup } from './DetailSearchPopup'

interface BookSearchFormProps {
  /** Keyword to show in the pill (empty while a detail search is active). */
  keyword: string
  onNormalSearch: (keyword: string) => void
  onDetailSearch: (target: BookSearchTarget, keyword: string) => void
}

/**
 * Composes the search pill and the detail-search popup.
 * Normal search and detail search are mutually exclusive: running a detail
 * search clears the pill, and running a normal search is handled upstream by
 * dropping the target. The popup resets every time it re-opens.
 */
export const BookSearchForm = ({
  keyword,
  onNormalSearch,
  onDetailSearch,
}: BookSearchFormProps) => {
  const [input, setInput] = useState(keyword)
  const [popupOpen, setPopupOpen] = useState(false)

  // Keep the pill in sync with URL-driven keyword changes (e.g. back/forward).
  useEffect(() => setInput(keyword), [keyword])

  const handleDetailSearch = (target: BookSearchTarget, value: string) => {
    setInput('')
    setPopupOpen(false)
    onDetailSearch(target, value)
  }

  return (
    <div className="flex items-center gap-3">
      <SearchBar
        value={input}
        onChange={setInput}
        onSubmit={() => onNormalSearch(input.trim())}
      />

      <div className="relative shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPopupOpen((prev) => !prev)}
          aria-expanded={popupOpen}
        >
          상세검색
        </Button>

        {popupOpen && (
          <DetailSearchPopup
            onSearch={handleDetailSearch}
            onClose={() => setPopupOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
