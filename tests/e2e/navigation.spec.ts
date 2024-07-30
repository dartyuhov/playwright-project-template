import { expect } from '@playwright/test';
import test from '../fixtures';
import { SocialNetworkLinkType } from '../../src/models/types.d';

import userData from '../../resources/userData.json';

test.describe('Social links', () => {
  userData.socialLinks.forEach(({ name, link }) => {
    test(`user should be able to go to ${name} from summary`, async ({
      portfolio,
    }) => {
      await expect(
        portfolio.summary.getSocialLink(name as SocialNetworkLinkType),
      ).toHaveAttribute('href', link);
    });

    test(`user should be able to go to ${name} from footer`, async ({
      portfolio,
    }) => {
      await expect(
        portfolio.footer.getSocialLink(name as SocialNetworkLinkType),
      ).toHaveAttribute('href', link);
    });
  });
});

test.describe('Navigation', () => {
  test('user should be able to go to Skills', async ({ portfolio }) => {
    await portfolio.header.goTo('Skills');
    await expect(portfolio.skillsCarousel.locator).toBeVisible();
  });

  test('user should be able to go to My Projects', async ({ portfolio }) => {
    await portfolio.header.goTo('My Projects');
    await expect(portfolio.myProjects.locator).toBeVisible();
  });

  test('user should be able to go to Contact Me', async ({ portfolio }) => {
    await portfolio.header.goTo('Contact me');
    await expect(portfolio.contactMe.locator).toBeVisible();
  });

  test('user should be able to download cv', async ({ portfolio }) => {
    const newTab = await portfolio.header.downloadCv();
    await expect(newTab).toHaveURL(/.*dartyuhov_cv_2022\.pdf.*/);
  });
});
