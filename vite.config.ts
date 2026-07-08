/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  // svgr: `import Icon from './x.svg?react'` 로 SVG를 React 컴포넌트처럼 사용
  plugins: [svgr(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 포트를 고정합니다. 포트(origin)가 바뀌면 localStorage(찜 목록)도 분리되므로,
  // 개발 중에도 찜 목록이 유지되도록 항상 5173을 쓰게 합니다.
  server: {
    port: 5173,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    // E2E specs live under e2e/ and run with Playwright, not Vitest.
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**'],
  },
})
