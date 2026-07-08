import { expect, test } from '@playwright/test'
import { mockBookSearch } from './mockKakao'

test.beforeEach(async ({ page }) => {
  await mockBookSearch(page)
})

test('opens the detail-search popup and searches by a selected target', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByRole('button', { name: '상세검색' }).click()
  const dialog = page.getByRole('dialog', { name: '상세 검색' })
  await expect(dialog).toBeVisible()

  // Pick 저자명 from the target dropdown.
  await dialog.getByRole('button', { name: /제목/ }).click()
  await dialog.getByRole('option', { name: '저자명' }).click()

  await dialog.getByPlaceholder('검색어 입력').fill('무라카미')
  await dialog.getByRole('button', { name: '검색하기' }).click()

  // Popup closes and results render.
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('heading', { name: '노르웨이의 숲' })).toBeVisible()
  await expect(page).toHaveURL(/target=person/)
})

test('detail search clears the main search pill (mutual exclusion)', async ({
  page,
}) => {
  await page.goto('/?q=기존검색어')
  await expect(page.getByPlaceholder('검색어를 입력하세요')).toHaveValue('기존검색어')

  await page.getByRole('button', { name: '상세검색' }).click()
  const dialog = page.getByRole('dialog', { name: '상세 검색' })
  await dialog.getByPlaceholder('검색어 입력').fill('무라카미')
  await dialog.getByRole('button', { name: '검색하기' }).click()

  await expect(page.getByPlaceholder('검색어를 입력하세요')).toHaveValue('')
})
