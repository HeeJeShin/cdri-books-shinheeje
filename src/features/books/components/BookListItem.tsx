import { useState } from 'react'
import type { Book } from '@/types/book'
import { Button } from '@/components/ui/Button'
import { ChevronDownIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'
import { BookThumbnail } from './BookThumbnail'
import { BookPrice } from './BookPrice'

interface BookListItemProps {
  book: Book
}

const openPurchase = (url: string) =>
  window.open(url, '_blank', 'noopener,noreferrer')

const DetailToggle = ({
  expanded,
  onToggle,
}: {
  expanded: boolean
  onToggle: () => void
}) => (
  <Button
    variant="secondary"
    className="w-[115px]"
    aria-expanded={expanded}
    onClick={onToggle}
  >
    상세보기
    <ChevronDownIcon className={cn('transition-transform', expanded && 'rotate-180')} />
  </Button>
)

export const BookListItem = ({ book }: BookListItemProps) => {
  const [expanded, setExpanded] = useState(false)
  const author = book.authors.join(', ')
  const toggle = () => setExpanded((prev) => !prev)

  if (expanded) {
    return (
      <li className="border-b border-palette-gray">
        <div className="flex gap-8 py-6">
          <BookThumbnail
            book={book}
            className="h-[280px] w-[210px]"
            heartSize={24}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-baseline gap-2">
              <h3 className="truncate text-body1 font-bold">{book.title}</h3>
              {author && (
                <span className="shrink-0 text-caption text-text-secondary">
                  {author}
                </span>
              )}
            </div>

            <h4 className="mt-4 text-title3 font-bold">책 소개</h4>
            <p className="mt-3 text-body2 leading-6 whitespace-pre-line text-text-secondary">
              {book.contents ? `${book.contents}...` : '소개 정보가 없습니다.'}
            </p>
          </div>

          <div className="flex w-[240px] shrink-0 flex-col justify-between">
            <div className="flex justify-end">
              <DetailToggle expanded={expanded} onToggle={toggle} />
            </div>

            <div>
              <BookPrice book={book} variant="detailed" className="mb-4" />

              <Button
                className="w-full"
                onClick={() => openPurchase(book.url)}
              >
                구매하기
              </Button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className="border-b border-palette-gray">
      <div className="flex items-center gap-8 py-4">
        <BookThumbnail book={book} className="h-[68px] w-12" heartSize={16} />

        <div className="flex min-w-0 flex-1 items-baseline gap-3">
          <h3 className="truncate text-title3 font-bold">{book.title}</h3>
          {author && (
            <span className="shrink-0 truncate text-body2 text-text-secondary">
              {author}
            </span>
          )}
        </div>

        <BookPrice book={book} className="shrink-0" />

        <div className="flex shrink-0 items-center gap-2">
          <Button className="w-[115px]" onClick={() => openPurchase(book.url)}>
            구매하기
          </Button>
          <DetailToggle expanded={expanded} onToggle={toggle} />
        </div>
      </div>
    </li>
  )
}
