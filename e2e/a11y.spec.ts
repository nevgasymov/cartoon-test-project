import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const BLOCKING = new Set(["serious", "critical"]);

async function blockingViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  return violations
    .filter((v) => BLOCKING.has(v.impact ?? ""))
    .map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.map((n) => n.target.join(" ")),
    }));
}

const pages = [
  { name: "character list", url: "/" },
  { name: "empty result", url: "/?name=zzzz" },
  { name: "character detail", url: "/characters/1" },
];

for (const { name, url } of pages) {
  test(`${name} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(url);
    await expect(page.getByText(/^Loading/)).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();

    expect(await blockingViolations(page)).toEqual([]);
  });
}
