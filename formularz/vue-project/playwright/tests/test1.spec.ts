// w drugim oknie musi byc local host odpalony

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // await page.goto('http://localhost:5173/');
  await page.goto('/');
  
  await page.getByRole('textbox', { name: 'Login' }).fill('piotr');
  await page.getByRole('textbox', { name: 'Hasło' }).fill('2012');
  await page.getByRole('button', { name: 'Zaloguj' }).click();

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.getByRole('button', { name: 'Kup' }).first().click();
  await page.getByRole('img', { name: 'Plecak' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Zapłać' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Kup' }).nth(1).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Zapłać' }).click();
  await page.getByRole('button', { name: 'Wyloguj się' }).click();
});
