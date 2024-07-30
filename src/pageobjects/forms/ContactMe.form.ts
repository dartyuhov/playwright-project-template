import { Locator, Page } from '@playwright/test';
import { IForm } from '../types/types.d';

export default class ContactMe implements IForm {
  readonly locator: Locator;

  constructor(private readonly page: Page) {
    this.locator = page.getByRole('form', { name: 'Contact me' });
  }

  async fill(data: {
    name: string;
    email: string;
    message: string;
    subject: string;
  }) {
    await this.locator
      .getByRole('textbox', { name: 'Your Name:' })
      .fill(data.name);
    await this.locator
      .getByRole('textbox', { name: 'Your Email:' })
      .fill(data.email);
    await this.locator
      .getByRole('textbox', { name: 'Subject:' })
      .fill(data.subject);
    await this.locator
      .getByRole('textbox', { name: 'Message:' })
      .fill(data.message);
    await this.locator.getByLabel('Submit').click();
  }
}
