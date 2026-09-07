import { chromium } from "playwright";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const assetsDir = join(__dirname, "../src/assets");

async function capture(page, url, outputPath, setup) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  if (setup) await setup(page);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`Saved ${outputPath}`);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  try {
    await capture(
      page,
      "https://nadiaturko.github.io/booktrack/",
      join(assetsDir, "project-booktrack.png"),
      async (activePage) => {
        const demoButton = activePage.getByRole("button", { name: /demo user/i });
        if (await demoButton.isVisible()) {
          await demoButton.click();
          await activePage.waitForTimeout(2000);
        }
      }
    );

    await capture(
      page,
      "https://ronevich.com.ua/",
      join(assetsDir, "project-dental.png"),
      async (activePage) => {
        const popupClose = activePage.locator(".popup, .modal, [class*='popup'], [class*='modal']").first();
        if (await popupClose.count()) {
          const closeBtn = activePage.locator("button, .close, [aria-label='Close']").first();
          if (await closeBtn.isVisible()) await closeBtn.click();
        }
        await activePage.evaluate(() => window.scrollTo(0, 0));
      }
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
