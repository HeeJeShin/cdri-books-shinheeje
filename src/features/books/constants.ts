import type { BookSearchTarget } from '@/types/book'

/** Options for the detail-search target dropdown (label ↔ Kakao param). */
export const SEARCH_TARGET_OPTIONS: { value: BookSearchTarget; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
]

export const targetLabel = (target: BookSearchTarget): string =>
  SEARCH_TARGET_OPTIONS.find((option) => option.value === target)?.label ?? '제목'

/** Books returned per page (Figma: "페이지 당 10개 아이템"). */
export const PAGE_SIZE = 10
