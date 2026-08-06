// PLIK WYGENEROWANY PRZEZ CLAUDE, STWORZONY JAKO CIEKAWOSTKA DO ANALIZY

import { test, expect } from '@playwright/test';


test.describe('Koszyk - odporność na uszkodzone dane w localStorage', () => {
  test('zepsuty JSON w cartItem - UI pokazuje pusty koszyk, ale rzuca niezłapany wyjątek (known issue)', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await test.step('Ustawienie nieprawidłowego JSON w localStorage', async () => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('cartItem', '{to nie jest poprawny json');
      });
    });

    await test.step('Wejście na /cart', async () => {
      await page.goto('/cart');
    });

    await test.step('UI degraduje się bezpiecznie do widoku pustego koszyka', async () => {
      await expect(page.getByRole('heading', { name: 'Twój Koszyk' })).toBeVisible();
      await expect(page.getByText('Twój koszyk jest pusty.')).toBeVisible();
    });

    await test.step('KNOWN ISSUE: JSON.parse rzuca niezłapany wyjątek w onMounted', async () => {
      expect(pageErrors.length).toBeGreaterThan(0);
      expect(pageErrors[0]).toContain('JSON');
    });
  });

  test('cartItem bez pola price - UI pokazuje pustą cenę bez żadnego ostrzeżenia (known issue)', async ({ page }) => {
    await test.step('Ustawienie produktu bez pola price', async () => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('cartItem', JSON.stringify({ name: 'Tajemniczy produkt' }));
      });
    });

    await test.step('Wejście na /cart', async () => {
      await page.goto('/cart');
    });

    await test.step('Nazwa produktu renderuje się poprawnie', async () => {
      await expect(page.getByRole('heading', { name: 'Tajemniczy produkt' })).toBeVisible();
    });

    await test.step('KNOWN ISSUE: brak walidacji ceny - renderuje się pusta wartość', async () => {
      await expect(page.getByText('Do zapłaty:')).toBeVisible();
      await expect(page.getByText('Do zapłaty: zł')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Zapłać' })).toBeEnabled();
    });
  });
});