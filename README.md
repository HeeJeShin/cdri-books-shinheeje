# CERTICOS BOOKS

카카오 책 검색 API를 활용한 도서 검색 웹 애플리케이션입니다.

> CDRI 프론트엔드 사전과제 · [Figma 디자인](https://www.figma.com/design/VHM0w7IBWLaaCJp0l9Mkff/certicos-Books)

<br />

## 프로젝트 개요

카카오 책 검색 API를 연동해 도서를 검색·탐색하고, 관심 도서를 찜해 모아보는 SPA입니다.

- **도서 검색** — 키워드 검색, 페이지당 10건 · 상세 검색(제목 / 저자명 / 출판사, 전체 검색과 상호 배타)
- **도서 상세** — 목록에서 펼쳐 책 소개·원가/할인가 확인, 구매 링크 이동
- **찜하기** — localStorage 영속(브라우저 재시작 후에도 유지), 찜한 시점의 데이터 스냅샷 저장
- **그 외** — 반응형(모바일 햄버거 메뉴) · 찜 토스트 · 상태코드별 에러 처리

> 필수 스택: **React · TypeScript · React Query**

<br />

## 실행 방법 및 환경 설정



```bash
# 1. 의존성 설치
pnpm install

# 2. 환경 변수 설정 (프로젝트 루트에 .env 생성)
#    카카오 REST API 키: https://developers.kakao.com/console/app
echo "VITE_KAKAO_API_KEY=발급받은_REST_API_키" >> .env
echo "VITE_KAKAO_API_BASE_URL=https://dapi.kakao.com" >> .env

# 3. 개발 서버 실행 (http://localhost:5173)
pnpm dev
```



**그 외 스크립트**

```bash
pnpm build          # 타입체크 후 프로덕션 빌드
pnpm preview        # 빌드 결과 미리보기
pnpm lint           # oxlint
pnpm typecheck      # 타입 검사 (앱 + 테스트)
pnpm test           # Vitest 유닛/컴포넌트 테스트
pnpm e2e            # Playwright E2E (카카오 API 목)
```

<br />

## 폴더 구조 및 주요 코드 설명

레이어(공통)와 도메인(기능)을 분리해 재사용성과 응집도를 높였습니다.

```
public/images/                # 색이 바뀌지 않는 정적 이미지
e2e/                          # Playwright E2E 스펙 + 카카오 API 목
tailwind.config.ts            # 디자인 토큰(색상·타이포·폰트)
src/
├── app/                      # 앱 조립: providers(QueryClient), router
├── api/kakaoClient.ts        # 카카오 REST 공통 fetch 래퍼 (인증·에러 정규화)
├── config/env.ts             # 환경 변수 중앙 관리
├── assets/icons/             # 색이 바뀌는 UI 아이콘 SVG (svgr 컴포넌트)
├── components/
│   ├── layout/               # 레이아웃 (Header, RootLayout) — 분리 관리
│   └── ui/                   # 공통 UI (Button, Select, Pagination, NoData, icons, toast/)
├── hooks/                    # 공통 훅 (useOnClickOutside)
├── utils/                    # 공통 함수 (cn, formatPrice, uniqueBy)
├── types/book.ts             # 도메인 타입
├── features/                 # 기능(도메인) 단위 모듈
│   ├── books/                #   api / hooks / components / constants · 검색기록 스토어
│   └── favorites/            #   favoritesStore / useFavorites / components
├── pages/                    # 라우트 페이지 (SearchPage, FavoritesPage)
└── test/                     # Vitest 셋업 · 픽스처
```

**폴더 / 코드 규칙**

- 공통 함수 → `utils`, 공통 훅 → `hooks`, 공통 UI → `components/ui`, 레이아웃 → `components/layout`(분리)
- 기능(도메인) 단위는 `features/*` — 각 기능이 자기 `api`·`hooks`·`components`를 소유
- 환경 변수는 `config/env.ts`, 함수는 화살표 함수로 통일

**주요 코드 설명**

- **`api/kakaoClient.ts`** — 모든 카카오 호출이 거치는 공통 래퍼. base URL·`KakaoAK` 인증 헤더 주입, 실패 시 `KakaoApiError`로 정규화하며 상태코드별 한글 메시지를 제공합니다.
- **`features/books/hooks/useBookSearch.ts`** — `useQuery` 기반 페이지 단위 검색 훅. 검색어가 없으면 `enabled`로 요청을 막고, `placeholderData`로 페이지 전환 시 깜빡임을 줄입니다.
- **`components/ui/Pagination.tsx`** — 재사용 페이지네이션(`currentPage`/`totalPages`/`onPageChange`). 검색 결과·찜 목록에서 공용.
- **`features/favorites/favoritesStore.ts`** — `useSyncExternalStore` 외부 스토어. 찜 목록을 localStorage에 영속하고 찜한 시점의 데이터를 스냅샷으로 저장하며, `storage` 이벤트로 탭 간 동기화합니다.
- **`components/ui/toast/`** — 외부 라이브러리 없이 만든 공통 토스트. 어디서든 `toast.show('...')`로 호출합니다.
- **`pages/SearchPage.tsx`** — 검색어/조건/페이지를 URL 쿼리(`?q=`, `?target=`, `?page=`)에 동기화합니다.

<br />

## 라이브러리 선택 이유

| 라이브러리 | 선택 이유 |
| --- | --- |
| **React 19 + TypeScript** *(필수)* | 컴포넌트 기반 UI + 타입 안정성 |
| **TanStack React Query** *(필수)* | 서버 상태 캐싱·로딩/에러·페이지네이션(`useQuery`+`keepPreviousData`)을 선언적으로 처리 |
| **Vite + pnpm** | 가벼운 설정과 빠른 개발/빌드 (검색·찜 중심 SPA라 SSR 불필요 → Next.js 대신 선택) |
| **React Router v7** | 화면 라우팅 + 검색어·페이지를 URL로 관리 |
| **Tailwind CSS v4** | 디자인 토큰을 `tailwind.config.ts`에 단일 관리, 빠르고 일관된 스타일링 |
| **vite-plugin-svgr** | SVG를 컴포넌트로 import → `currentColor`로 색·상태(하트 채움/외곽선) 제어 |
| **Vitest + Testing Library** | 유틸·스토어·컴포넌트 유닛 테스트 |
| **Playwright** | 주요 사용자 흐름 E2E 테스트 (카카오 API 목) |
| **oxlint** | 빠른 정적 분석 |

> 토스트는 작은 기능이라 외부 라이브러리 대신 `useSyncExternalStore`로 직접 구현해 번들을 아꼈습니다.

<br />

## 강조하고 싶은 기능

1. **디자인 토큰 기반 UI** — Figma 색상/타이포/치수를 `tailwind.config.ts`에 토큰화해 일관성과 디자인 정합성 확보.
2. **세심한 UX/인터랙션 디테일** (요구사항 외 직접 고안) —
   - 검색 결과 문구에 **검색어를 강조** 노출: `"검색어" 검색 결과 총 N건` (primary·굵게)
   - **하트 hover 시 확대·빨강 강조**로 찜 액션을 직관화
   - 찜 시 **토스트**로 즉시 피드백
   - 검색어·조건·페이지를 **URL에 동기화**해 공유/북마크/뒤로가기 지원
   - 검색창 포커스 시 **최근 검색어** 드롭다운, 상세검색 셀렉트 등 공통 UI 정합
3. **찜하기 영속 & 스냅샷** — `useSyncExternalStore` + localStorage로 새로고침/탭·브라우저 재시작 간 유지, 찜한 시점의 데이터를 스냅샷으로 저장.
4. **페이지네이션** — 페이지당 10건, 현재 페이지를 URL(`?page=`)에 동기화. `Pagination` 공통 컴포넌트로 검색/찜에서 재사용.
5. **전체/상세 검색 상호 배타** — 한쪽 검색을 시작하면 다른 쪽 조건이 초기화되도록 URL 기준으로 상태 단일화.
6. **견고한 API 처리** — 공통 클라이언트에서 인증·에러 정규화, 상태코드별 한글 메시지 + 429·5xx 선별 재시도 + 요청 취소(AbortSignal).
7. **성능 최적화** — React Query 캐싱·`keepPreviousData`, 이미지 `lazy` 로딩, 폰트 서브셋 로딩.
8. **반응형 & 접근성** — 모바일 햄버거 메뉴, 시맨틱 마크업과 `aria-*`.
9. **테스트** — Vitest 유닛/컴포넌트 + Playwright E2E로 핵심 로직과 사용자 흐름 검증.
