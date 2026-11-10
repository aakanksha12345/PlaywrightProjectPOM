import type { Page } from '@playwright/test';

/** Shared browser/page functionality for all page objects. */
export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected async navigate(relativeUrl: string): Promise<void> {
    // Relative paths keep the /parabank/ application context from baseURL.
    await this.page.goto(relativeUrl);
  }
}
