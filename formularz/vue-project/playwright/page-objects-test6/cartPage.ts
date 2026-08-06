import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async assertProduct(name: string, price: number) {
    await expect(this.page).toHaveURL('/cart');
    await expect(this.page.getByRole('heading', { name })).toBeVisible();
    await expect(this.page.getByText(`Do zapłaty: ${price} zł`)).toBeVisible();
  }

  async pay() {
    await this.page.getByRole('button', { name: 'Zapłać' }).click();
  }
}