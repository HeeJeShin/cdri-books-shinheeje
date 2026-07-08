import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('포커스하면 최근 검색어 드롭다운을 보여준다', async () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        history={['노르웨이 숲', '무라카미 하루키']}
      />,
    )

    // 포커스 전에는 안 보임
    expect(screen.queryByText('노르웨이 숲')).not.toBeInTheDocument()

    await userEvent.click(screen.getByLabelText('도서 검색어'))

    expect(screen.getByText('노르웨이 숲')).toBeInTheDocument()
    expect(screen.getByText('무라카미 하루키')).toBeInTheDocument()
  })

  it('검색어 클릭 시 onSelectHistory가 호출된다', async () => {
    const onSelectHistory = vi.fn()
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        history={['노르웨이 숲']}
        onSelectHistory={onSelectHistory}
      />,
    )
    await userEvent.click(screen.getByLabelText('도서 검색어'))
    await userEvent.click(screen.getByText('노르웨이 숲'))
    expect(onSelectHistory).toHaveBeenCalledWith('노르웨이 숲')
  })

  it('X 클릭 시 onRemoveHistory가 호출된다', async () => {
    const onRemoveHistory = vi.fn()
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        history={['노르웨이 숲']}
        onRemoveHistory={onRemoveHistory}
      />,
    )
    await userEvent.click(screen.getByLabelText('도서 검색어'))
    await userEvent.click(screen.getByRole('button', { name: /검색기록 삭제/ }))
    expect(onRemoveHistory).toHaveBeenCalledWith('노르웨이 숲')
  })
})
