import { test, expect } from '../fixtures-test6/fixtures';
import { users, invalidCredentials } from '../data-test6/testData';

test.describe('TEST VI - symulacja zakupów z oddzielnymi danymi, fixtures, objects', () => {
  test('poprawne logowanie prowadzi do sklepu',
    { tag: '@important' }, 
    async ({ loginPage, shopPage }) => {
    await test.step('Logowanie poprawnymi danymi', async () => {
      await loginPage.login(users.piotr.username, users.piotr.password);
    });

    await test.step('Weryfikacja, że jesteśmy w sklepie', async () => {
      await shopPage.assertLoaded();
    });
  });

  test('złe dane logowania pokazują komunikat błędu', async ({ loginPage }) => {
    const bad = invalidCredentials();

    await test.step('Próba logowania nieprawidłowymi danymi', async () => {
      await loginPage.login(bad.username, bad.password);
    });

    await test.step('Weryfikacja komunikatu błędu', async () => {
      await loginPage.assertErrorVisible('Dane logowania są niepoprawne');
    });
  });

  test('wybór produktu i finalizacja zakupu czyści koszyk',
    { tag: '@important'},
    async ({ page, loginPage, shopPage, cartPage }) => {
    await test.step('Logowanie', async () => {
      await loginPage.login(users.piotr.username, users.piotr.password);
    });

    await test.step('Wybór produktu "Buty"', async () => {
      page.once('dialog', (dialog) => dialog.accept());
      await shopPage.buyProduct('Buty');
    });

    await test.step('Weryfikacja zawartości koszyka', async () => {
      await cartPage.assertProduct('Buty', 350);
    });

    await test.step('Finalizacja płatności', async () => {
      page.once('dialog', (dialog) => dialog.accept());
      await cartPage.pay();
    });

    await test.step('Koszyk jest pusty po zapłacie', async () => {
      await expect(page).toHaveURL('/shop');
      const stored = await page.evaluate(() => localStorage.getItem('cartItem'));
      expect(stored).toBeNull();
    });
  });
});