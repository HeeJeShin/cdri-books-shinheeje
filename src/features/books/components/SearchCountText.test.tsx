import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SearchCountText } from './SearchCountText'

describe('SearchCountText', () => {
  it('renders the label and a locale-formatted count', () => {
    const { container } = render(
      <SearchCountText label="도서 검색 결과" count={1349} />,
    )
    expect(container.textContent).toContain('도서 검색 결과')
    expect(screen.getByText('1,349')).toBeInTheDocument()
  })
})
