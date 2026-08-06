// NA SAMYM DOLE OPIS

import { test, expect, Page } from '@playwright/test';

async function loginBase(page: Page) {
  await page.getByRole('textbox', { name: 'Login' }).fill('piotr');
  await page.getByRole('textbox', { name: 'Hasło' }).fill('2012');
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page).toHaveURL('/shop');
}

test.describe(
    'Pasek "Wyloguj się" - interakcja z divem', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => localStorage.clear());
    });

    test('TC-01a - Naciśnięcie diva przez xpath (rodzic przycisku) NIE wylogowuje', async ({ page }) => {
      await test.step('Logowanie', async () => {
        await loginBase(page);
      });
      await test.step('Naciśnięcie diva-rodzica przycisku (xpath="..")', async () => {
        await page.getByRole('button', { name: 'Wyloguj się' }).locator('xpath=..').click();
      });
      await test.step('Weryfikacja, że pozostajemy w sklepie (brak wylogowania)', async () => {
        await expect(page).toHaveURL('/shop');
      });
    });

    test('TC-01b - Naciśnięcie diva przez filter().last() NIE wylogowuje', async ({ page }) => {
      await test.step('Logowanie', async () => {
        await loginBase(page);
      });
      await test.step('Klik w div dopasowany przez filter({hasText}).last()', async () => {
        await page.locator('div').filter({ hasText: 'Wyloguj się' }).last().click();
      });
      await test.step('Weryfikacja, że pozostajemy w sklepie (brak wylogowania)', async () => {
        await expect(page).toHaveURL('/shop');
      });
    });

    test('TC-01c - Naciśnięcie diva przez klasę .top-bar NIE wylogowuje', async ({ page }) => {
      await test.step('Logowanie', async () => {
        await loginBase(page);
      });
      await test.step('Naciśnięcie div.top-bar', async () => {
        await page.locator('div.top-bar').click();
      });
      await test.step('Weryfikacja, że pozostajemy w sklepie (brak wylogowania)', async () => {
        await expect(page).toHaveURL('/shop');
      });
    });
  },
);

//   CEL : Ten test miał sprawdzić, czy po naciśnięciu diva, w którym znajduję się 
//   przycisk 'wyloguj się' wyloguje nas ze strony (chodzi o cały pasek, a nie o sam przycisk) - 
//   SKĄD POMYSŁ : Pomysł na ten test pojawił mi się po tym, jak używając codegen'a mogłem wylogować naciskając
//   obszar poza widocznym czerwonym przyciskiem do wylogowania
//   TEST MANUALNY : Przy sprawdzeniu tego ręcznie nie było tego problemu, obszar wokół przycisku nie był
//   interaktywny, dopiero naciśnięcie czerwonego przycisku wylogowało mnię
//   OCZEKIWANY WYNIK : Url strony pozostanie w sklepie, a nie wyloguje nas na stronę logowania
//   WYNIK TESTU : Na szczęście na każdy z 3 (z czego 2 zakomentowane) wyżej sposoób
//   wynik był pozytywny

//   UPDATE: Czytając kod 'ShopPage.vue' znalazłem błąd w CSS polegający
//   na tym, że źle nazwałem klasę, teraz nie ma błędu, nawet przy użyciu codegen