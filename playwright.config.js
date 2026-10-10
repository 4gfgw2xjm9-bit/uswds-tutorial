const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:8189",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "npx @11ty/eleventy --serve --port=8189",
    url: "http://127.0.0.1:8189",
    reuseExistingServer: false,
  },
});
