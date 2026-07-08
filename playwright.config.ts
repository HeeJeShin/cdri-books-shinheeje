import { defineConfig, devices } from '@playwright/test'

const PORT = 5199
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Boot the dev server for the tests. The Kakao API is mocked in-test, so a
  // real API key is not required — a placeholder keeps requests flowing to the
  // intercepted route.
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: {
      VITE_KAKAO_API_KEY: 'e2e-test-key',
      VITE_KAKAO_API_BASE_URL: 'https://dapi.kakao.com',
    },
  },
})
