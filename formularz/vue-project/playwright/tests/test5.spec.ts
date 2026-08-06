// OPIS NA SAMYM DOLE

import { test, expect } from '@playwright/test';


test.describe('Izolacja kontekstów przeglądarki', () => {
  test('dwa konteksty mają całkowicie niezależny localStorage', 
    { tag: '@context' },
    async ({ browser }) => {
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();

    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();

    await test.step('Logowanie jako piotr w kontekście A', async () => {
      await pageA.goto('/');
      await pageA.getByRole('textbox', { name: 'Login' }).fill('piotr');
      await pageA.getByRole('textbox', { name: 'Hasło' }).fill('2012');
      await pageA.getByRole('button', { name: 'Zaloguj' }).click();
      await expect(pageA).toHaveURL('/shop');
    });

    await test.step('Kontekst B nie widzi sesji zalogowanej w kontekście A', async () => {
      await pageB.goto('/');
      const loggedInB = await pageB.evaluate(() => localStorage.getItem('logged'));
      expect(loggedInB).toBeNull();
      await expect(pageB.getByRole('button', { name: 'Zaloguj' })).toBeVisible();
    });

    await test.step('Logowanie jako pawel w kontekście B', async () => {
      await pageB.getByRole('textbox', { name: 'Login' }).fill('pawel');
      await pageB.getByRole('textbox', { name: 'Hasło' }).fill('abc123');
      await pageB.getByRole('button', { name: 'Zaloguj' }).click();
      await expect(pageB).toHaveURL('/shop');
    });

    await test.step('Każdy kontekst przechowuje innego, własnego użytkownika', async () => {
      const usernameA = await pageA.evaluate(() => localStorage.getItem('username'));
      const usernameB = await pageB.evaluate(() => localStorage.getItem('username'));

      expect(usernameA).toBe('piotr');
      expect(usernameB).toBe('pawel');
    });

    await test.step('Wylogowanie w kontekście A nie wpływa na kontekst B', async () => {
      await pageA.getByRole('button', { name: 'Wyloguj się' }).click();
      await expect(pageA).toHaveURL('/');

      await pageB.reload();
      await expect(pageB).toHaveURL('/shop');

      const usernameBAfterA_logout = await pageB.evaluate(() => localStorage.getItem('username'));
      expect(usernameBAfterA_logout).toBe('pawel');
    });

    await contextA.close();
    await contextB.close();
  });
});


// OPIS : Kod stworzony podczas nauki używania Claude Code, do tego nauka 
// kontekstów - 'symulacja otworzenia dwóch różnych kart' 
// CO SIĘ DZIEJE : Sprawdzamy przez zalogowanie się w kontekście A, 
// że konteksty nie są połączone - A: zalogowane, B: niezalogowane
// Następnie logujemy się na B jako inny użytkownik, sprawdzamy różnice,
//  co pokazuje, że loginy są rzeczywiście różne, na końcu sprawdzamy, czy
// wylogowanie jednego konktestu wyloguje też drugi kontekst - drugi 
// kontekst wciąż był zalogowany