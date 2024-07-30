import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const desktopViewport = { width: 1080, height: 720 };
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests/',
  timeout: 25000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : 4,
  reporter: [['html', { open: 'never' }]],
  retries: process.env.CI ? 2 : 0,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: desktopViewport,
      },
    },
  ],

  use: {
    actionTimeout: process.env.CI ? 20000 : 10000,
    video: 'on-first-retry',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: process.env.HEADLESS ? process.env.HEADLESS === 'true' : true,
    baseURL: 'https://dartyuhov.github.io',
    testIdAttribute: 'data-testid',
  },
};

export default config;
