import { test, expect } from '@playwright/test'

const dataCases = [
    { username: 'piotr', password: '2012', expectedToPass: true },
    { username: 'pawel', password: 'abc123', expectedToPass: true },
    { username: 'kamil', password: '2@26', expectedToPass: true },
    { username: 'piotr', password: 'zle_haslo', expectedToPass: false },
    { username: 'nieznany', password: '123', expectedToPass: false }
];

dataCases.forEach((data) => {
    test(`Kolej: ${data.username} (Oczekiwany: ${data.expectedToPass})`, async ({ page }) => {
        // await page.goto('http://localhost:5173/');
        await page.goto('/');
        await page.fill('#username', data.username);
        await page.fill('#password', data.password);
        await page.click('button[type="submit"]');

        if (data.expectedToPass) {
            await expect(page).toHaveURL('http://localhost:5173/shop');

            const shopHeader = page.getByRole('heading', { name: 'WYBIERZ COŚ DLA SIEBIE' });
            await expect(shopHeader).toBeVisible();

            const logoutBtn = page.getByRole('button', { name: 'Wyloguj się' });
            await expect(logoutBtn).toBeVisible()
        } else {
            await expect(page).toHaveURL('http://localhost:5173/');

            const errorMessage = page.getByText('Dane logowania są niepoprawne');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveCSS('color', 'rgb(239, 68, 68)');
        }
    })
})