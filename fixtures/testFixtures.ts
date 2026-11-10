import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountsPage } from '../pages/AccountsPage';
import { RegistrationPage } from '../pages/RegistrationPage';

/** Typed custom fixtures inject ready-to-use page objects into tests. */
type AppFixtures = {
  loginPage: LoginPage;
  accountsPage: AccountsPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountsPage: async ({ page }, use) => {
    await use(new AccountsPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { expect } from '@playwright/test';
