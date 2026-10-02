import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuickTransactionPage extends BasePage {
  private readonly transactionTypeField = this.page.getByLabel('Transaction Type:');
  private readonly amountField = this.page.getByRole('spinbutton', { name: /Amount/ });
  private readonly destinationAccountField = this.page.getByRole('textbox', { name: /Transfer to Account/ });
  private readonly descriptionField = this.page.getByRole('textbox', { name: /Description/ });
  private readonly submitButton = this.page.getByRole('button', { name: 'Submit' });
  private readonly confirmationHeading = this.page.getByRole('heading', { name: /Transaction Confirmation/ });
  private readonly confirmButton = this.page.getByRole('button', { name: 'Confirm' });
  private readonly successHeading = this.page.getByRole('heading', { name: /Transaction Successful/ });

  constructor(page: Page) {
    super(page);
  }

  async selectTransferType(transactionType: string): Promise<void> {
    await this.selectOption(this.transactionTypeField, transactionType);
  }

  async fillTransferDetails(amount: string, destinationAccount: string, description: string): Promise<void> {
    await this.fill(this.amountField, amount);
    await this.fill(this.destinationAccountField, destinationAccount);
    await this.fill(this.descriptionField, description);
  }

  async submit(): Promise<void> {
    await this.click(this.submitButton);
    await this.expectVisible(this.confirmationHeading);
  }

  async confirm(): Promise<void> {
    await this.click(this.confirmButton);
    await this.expectVisible(this.successHeading);
  }

  async getTransactionReference(): Promise<string> {
    await this.expectVisible(this.page.getByText('Transaction Reference:', { exact: true }));
    const successText = await this.page.locator('body').innerText();
    const transactionReference = successText.match(/Transaction Reference:\s*(TXN-[A-Z0-9-]+)/)?.[1];

    if (!transactionReference) {
      throw new Error('Transaction reference was not displayed after confirmation.');
    }

    return transactionReference;
  }
}