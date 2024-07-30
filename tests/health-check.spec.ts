import { expect } from '@playwright/test';
import test from './fixtures';

test('user can open cv', async ({ portfolio }) => {
  await expect(portfolio.summary.helloText).toHaveText("Hello, I'm Dzmitry.");
});
