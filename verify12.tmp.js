const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const shotDir = 'C:\\Users\\User\\AppData\\Local\\Temp\\claude\\c--Users-User-Desktop-Monarch-IT\\420f0666-a94c-43df-a846-39d354831850\\scratchpad';
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });
  await page.goto('file:///' + shotDir.replace(/\\/g, '/') + '/k3-print-preview.pdf');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: shotDir + '/n1-pdf-view.png', fullPage: true });
  await browser.close();
})();
