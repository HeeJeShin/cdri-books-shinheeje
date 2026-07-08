import { expect, test } from '@playwright/test'
import { mockBookSearch } from './mockKakao'

test.beforeEach(async ({ page }) => {
  await mockBookSearch(page)
})

test('searches books and shows the result count and list', async ({ page }) => {
  await page.goto('/')

  await page.getByPlaceholder('검색어를 입력하세요').fill('무라카미')
  await page.getByPlaceholder('검색어를 입력하세요').press('Enter')

  await expect(page.getByText('도서 검색 결과')).toBeVisible()
  await expect(page.getByText('3', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: '노르웨이의 숲' })).toBeVisible()
  await expect(page.getByText('13,500원')).toBeVisible()
})

test('expands a book to reveal its detail', async ({ page }) => {
  await page.goto('/?q=무라카미')

  await page.getByRole('button', { name: /상세보기/ }).first().click()

  await expect(page.getByText('책 소개')).toBeVisible()
  await expect(page.getByText('원가')).toBeVisible()
  await expect(page.getByText('할인가')).toBeVisible()
})

test('favorites a book and shows it on the favorites page', async ({ page }) => {
  await page.goto('/?q=무라카미')

  await page.getByRole('button', { name: '찜하기' }).first().click()

  await page.getByRole('link', { name: '내가 찜한 책' }).click()
  await expect(page).toHaveURL(/\/favorites/)
  await expect(page.getByText(/찜한 책 총\s*1\s*건/)).toBeVisible()
  await expect(page.getByRole('heading', { name: '노르웨이의 숲' })).toBeVisible()
})

test('shows the empty state before searching', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('검색된 결과가 없습니다.')).toBeVisible()
})
