import { test, expect } from '../fixtures/testFixtures';
import { invalidUser } from '../test-data/users';

test.describe('ParaBank customer login', () => {
  test('login form is displayed @smoke', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoginFormVisible();
  });

  test('invalid credentials display an error @regression', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(invalidUser.username, invalidUser.password);

    await expect(loginPage.errorPanel).toContainText('Error!');
    await expect(loginPage.errorPanel).toContainText(
      'The username and password could not be verified.',
    );
  });

  test('empty credentials display an error @regression', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.submitEmptyForm();

    await expect(loginPage.errorPanel).toContainText('Error!');
    await expect(loginPage.errorPanel).toContainText(
      'Please enter a username and password.',
    );
  });

  test('registered customer can sign in @smoke', async ({ loginPage, accountsPage }) => {
    const username = process.env.PARABANK_USERNAME;
    const password = process.env.PARABANK_PASSWORD;
    test.skip(!username || !password, 'Set PARABANK_USERNAME and PARABANK_PASSWORD in .env');

    await loginPage.open();
    await loginPage.login(username!, password!);
    await accountsPage.expectAccountsOverviewVisible();
  });
});
