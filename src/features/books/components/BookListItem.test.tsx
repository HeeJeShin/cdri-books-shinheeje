import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeBook } from '@/test/fixtures'
import { BookListItem } from './BookListItem'

describe('BookListItem', () => {
  it('renders title, author and discounted price when collapsed', () => {
    render(<BookListItem book={makeBook()} />)
    expect(screen.getByText('노르웨이의 숲')).toBeInTheDocument()
    expect(screen.getByText('무라카미 하루키')).toBeInTheDocument()
    expect(screen.getByText('13,500원')).toBeInTheDocument()
    // Detail-only content is hidden until expanded.
    expect(screen.queryByText('책 소개')).not.toBeInTheDocument()
  })

  it('expands to show the description and original/sale price', async () => {
    render(<BookListItem book={makeBook({ isbn: 'expand-1' })} />)

    await userEvent.click(screen.getByRole('button', { name: /상세보기/ }))

    expect(screen.getByText('책 소개')).toBeInTheDocument()
    expect(screen.getByText('원가')).toBeInTheDocument()
    expect(screen.getByText('할인가')).toBeInTheDocument()
    expect(screen.getByText('16,000원')).toBeInTheDocument()
  })

  it('toggles favorite state via the heart button', async () => {
    render(<BookListItem book={makeBook({ isbn: 'fav-1' })} />)

    const addButton = screen.getByRole('button', { name: '찜하기' })
    await userEvent.click(addButton)

    expect(screen.getByRole('button', { name: '찜 해제' })).toBeInTheDocument()
  })
})
