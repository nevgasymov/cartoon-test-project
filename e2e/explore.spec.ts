import { expect, test } from "@playwright/test";

test("search, filter and open a character", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Name").fill("rick");
  await expect(page).toHaveURL(/\/\?name=rick$/);

  await page.getByLabel("Status").selectOption("dead");
  await expect(page).toHaveURL(/\/\?name=rick&status=dead$/);

  const firstCard = page
    .getByRole("list", { name: "Characters" })
    .getByRole("listitem")
    .first();
  await expect(firstCard).toContainText(/rick/i);
  await expect(firstCard).toContainText(/dead/i);

  const link = firstCard.getByRole("link");
  const name = await link.innerText();
  await link.click();

  await expect(page).toHaveURL(/\/characters\/\d+$/);
  await expect(
    page.getByRole("main").getByRole("heading", { level: 1 }),
  ).toHaveText(name);
});

test("Back undoes a picked filter", async ({ page }) => {
  await page.goto("/?name=morty");
  await page.getByLabel("Status").selectOption("alive");
  await expect(page).toHaveURL(/status=alive/);

  await page.goBack();

  await expect(page).toHaveURL(/\/\?name=morty$/);
  await expect(page.getByLabel("Status")).toHaveValue("");
  await expect(page.getByLabel("Name")).toHaveValue("morty");
});

test("pages through the results with links", async ({ page }) => {
  await page.goto("/");
  const pagination = page.getByRole("navigation", { name: "Pagination" });

  await pagination.getByRole("link", { name: "Next" }).click();

  await expect(page).toHaveURL(/\/\?page=2$/);
  await expect(pagination).toContainText(/Page 2 of \d+/);
});

test("shows not-found for an unknown character", async ({ page }) => {
  await page.goto("/characters/99999");

  await expect(
    page.getByRole("heading", { name: "Character not found" }),
  ).toBeVisible();
});
