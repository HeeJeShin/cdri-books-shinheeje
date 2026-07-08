import type { Book } from '@/types/book'
import { formatPrice } from '@/utils/formatPrice'
import { cn } from '@/utils/cn'

/** 할인이 있는지(판매가가 정가보다 낮은지) */
const hasDiscount = (book: Book) =>
  book.sale_price >= 0 && book.sale_price < book.price

/** 화면에 노출할 대표 가격(판매가 우선, 없으면 정가) */
const displayPrice = (book: Book) =>
  book.sale_price >= 0 ? book.sale_price : book.price

interface BookPriceProps {
  book: Book
  /** compact: 단일 가격(목록 행) / detailed: 원가·할인가 분리(상세) */
  variant?: 'compact' | 'detailed'
  className?: string
}

/** 도서 가격 표시 공통 컴포넌트. 할인 여부에 따라 정가/할인가 처리를 일원화. */
export const BookPrice = ({
  book,
  variant = 'compact',
  className,
}: BookPriceProps) => {
  // 상세 + 할인 존재 → 원가(취소선) / 할인가 분리 표기
  if (variant === 'detailed' && hasDiscount(book)) {
    return (
      <div className={cn('space-y-1 text-right', className)}>
        <p className="flex items-baseline justify-end gap-2 text-text-subtitle">
          <span className="text-body2">원가</span>
          <span className="text-caption line-through">
            {formatPrice(book.price)}
          </span>
        </p>
        <p className="flex items-baseline justify-end gap-2">
          <span className="text-body2 text-text-primary">할인가</span>
          <span className="text-title3 font-bold">
            {formatPrice(book.sale_price)}
          </span>
        </p>
      </div>
    )
  }

  // 그 외(목록 행 / 할인 없는 상세) → 단일 가격
  return (
    <p
      className={cn(
        'text-title3 font-bold',
        variant === 'detailed' && 'text-right',
        className,
      )}
    >
      {formatPrice(displayPrice(book))}
    </p>
  )
}
