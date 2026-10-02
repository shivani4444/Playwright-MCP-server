import { expect, type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  protected async selectOption(locator: Locator, label: string): Promise<void> {
    await locator.selectOption({ label });
  }

  protected async expectVisible(locator: Locator, timeout = 15_000): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }
}