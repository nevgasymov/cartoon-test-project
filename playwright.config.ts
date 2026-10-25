import { defineConfig, devices } from "@playwright/test";

const PORT = 3210;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "e2e",
  forbidOnly: isCI,
  workers: 1,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 240_000,
  },
});
