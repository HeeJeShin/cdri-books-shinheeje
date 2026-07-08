import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats with thousands separators and won suffix', () => {
    expect(formatPrice(13500)).toBe('13,500원')
    expect(formatPrice(1000000)).toBe('1,000,000원')
  })

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('0원')
  })
})
