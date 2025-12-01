import { test, expect, Page } from '@playwright/test';

test.describe('Alpha Mandi – core flows', () => {
  test('home page loads and shows brand', async ({ page }) => {
    await page.goto('/');

    // Assert that the brand heading is visible on the home page
    await expect(
      page.getByRole('heading', { name: /alpha\s+mandi/i })
    ).toBeVisible();
  });

  test('user can go to Menu, add item to cart, and see cart sidebar', async ({ page }) => {
    await page.goto('/');

    // Use the nav Menu button to jump to the menu section
    const navMenuButton = page.getByRole('button', { name: /^menu$/i });
    await navMenuButton.click();

    // Confirm we’re on the menu section
    await expect(
      page.getByRole('heading', { name: /culinary masterpieces/i })
    ).toBeVisible();

    // Add the first menu item to the cart
    const firstAddToOrder = page
      .getByRole('button', { name: /add to order/i })
      .first();
    await firstAddToOrder.click();

    // Cart sidebar should now be visible
    await expect(
      page.getByRole('heading', { name: /your selection/i })
    ).toBeVisible();

    // And we should see at least one price somewhere (pick first to avoid strict-mode issues)
    await expect(page.getByText(/\$\d/).first()).toBeVisible();
  });
});
// 🔁 Checkout happy-path (currently skipped – remove .skip when selectors are correct)
test.skip('logged-in user can complete a checkout flow', async ({ page }) => {
  await page.goto('/');

  // 1) Log the user in (opens Auth modal and sets user state)
  await login(page);

  // 2) Go to Menu from navigation
  await page
    .getByRole('navigation')
    .getByRole('button', { name: /^menu$/i })
    .click();

  // 3) Add first menu item to cart
  const firstAddToOrder = page
    .getByRole('button', { name: /add to order/i })
    .first();
  await firstAddToOrder.click();

  // 4) Open cart (we set aria-label="Open cart" on the icon button)
  await page.getByRole('button', { name: /open cart/i }).click();

  // 5) Verify cart sidebar is visible
  await expect(
    page.getByRole('heading', { name: /your selection/i })
  ).toBeVisible();

  // 6) Click Checkout
  const checkoutButton = page
    .getByRole('button', { name: /^checkout$/i })
    .first();
  await checkoutButton.click();

  // 7) We should now be on the Checkout screen
  await expect(
    page.getByRole('heading', { name: /delivery details/i })
  ).toBeVisible();

  // 8) Fill delivery address (Full Name is pre-filled/disabled)
  await page
    .getByLabel(/delivery address/i)
    .fill('123 Test Street, Stillwater, OK 74075');

  // 9) Confirm & Pay
  await page.getByRole('button', { name: /confirm & pay/i }).click();

  // 10) Wait for final confirmation screen
  await expect(
    page.getByRole('heading', { name: /order confirmed/i })
  ).toBeVisible();
});
// 🔁 Reservation happy-path (currently skipped)
test.skip('logged-in user can create a reservation', async ({ page }) => {
  await page.goto('/');

  // 1) Log in first (Reservations view in App.tsx requires user)
  await login(page);

  // 2) Open the "Reserve" tab from navbar
  await page
    .getByRole('navigation')
    .getByRole('button', { name: /reserve/i })
    .click();

  // 3) Assert that we are on the reservations page
  //    Adjust this heading text to match your actual Reservations.tsx
  const reservationsHeading = page.getByRole('heading', {
    name: /reservation|reserve a table|book a table/i,
  });
  await expect(reservationsHeading).toBeVisible();

  // 4) Fill the reservation form
  //    These labels are guesses – update them to match your component exactly.
  const dateInput = page.getByLabel(/date/i).first();
  const timeInput = page.getByLabel(/time/i).first();
  const guestsInput = page.getByLabel(/guest/i).first();
  const nameInput = page.getByLabel(/name/i).first();
  const emailInput = page.getByLabel(/email/i).first();

  await dateInput.fill('2025-12-31');
  await timeInput.fill('19:30'); // 7:30 PM
  await guestsInput.fill('4');
  await nameInput.fill('Playwright User');
  await emailInput.fill('reservation+test@alphamandi.com');

  // 5) Submit reservation
  const submitButton = page.getByRole('button', {
    name: /reserve|confirm reservation|book/i,
  });
  await submitButton.click();

  // 6) Verify confirmation message (tweak regex to your actual message)
  await expect(
    page.getByText(/reservation confirmed|see you soon|booking successful/i)
  ).toBeVisible();
});
function login(page: Page) {
    throw new Error('Function not implemented.');
}

