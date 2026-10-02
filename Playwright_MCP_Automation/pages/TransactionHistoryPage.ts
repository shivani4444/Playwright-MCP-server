import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
  private readonly viewHistoryButton = this.page.getByRole('button', { name: 'View History' });
  private readonly historyHeading = this.page.getByRole('heading', { name: /Transaction History/ });

  constructor(page: Page) {
    super(page);
  }

  async openFromTransactionConfirmation(): Promise<void> {
    await this.click(this.viewHistoryButton);
    await this.expectVisible(this.historyHeading);
  }

  async expectTransactionReference(reference: string): Promise<void> {
    await this.expectVisible(this.page.getByText(`Ref: ${reference}`, { exact: true }));
  }
}