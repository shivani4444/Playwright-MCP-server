import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameField = this.page.getByRole('textbox', { name: 'Username' });
  private readonly passwordField = this.page.getByRole('textbox', { name: 'Password' });
  private readonly appNameField = this.page.getByLabel('App Name:');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  constructor(page: Page) {
    super(page);
  }

  async open(url: string): Promise<void> {
    await this.navigate(url);
    await this.expectVisible(this.usernameField);
  }

  async login(username: string, password: string, appName: string): Promise<void> {
    await this.fill(this.usernameField, username);
    await this.fill(this.passwordField, password);
    await this.selectOption(this.appNameField, appName);

    await Promise.all([
      this.page.waitForURL(/Banking-Project-Demo\.html/, { waitUntil: 'commit', timeout: 15_000 }),
      this.click(this.loginButton),
    ]);
  }
}