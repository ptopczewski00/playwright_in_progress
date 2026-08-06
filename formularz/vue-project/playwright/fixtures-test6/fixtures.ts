import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects-test6/loginPage';
import { ShopPage } from '../page-objects-test6/shopPage';
import { CartPage } from '../page-objects-test6/cartPage';


type Fixtures = {
  loginPage: LoginPage;
  shopPage: ShopPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await use(new LoginPage(page));
  },

  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';