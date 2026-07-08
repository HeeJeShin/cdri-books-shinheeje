import { useEffect, useState } from 'react'
import type { BookSearchTarget } from '@/types/book'
import { Button } from '@/components/ui/Button'
import { useSearchHistory } from '../useSearchHistory'
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
  const { history, addHistory, removeHistory } = useSearchHistory()

  // Keep the pill in sync with URL-driven keyword changes (e.g. back/forward).
  useEffect(() => setInput(keyword), [keyword])

  // 전체 검색 실행: 검색어가 있으면 검색 기록에 저장 후 검색.
  const runNormalSearch = (value: string) => {
    const trimmed = value.trim()
    if (trimmed) addHistory(trimmed)
    onNormalSearch(trimmed)
  }

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
        onSubmit={() => runNormalSearch(input)}
        history={history}
        onSelectHistory={(kw) => {
          setInput(kw)
          runNormalSearch(kw)
        }}
        onRemoveHistory={removeHistory}
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
