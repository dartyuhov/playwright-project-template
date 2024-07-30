import { Page, BrowserContext } from '@playwright/test';
import {
  ContactMe,
  Footer,
  Header,
  MyProjects,
  SkillsCarousel,
  Summary,
} from './forms';

export default class Portfolio {
  public contactMe: ContactMe;
  public header: Header;
  public footer: Footer;
  public summary: Summary;
  public skillsCarousel: SkillsCarousel;
  public myProjects: MyProjects;

  constructor(
    public readonly page: Page,
    public readonly context: BrowserContext,
  ) {
    this.header = new Header(page, context);
    this.footer = new Footer(this.page, this.context);
    this.contactMe = new ContactMe(page);
    this.summary = new Summary(this.page, this.context);
    this.skillsCarousel = new SkillsCarousel(this.page);
    this.myProjects = new MyProjects(this.page);
  }

  async open() {
    await this.page.goto('/dartyuhov-cv');
  }

  getNotification() {
    return {
      title: this.page
        .getByRole('alert')
        .locator('.mantine-Notification-title'),
      description: this.page
        .getByRole('alert')
        .locator('.mantine-Notification-description'),
    };
  }
}
