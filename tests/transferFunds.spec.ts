
import { test, expect } from '../fixtures/testFixtures';
import { TransferFundsPage } from '../pages/TransferFundsPage';

test('Verify Transfer Funds page opens successfully', async ({ page, loginPage }) => {

  const username = process.env.PARABANK_USERNAME;
  const password = process.env.PARABANK_PASSWORD;

  test.skip(!username || !password, 'Login credentials required');

  // Step 1: Login
  await loginPage.open();
  await loginPage.login(username!, password!);

  // Step 2: Create Transfer Funds page object
  const transferPage = new TransferFundsPage(page);

  // Step 3: Navigate to Transfer Funds
  await transferPage.navigateToTransferFunds();

  // Step 4: Verify transfer form
  await expect(transferPage.amountInputLocator).toBeVisible();
  
  // Wait until the From Account dropdown has an option
  await expect(
    transferPage.fromAccountSelectLocator.locator('option').first()
  ).toBeAttached({ timeout: 15000 });

  // Wait until the To Account dropdown has an option
  await expect(
    transferPage.toAccountSelectLocator.locator('option').first()
  ).toBeAttached({ timeout: 15000 });


  // Step 5: Get available account numbers
  const fromAccounts = await transferPage.fromAccountSelectLocator
    .locator('option')
    .allTextContents();

  const toAccounts = await transferPage.toAccountSelectLocator
    .locator('option')
    .allTextContents();

  // Step 6: Print available accounts
  console.log('From Accounts:', fromAccounts);
  console.log('To Accounts:', toAccounts);

});

test('Verify successful fund transfer', async ({ page, loginPage }) => {

  const username = process.env.PARABANK_USERNAME;
  const password = process.env.PARABANK_PASSWORD;

  test.skip(!username || !password, 'Login credentials required');

  // Step 1: Login
  await loginPage.open();
  await loginPage.login(username!, password!);

  // Step 2: Create Page Object
  const transferPage = new TransferFundsPage(page);

  // Step 3: Navigate to Transfer Funds
  await transferPage.navigateToTransferFunds();

  // Step 4: Wait for two accounts to load
  await expect(
    transferPage.fromAccountSelectLocator.locator('option').nth(1)
  ).toBeAttached({ timeout: 15000 });

  // Step 5: Get account numbers
  const accounts = await transferPage.getAvailableAccounts();

  const fromAccount = accounts[0];
  const toAccount = accounts[1];

  // Verify two different accounts are selected
  expect(fromAccount).not.toBe(toAccount);

  // Step 6: Transfer $1
  await transferPage.transferFunds(
    '1.00',
    fromAccount,
    toAccount
  );

  // Step 7: Verify confirmation
  await expect(
    transferPage.transferCompleteMessageLocator
  ).toBeVisible();

});