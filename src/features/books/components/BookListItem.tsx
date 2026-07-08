import { useState } from 'react'
import type { Book } from '@/types/book'
import { formatPrice } from '@/utils/formatPrice'
import { Button } from '@/components/ui/Button'

interface BookListItemProps {
  book: Book
}

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const BookListItem = ({ book }: BookListItemProps) => {
  const [expanded, setExpanded] = useState(false)
  const authorLabel = book.authors.join(', ')

  return (
    <li className="border-b border-palette-lightgray">
      <div className="flex items-center gap-6 py-6">
        <img
          src={book.thumbnail || undefined}
          alt={book.title}
          className="h-[68px] w-12 shrink-0 rounded object-cover"
          loading="lazy"
        />

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <p className="truncate text-lg font-bold">{book.title}</p>
          {authorLabel && (
            <p className="shrink-0 text-sm text-text-secondary">{authorLabel}</p>
          )}
        </div>

        <p className="shrink-0 text-lg font-bold">
          {formatPrice(book.sale_price >= 0 ? book.sale_price : book.price)}
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <Button
            size="sm"
            onClick={() => window.open(book.url, '_blank', 'noopener,noreferrer')}
          >
            구매하기
          </Button>
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={expanded}
            aria-label={expanded ? '상세 접기' : '상세 보기'}
            onClick={() => setExpanded((prev) => !prev)}
          >
            상세보기
            <span className="ml-1">
              <Chevron open={expanded} />
            </span>
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="flex gap-8 pb-8">
          <img
            src={book.thumbnail || undefined}
            alt={book.title}
            className="h-[280px] w-[200px] shrink-0 rounded object-cover"
            loading="lazy"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="text-lg font-bold">책 소개</h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary">
              {book.contents ? `${book.contents}...` : '소개 정보가 없습니다.'}
            </p>
            {book.price > 0 && book.sale_price >= 0 && book.sale_price < book.price && (
              <p className="mt-6 text-sm text-text-subtitle line-through">
                원가 {formatPrice(book.price)}
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  )
}
