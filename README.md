# Playwriht project example:

## Quick start

#### Install the dependencies:
```bash
npm install
```

#### Execute tests:

```bash
npm test
```

#### Run tests without headless:
Mac & Linux:
```bash
HEADLESS=false npm run test
```

Windows:
```powershell
set HEALDESS=false
npm run test
```


#### Show test report:
```bash
npm run test:show-report
```

## Page Objects

Handles interactions with the specific page/form. Example of page object:

```typescript
import { Locator, Page } from '@playwright/test';
import { IForm } from '../types/types.d';

export default class YourForm implements IForm {
  public readonly locator: Locator;

  constructor(private readonly page: Page) {
    this.locator = page.locator('spcific-locator');
  }

  async open() {
    await this.page.goTo('/your-page-url');
  }

  async doSomething() {
    await this.locator.getByRole('button', { name: 'do something' }).click();
  }
}

```

### Portfolio object
#### ./src/pageobjects/index.ts

Central class that integrates all page objects, make sure that you add new pageobjects here:

```typescript
import { Page, BrowserContext } from '@playwright/test';
import {
  ContactMe, Footer, Header, MyProjects, SkillsCarousel, Summary,
} from './forms';

export default class Portfolio {
  public contactMe: ContactMe;
  public header: Header;
  public footer: Footer;
  public summary: Summary;
  public skillsCarousel: SkillsCarousel;
  public myProjects: MyProjects;


  constructor(private readonly page: Page, private readonly context: BrowserContext) {
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
  ...
}

```

## Fixtures

Please read [this](https://playwright.dev/docs/test-fixtures).

### How to add new fixure?

Add new fixures into ./test/index.ts in order to add it to your tests.


```typescript
import { mergeTests } from "@playwright/test";
import appFixure from "./app.fixture"
import yourFixure from "./your.fixture"

export default mergeTests(yourFixure, appFixure);
```

## Tests

Example of test:

```typescript
import { expect } from "@playwright/test";
import test from "../fixtures";

test("user can open cv", async ({ portfolio }) => {
  await expect(portfolio.page.getByText("Hello, I'm Dzmitry.")).toBeVisible();
});
```