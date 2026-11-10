import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Login page: locators and actions. Tests own their business assertions. */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorPanel: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#loginPanel input[name="username"]');
    this.passwordInput = page.locator('#loginPanel input[name="password"]');
    this.signInButton = page.getByRole('button', { name: 'Log In' });
    this.errorPanel = page.locator('#rightPanel');
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  async open(): Promise<void> {
    await this.navigate('index.htm');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.signInButton.click();
  }

  async openRegistration(): Promise<void> {
    await this.registerLink.click();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }
}
