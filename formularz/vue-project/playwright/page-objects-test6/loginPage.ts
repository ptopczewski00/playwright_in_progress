import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.getByLabel('Login').fill(username);
    await this.page.getByLabel('Hasło').fill(password);
    await this.page.getByRole('button', { name: 'Zaloguj' }).click();
  }

  async assertErrorVisible(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}