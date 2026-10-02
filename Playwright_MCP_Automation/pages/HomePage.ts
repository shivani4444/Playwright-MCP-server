import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly header = this.page.getByRole('heading', { name: '🏦 Sample Banking Application' });
  private readonly welcomeMessage = this.page.getByText('Welcome to the Testers Talk Banking Application', { exact: true });
  private readonly loadingOverlay = this.page.locator('#loadingOverlay');
  private readonly transfersTab = this.page.getByRole('button', { name: 'Transfers', exact: true });
  private readonly billPaymentsTab = this.page.getByRole('button', { name: 'Bill Payments', exact: true });
  private readonly quickTransactionsLink = this.page.getByRole('link', { name: /Quick Transactions/ });
  private readonly quickTransactionsHeading = this.page.getByRole('heading', { name: /Quick Transactions/ });

  constructor(page: Page) {
    super(page);
  }

  async expectBankingApplication(): Promise<void> {
    await expect(this.page).toHaveURL(/Banking-Project-Demo\.html/, { timeout: 15_000 });
    await this.expectVisible(this.header);
    await this.expectVisible(this.welcomeMessage);
    await expect(this.loadingOverlay).toBeHidden({ timeout: 15_000 });
  }

  async openQuickTransactions(): Promise<void> {
    await this.click(this.quickTransactionsLink);
    await this.expectVisible(this.quickTransactionsHeading);
  }

  async expectHomeTabs(): Promise<void> {
    await this.expectVisible(this.transfersTab);
    await this.expectVisible(this.billPaymentsTab);
  }
}