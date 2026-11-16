const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();

    await page.setContent("<html><body></body></html>");

    await page.addScriptTag({
      url: process.env.THM_BADGE_URL
    });

    const badge = page.locator("iframe").first();
    await badge.waitFor({ timeout: 30000 });
    await page.waitForTimeout(5000);

    await badge.screenshot({
      path: "tryhackme.png"
    });
  } finally {
    await browser.close();
  }
})();
