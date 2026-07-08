import type { Config } from 'tailwindcss'

// Figma "certicos Books" 디자인 토큰을 한 곳에서 관리합니다.
// index.css 의 `@config` 지시자로 연결됩니다. (Tailwind v4)
export default {
  theme: {
    extend: {
      // 색상: Figma Style 팔레트/텍스트 컬러
      colors: {
        primary: '#4880ee', // Primary
        red: '#e84118', // Red (accent)
        palette: {
          gray: '#dadada', // Gray
          lightgray: '#f2f4f6', // LightGray
        },
        text: {
          primary: '#353c49', // Text/Primary
          secondary: '#6d7582', // Text/Secondary
          subtitle: '#8d94a0', // Text/Subtitle
        },
      },
      // 폰트
      fontFamily: {
        sans: [
          'Noto Sans KR',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
      },
      // 타이포 스케일 (크기 / 줄간격) — Figma Typography
      fontSize: {
        title1: ['24px', { lineHeight: '24px' }],
        title2: ['22px', { lineHeight: '24px' }],
        title3: ['18px', { lineHeight: '18px' }],
        body1: ['20px', { lineHeight: '20px' }],
        body2: ['14px', { lineHeight: '20px' }],
        caption: ['16px', { lineHeight: '16px' }],
        small: ['10px', { lineHeight: '10px' }],
      },
    },
  },
} satisfies Config
