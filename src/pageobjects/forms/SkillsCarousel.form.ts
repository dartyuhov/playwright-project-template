import { Locator, Page } from '@playwright/test';
import { IForm } from '../types/types.d';

export default class SkillsCarousel implements IForm {
  public readonly locator: Locator;

  constructor(private readonly page: Page) {
    this.locator = page.getByLabel('Skills carousel');
  }

  getSkillSlide(name: string) {
    return this.locator.getByLabel(`skill ${name}`);
  }
}
