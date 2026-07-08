// SVG 파일을 컴포넌트로 모아 re-export (vite-plugin-svgr).
// 실제 그래픽은 src/assets/icons/*.svg 에 있고, 여기선 컴포넌트로만 노출합니다.
// 색은 currentColor를 쓰므로 text-* 유틸로 제어합니다.
export { default as SearchIcon } from '@/assets/icons/search.svg?react'
export { default as ChevronDownIcon } from '@/assets/icons/chevron-down.svg?react'
export { default as CloseIcon } from '@/assets/icons/close.svg?react'
// 찜: 안 찜(외곽선) / 찜(채움) 두 상태
export { default as HeartOutlineIcon } from '@/assets/icons/heart-outline.svg?react'
export { default as HeartFillIcon } from '@/assets/icons/heart-fill.svg?react'
