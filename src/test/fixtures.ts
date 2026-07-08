import type { Book } from '@/types/book'

/** Builds a Book fixture; override any field per test. */
export const makeBook = (overrides: Partial<Book> = {}): Book => ({
  authors: ['무라카미 하루키'],
  contents: '하루키 월드의 빛나는 다이아몬드',
  datetime: '2020-01-01T00:00:00.000+09:00',
  isbn: '8937473135 9788937473135',
  price: 16000,
  publisher: '민음사',
  sale_price: 13500,
  status: '정상판매',
  thumbnail: 'https://example.com/thumb.jpg',
  title: '노르웨이의 숲',
  translators: [],
  url: 'https://example.com/book',
  ...overrides,
})
