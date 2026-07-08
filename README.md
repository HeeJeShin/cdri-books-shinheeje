# CERTICOS BOOKS

카카오 책 검색 API를 활용한 도서 검색 웹 애플리케이션입니다.
도서를 검색하고, 상세 정보를 확인하며, 관심 있는 책을 찜하여 모아볼 수 있습니다.

> CDRI 프론트엔드 사전과제 · [Figma 디자인](https://www.figma.com/design/VHM0w7IBWLaaCJp0l9Mkff/certicos-Books)

<br />

## 프로젝트 개요

- **도서 검색** — 카카오 책 검색 API로 키워드 검색, 무한 스크롤(페이지당 10건)
- **상세 검색** — 제목 / 저자명 / 출판사 조건을 선택해 검색 (전체 검색과 상호 배타)
- **도서 상세** — 목록에서 펼쳐 책 소개·원가/할인가 확인, 구매 링크 이동
- **찜하기** — 관심 도서를 찜하여 별도 페이지에서 확인 (브라우저 재시작 후에도 유지)

<br />

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Core | React 19, TypeScript |
| Data | TanStack React Query v5 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Build | Vite 8, pnpm |
| Lint | oxlint |

<br />

## 실행 방법 및 환경 설정

### 1. 요구 사항

- Node.js 20+ / pnpm 9+

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 [카카오 REST API 키](https://developers.kakao.com/console/app)를 입력합니다.

```bash
# .env
VITE_KAKAO_API_KEY=발급받은_REST_API_키
VITE_KAKAO_API_BASE_URL=https://dapi.kakao.com
```

> 카카오 책 검색은 앱 단위 인증(`Authorization: KakaoAK {REST_API_KEY}`)을 사용하므로
> **REST API 키**가 필요합니다. (JavaScript 키·액세스 토큰 아님)

### 4. 개발 서버 실행

```bash
pnpm dev        # http://localhost:5173
```

### 그 외 스크립트

```bash
pnpm build      # 타입체크 후 프로덕션 빌드
pnpm preview    # 빌드 결과 미리보기
pnpm lint       # oxlint
```

<br />

## 폴더 구조

레이어(공통)와 도메인(기능)을 분리해 재사용성과 응집도를 높였습니다.

```
src/
├── app/                    # 앱 조립: 프로바이더, 라우터
│   ├── providers.tsx       #   QueryClient 설정
│   └── router.tsx
├── api/
│   └── kakaoClient.ts      # 카카오 REST 공통 fetch 래퍼 (인증 헤더·에러 정규화)
├── components/
│   ├── layout/             # 레이아웃 (Header, RootLayout) — 분리 관리
│   └── ui/                 # 공통 UI (Button, NoData, icons)
├── hooks/                  # 공통 훅 (useDebounce, useInfiniteScroll, useOnClickOutside)
├── utils/                  # 공통 함수 (cn, formatPrice)
├── types/
│   └── book.ts             # 도메인 타입
├── features/               # 기능(도메인) 단위 모듈
│   ├── books/
│   │   ├── api/            #   searchBooks
│   │   ├── hooks/          #   useBookSearch (useInfiniteQuery)
│   │   ├── components/     #   SearchBar, DetailSearchPopup, BookListItem ...
│   │   └── constants.ts
│   └── favorites/
│       ├── favoritesStore.ts   #   localStorage 외부 스토어
│       ├── useFavorites.ts
│       └── components/FavoriteButton.tsx
└── pages/                  # 라우트 페이지 (SearchPage, FavoritesPage)
```

### 주요 코드 설명

- **`api/kakaoClient.ts`** — 모든 카카오 호출이 거치는 얇은 래퍼. base URL·`KakaoAK` 인증 헤더 주입, 실패 시 `KakaoApiError`로 정규화하여 상태 코드까지 전달합니다.
- **`features/books/hooks/useBookSearch.ts`** — `useInfiniteQuery` 기반 검색 훅. 검색어가 없으면 요청하지 않도록 `enabled`로 제어하고, `meta.is_end`로 다음 페이지 유무를 판단합니다.
- **`features/favorites/favoritesStore.ts`** — `useSyncExternalStore`용 외부 스토어. 찜 목록을 localStorage에 영속하고, **찜한 시점의 도서 데이터를 스냅샷으로 저장**합니다(요구사항). `storage` 이벤트를 구독해 탭 간 동기화도 지원합니다.
- **`hooks/useInfiniteScroll.ts`** — `IntersectionObserver`로 하단 센티넬을 감지해 다음 페이지를 로드합니다.
- **`pages/SearchPage.tsx`** — 검색어/조건을 URL 쿼리(`?q=`, `?target=`)에 동기화해 공유·뒤로가기가 자연스럽게 동작합니다.

<br />

## 라이브러리 선택 이유

- **Vite + React (SPA)** — 검색·찜 중심의 클라이언트 인터랙션 앱이라 SSR이 불필요하고, React Query 기반 클라이언트 페칭과 결이 맞아 Next.js 대신 선택했습니다. 설정이 가볍고 개발/빌드가 빠릅니다.
- **TanStack React Query** — 서버 상태(검색 결과)의 캐싱·로딩/에러 상태·무한 스크롤(`useInfiniteQuery`)을 선언적으로 처리합니다. 동일 검색어의 중복 요청을 캐시로 절약합니다.
- **Tailwind CSS v4** — Figma의 디자인 토큰(색상·타이포)을 `tailwind.config.ts`에 정의해 **단일 소스**로 관리합니다(`@config`로 연결). 재사용 컴포넌트 설계에 유리하고 스타일 일관성을 강제합니다.
- **React Router v7** — 검색/찜 두 화면 라우팅과 URL 기반 검색 상태 관리를 담당합니다.

<br />

## 강조하고 싶은 기능

1. **디자인 토큰 기반 UI** — Figma의 색상/타이포/컴포넌트 치수를 토큰화해 화면 전반의 일관성과 디자인 정합성을 확보했습니다.
2. **찜하기 영속 & 스냅샷** — `useSyncExternalStore` + localStorage로 새로고침/탭 간에도 상태가 유지되며, 찜한 시점의 데이터를 저장해 API 결과 변동과 무관하게 목록을 보존합니다.
3. **전체/상세 검색 상호 배타** — 요구사항대로 한쪽 검색을 시작하면 다른 쪽 조건이 초기화되도록 상태를 단일화했습니다.
4. **성능 최적화** — `useInfiniteQuery` 캐싱, `IntersectionObserver` 무한 스크롤, 이미지 `lazy` 로딩, 폰트 서브셋 로딩으로 불필요한 요청/렌더를 줄였습니다.
5. **URL 동기화 검색** — 검색 상태를 URL에 반영해 공유·북마크·뒤로가기를 지원합니다.
```
