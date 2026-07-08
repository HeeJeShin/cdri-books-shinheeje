interface SearchCountTextProps {
  label: string
  count: number
}

/** e.g. "도서 검색 결과  총 21건" with the number highlighted. */
export const SearchCountText = ({ label, count }: SearchCountTextProps) => (
  <p className="text-caption text-text-primary">
    {label} 총{' '}
    <span className="font-medium text-primary">
      {count.toLocaleString('ko-KR')}
    </span>
    건
  </p>
)
