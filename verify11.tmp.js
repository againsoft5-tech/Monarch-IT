const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const shotDir = 'C:\\Users\\User\\AppData\\Local\\Temp\\claude\\c--Users-User-Desktop-Monarch-IT\\420f0666-a94c-43df-a846-39d354831850\\scratchpad';
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/images/compare-icons/cross-icon.svg');
  await page.waitForTimeout(300);
  await page.screenshot({ path: shotDir + '/m2-direct-svg-nav.png' });
  await browser.close();
})();
