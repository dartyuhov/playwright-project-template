import { Locator, Page } from '@playwright/test';
import { NavigationLinkType } from '../../models/types.d';
import { IForm } from '../types/types.d';

export default class Navigation implements IForm {
  readonly locator: Locator;

  constructor(private readonly page: Page) {
    this.locator = page.getByRole('navigation');
  }

  async goTo(linkName: NavigationLinkType) {
    await this.locator
      .getByRole('button', { name: linkName.toString() })
      .click();
  }
}
