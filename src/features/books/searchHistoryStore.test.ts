import { beforeEach, describe, expect, it, vi } from 'vitest'

const STORAGE_KEY = 'cdri-books:search-history'

const loadStore = async () => {
  vi.resetModules()
  return import('./searchHistoryStore')
}

beforeEach(() => {
  localStorage.clear()
})

describe('searchHistoryStore', () => {
  it('최신 검색어를 앞에 추가한다', async () => {
    const { searchHistoryStore } = await loadStore()
    searchHistoryStore.add('a')
    searchHistoryStore.add('b')
    expect(searchHistoryStore.getSnapshot()).toEqual(['b', 'a'])
  })

  it('중복 검색어는 최신 위치로 끌어올린다', async () => {
    const { searchHistoryStore } = await loadStore()
    searchHistoryStore.add('a')
    searchHistoryStore.add('b')
    searchHistoryStore.add('a')
    expect(searchHistoryStore.getSnapshot()).toEqual(['a', 'b'])
  })

  it('최대 8개만 유지하고 오래된 것부터 지운다', async () => {
    const { searchHistoryStore } = await loadStore()
    for (const k of ['1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      searchHistoryStore.add(k)
    }
    const snap = searchHistoryStore.getSnapshot()
    expect(snap).toHaveLength(8)
    expect(snap[0]).toBe('9') // 최신
    expect(snap).not.toContain('1') // 가장 오래된 것 제거됨
  })

  it('빈 문자열/공백은 추가하지 않는다', async () => {
    const { searchHistoryStore } = await loadStore()
    searchHistoryStore.add('   ')
    expect(searchHistoryStore.getSnapshot()).toEqual([])
  })

  it('개별 삭제가 동작한다', async () => {
    const { searchHistoryStore } = await loadStore()
    searchHistoryStore.add('a')
    searchHistoryStore.add('b')
    searchHistoryStore.remove('a')
    expect(searchHistoryStore.getSnapshot()).toEqual(['b'])
  })

  it('localStorage에서 복원한다(브라우저 재시작 유지)', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['노르웨이 숲', '무라카미']))
    const { searchHistoryStore } = await loadStore()
    expect(searchHistoryStore.getSnapshot()).toEqual(['노르웨이 숲', '무라카미'])
  })
})
