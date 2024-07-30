import { expect } from '@playwright/test';
import test from '../fixtures';

import skillsData from '../../resources/skills.json';

test.describe('My Skills', () => {
  skillsData.forEach(({ name }) => {
    test(`should show ${name} skills`, async ({ portfolio }) => {
      await portfolio.header.goTo('Skills');
      await expect(portfolio.skillsCarousel.getSkillSlide(name)).toBeVisible();
    });
  });
});
