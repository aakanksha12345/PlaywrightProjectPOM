import { Page, Locator } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly transferLinkLocator: Locator;
  readonly amountInputLocator:Locator;
  readonly fromAccountSelectLocator:Locator;
  readonly toAccountSelectLocator: Locator;
  readonly transferButtonLocator: Locator;
  readonly transferCompleteMessageLocator:Locator;
    constructor(page: Page) {
    this.page = page;
    this.transferLinkLocator=page.getByText('Transfer Funds',{exact:true});
    this.amountInputLocator=page.locator('//input[@id="amount"]');
    this.fromAccountSelectLocator = page.locator('//select[@id="fromAccountId"]');
    this.toAccountSelectLocator=page.locator('//select[@id="toAccountId"]');
    this.transferButtonLocator = page.getByRole('button', {
      name: 'Transfer'
    });
    this.transferCompleteMessageLocator=page.locator('//h1[text()="Transfer Complete!"]');
    }
  async navigateToTransferFunds() {
    await this.transferLinkLocator.click();
    await this.amountInputLocator.waitFor({ state: 'visible' });
  }
  
async getAvailableAccounts(): Promise<string[]> {
  return this.fromAccountSelectLocator.locator('option').evaluateAll(
    options => options.map(option => (option as HTMLOptionElement).value)
  );

}
async transferFunds(
    amount: string,
    fromAccount: string,
    toAccount: string
  ) {
    await this.amountInputLocator.fill(amount);

    await this.fromAccountSelectLocator.selectOption(fromAccount);

    await this.toAccountSelectLocator.selectOption(toAccount);

    await this.transferButtonLocator.click();
  }




}
