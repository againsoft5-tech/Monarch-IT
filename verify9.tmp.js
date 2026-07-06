const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const shotDir = 'C:\\Users\\User\\AppData\\Local\\Temp\\claude\\c--Users-User-Desktop-Monarch-IT\\420f0666-a94c-43df-a846-39d354831850\\scratchpad';
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/compare', { waitUntil: 'networkidle' });
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

  const removeBtn = page.locator('main .hidden.md\\:block button[aria-label="Remove product"]').first();
  await removeBtn.screenshot({ path: shotDir + '/l1-cross-zoom.png' });

  const refreshBtn = page.locator('main .hidden.md\\:block button[title="Reset comparison"]').first();
  await refreshBtn.screenshot({ path: shotDir + '/l2-refresh-zoom.png' });

  const shareBtn = page.locator('main .hidden.md\\:block button[title="Share comparison"]').first();
  await shareBtn.screenshot({ path: shotDir + '/l3-share-zoom.png' });

  const printBtn = page.locator('main .hidden.md\\:block button[title="Print comparison"]').first();
  await printBtn.screenshot({ path: shotDir + '/l4-print-zoom.png' });

  await browser.close();
})();
