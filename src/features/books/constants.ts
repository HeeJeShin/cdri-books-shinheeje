import type { BookSearchTarget } from '@/types/book'

/** Options for the detail-search target dropdown (label ↔ Kakao param). */
export const SEARCH_TARGET_OPTIONS: { value: BookSearchTarget; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
]

/** Books returned per page (Figma: "페이지 당 10개 아이템"). */
export const PAGE_SIZE = 10

/** 카카오 책 검색이 허용하는 최대 페이지 번호 (page: 1~50). */
export const MAX_PAGE = 50

/** 검색 결과 총 개수로 전체 페이지 수를 계산 (카카오 50페이지 제한 반영). */
export const getTotalPages = (pageableCount: number): number =>
  Math.min(Math.ceil(pageableCount / PAGE_SIZE), MAX_PAGE)
