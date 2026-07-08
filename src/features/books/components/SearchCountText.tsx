interface SearchCountTextProps {
  label: string
  count: number
  /** 있으면 문구 맨 앞에 검색어를 primary·굵게 표시 (예: "검색어" 검색 결과 총 3건) */
  keyword?: string
}

/** 예: "검색어" 검색 결과 총 21건 / 찜한 책 총 3건 */
export const SearchCountText = ({ label, count, keyword }: SearchCountTextProps) => (
  <p className="text-caption text-text-primary">
    {keyword && <span className="font-bold text-primary">"{keyword}" </span>}
    {label} 총{' '}
    <span className="font-medium text-primary">
      {count.toLocaleString('ko-KR')}
    </span>
    건
  </p>
)
