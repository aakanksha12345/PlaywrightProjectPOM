import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Only read-only registration navigation is covered in this starter. */
export class RegistrationPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly usernameInput: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[id="customer.firstName"]');
    this.usernameInput = page.locator('input[id="customer.username"]');
  }

  async expectRegistrationFormVisible(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
  }
}
