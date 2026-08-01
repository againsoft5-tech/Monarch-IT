const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1250, height: 300 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'C:/Users/User/Downloads/Monarch-IT/_header.png', fullPage: false });
  await browser.close();
})();
