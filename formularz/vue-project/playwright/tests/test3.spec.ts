import { test, expect } from '@playwright/test';

test.describe('Testy III', () => {

  test.beforeEach(async ({ page }) => {
    // await page.goto('http://localhost:5173/');
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('TC-01 - Walidacja formularza',
    { tag: '@basic' },
    async ({ page }) => {
    await page.getByRole('button', { name: 'Zaloguj' }).click();

    const emptyErrorMsg = page.getByText('Wpisz dane przed zalogowaniem');
    await expect(emptyErrorMsg).toBeVisible();


    await page.getByLabel('Login').fill('nieznany_haker');
    await page.getByLabel('Hasło').fill('zle_haslo');
    
    await page.getByRole('button', { name: 'Zaloguj' }).click();
    
    const invalidErrorMsg = page.getByText('Dane logowania są niepoprawne');
    await expect(invalidErrorMsg).toBeVisible();
    await expect(invalidErrorMsg).toHaveCSS('color', 'rgb(239, 68, 68)');
    
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('TC-02 - Wybór produktu + koszyk',
    { tag: '@basic' },
    async ({ page }) => {
    await page.getByLabel('Login').fill('piotr');
    await page.getByLabel('Hasło').fill('2012');
    await page.getByRole('button', { name: 'Zaloguj' }).click();
    
    await expect(page).toHaveURL('http://localhost:5173/shop');

    page.once('dialog', dialog => {
      expect(dialog.message()).toBe('Świetny wybór!');
      dialog.accept();
    });

    await expect(page.getByRole('heading', { name: 'WYBIERZ COŚ DLA SIEBIE' })).toBeVisible();
    await expect(page.getByText('Buty')).toBeVisible();

    await page.getByRole('button', { name: 'Kup' }).nth(1).click();

    await expect(page).toHaveURL('http://localhost:5173/cart');
    await expect(page.getByRole('heading', { name: 'Twój Koszyk' })).toBeVisible();
    

    await expect(page.getByRole('heading', { name: 'Buty' })).toBeVisible();
    await expect(page.getByText('Do zapłaty: 350 zł')).toBeVisible();

    page.once('dialog', dialog => {
      expect(dialog.message()).toBe('Transakcja udana. Dziękujemy za zakupy!');
      dialog.accept();
    });

    await page.getByRole('button', { name: 'Zapłać' }).click();
    await expect(page).toHaveURL('http://localhost:5173/shop');


    const cartItemInStorage = await page.evaluate(() => localStorage.getItem('cartItem'));
    expect(cartItemInStorage).toBeNull();
  });
});