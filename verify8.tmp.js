const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const shotDir = 'C:\\Users\\User\\AppData\\Local\\Temp\\claude\\c--Users-User-Desktop-Monarch-IT\\420f0666-a94c-43df-a846-39d354831850\\scratchpad';

  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));

  await page.goto('http://localhost:3000/compare', { waitUntil: 'networkidle' });
  await page.screenshot({ path: shotDir + '/k1-landing-icons.png' });

  const card = page.locator('main input[placeholder="Search Products"]');
  await card.nth(0).click();
  await card.nth(0).fill('OSCOO M200 Warrior 8GB');
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: /OSCOO M200 Warrior 8GB/ }).click();

  await card.nth(1).click();
  await card.nth(1).fill('Kingston');
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: /Kingston/ }).click();

  await page.getByRole('button', { name: 'View Comparison' }).click();
  await page.waitForSelector('text=Select items to compare side by side.');
  await page.waitForTimeout(400);

  // add a 3rd product to fully exercise icons + trigger a longer printed table
  const thirdInput = page.locator('main .hidden.md\\:block input[placeholder="Search Products"]').nth(2);
  await thirdInput.click();
  await thirdInput.fill('X1 Pro');
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: /X1 Pro/ }).click();
  await page.waitForTimeout(300);

  await page.screenshot({ path: shotDir + '/k2-table-icons.png' });

  console.log('Page errors:', pageErrors);

  const [printPage] = await Promise.all([
    ctx.waitForEvent('page'),
    page.locator('main .hidden.md\\:block button[title="Print comparison"]').first().click(),
  ]);
  await printPage.waitForLoadState('load');
  await printPage.waitForTimeout(300);
  await printPage.emulateMedia({ media: 'print' });
  const pdfPath = shotDir + '/k3-print-preview.pdf';
  await printPage.pdf({ path: pdfPath, format: 'A4' });
  console.log('PDF saved to', pdfPath);

  await browser.close();
})();
