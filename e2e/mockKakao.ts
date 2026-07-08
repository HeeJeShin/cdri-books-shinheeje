import type { Page } from '@playwright/test'

const BOOKS = [
  {
    authors: ['무라카미 하루키'],
    contents: '하루키 월드의 빛나는 다이아몬드, 무라카미 하루키의 대표작.',
    datetime: '1989-01-01T00:00:00.000+09:00',
    isbn: '8937473135 9788937473135',
    price: 16000,
    publisher: '민음사',
    sale_price: 13500,
    status: '정상판매',
    thumbnail: '',
    title: '노르웨이의 숲',
    translators: ['양억관'],
    url: 'https://search.daum.net/search?q=norwegian-wood',
  },
  {
    authors: ['무라카미 하루키'],
    contents: '1Q84의 세계로 들어가는 첫 번째 책.',
    datetime: '2009-01-01T00:00:00.000+09:00',
    isbn: '8935650005 9788935650002',
    price: 15000,
    publisher: '문학동네',
    sale_price: 13320,
    status: '정상판매',
    thumbnail: '',
    title: '1Q84 1',
    translators: ['양억관'],
    url: 'https://search.daum.net/search?q=1q84',
  },
  {
    authors: ['무라카미 하루키'],
    contents: '노르웨이의 숲의 옛 제목으로 출간된 판본.',
    datetime: '1990-01-01T00:00:00.000+09:00',
    isbn: '8937400002 9788937400001',
    price: 14000,
    publisher: '문학사상사',
    sale_price: 13300,
    status: '정상판매',
    thumbnail: '',
    title: '상실의 시대',
    translators: ['유유정'],
    url: 'https://search.daum.net/search?q=lost-era',
  },
]

/** Intercepts the Kakao book-search endpoint and returns deterministic data. */
export const mockBookSearch = async (page: Page) => {
  await page.route('**/dapi.kakao.com/v3/search/book*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        documents: BOOKS,
        meta: {
          total_count: BOOKS.length,
          pageable_count: BOOKS.length,
          is_end: true,
        },
      }),
    })
  })
}
