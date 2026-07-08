interface NoDataProps {
  message: string
}

/** 결과가 없을 때 보여주는 빈 화면 (Figma NoData). 이미지는 public/images 에 있음. */
export const NoData = ({ message }: NoDataProps) => (
  <div className="flex flex-col items-center gap-3 py-24">
    <img
      src="/images/no-data-book.png"
      alt=""
      width={80}
      height={80}
      aria-hidden="true"
    />
    <p className="text-caption text-text-secondary">{message}</p>
  </div>
)
