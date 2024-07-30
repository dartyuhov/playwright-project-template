import { Locator, BrowserContext, Page } from '@playwright/test';
import { SocialNetworkLinkType } from '../../models/types.d';
import { IForm } from '../types/types.d';

export default class Summary implements IForm {
  public readonly locator: Locator;

  constructor(
    private readonly page: Page,
    private readonly context: BrowserContext,
  ) {
    this.locator = page.getByTestId('sammary-container');
  }

  get helloText() {
    return this.locator.locator('span[class^=HelloText_hello]');
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
    return this.locator.locator(`a:has(#${socialNetwork.toLowerCase()}-link)`);
  }
}
