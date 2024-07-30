import { Locator, BrowserContext, Page } from '@playwright/test';
import { SocialNetworkLinkType } from '../../models/types.d';
import { IForm } from '../types/types.d';

export default class Footer implements IForm {
  public readonly locator: Locator;

  private readonly context: BrowserContext;

  constructor(
    private readonly page: Page,
    context: BrowserContext,
  ) {
    this.locator = page.getByLabel('Footer');
    this.context = context;
  }

  async goToSocial(socialNetwork: SocialNetworkLinkType) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      this.getSocialLinkLocator(socialNetwork).click(),
    ]);
    return newPage;
  }

  getSocialLink(socialNetwork: SocialNetworkLinkType) {
    return this.getSocialLinkLocator(socialNetwork);
  }

  private getSocialLinkLocator(socialNetwork: SocialNetworkLinkType) {
    return this.locator.getByRole('link', { name: `${socialNetwork} link` });
  }
}
