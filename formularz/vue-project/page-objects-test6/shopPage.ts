import { Page, expect } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async assertLoaded() {
    await expect(this.page).toHaveURL('/shop');
    await expect(this.page.getByRole('heading', { name: 'WYBIERZ COŚ DLA SIEBIE' })).toBeVisible();
  }

  async buyProduct(productName: string) {
    const productCard = this.page.locator('.product-card').filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Kup' }).click();
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Wyloguj się' }).click();
  }
}