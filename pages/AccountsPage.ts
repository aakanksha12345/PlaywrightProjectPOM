import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Accounts area shown after a successful login. */
export class AccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectAccountsOverviewVisible(): Promise<void> {
    await expect(
      this.page.getByRole('link', { name: 'Accounts Overview' }),
    ).toBeVisible();
  }
}
