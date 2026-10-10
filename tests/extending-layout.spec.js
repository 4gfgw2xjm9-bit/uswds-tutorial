const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Extending tutorial responsive layout", () => {
  test("opens the extending tutorial at the site root and keeps the original tutorial available", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/extend\.html$/);

    await page.goto("/index.html");
    await expect(
      page.getByRole("heading", { name: "Learn how to use USWDS" }),
    ).toBeVisible();
  });

  test("keeps a sticky, keyboard-scrollable preview on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 400 });
    await page.goto("/extend.html");

    const preview = page.getByRole("region", {
      name: "Live component preview",
    });
    const lessons = page.locator(".extend-lessons");

    await expect(preview).toHaveCSS("position", "sticky");
    await expect(preview).toHaveCSS("overflow-y", "auto");
    expect(
      await preview.evaluate((element) => {
        const previewRect = element.getBoundingClientRect();
        const lessonsRect = document
          .querySelector(".extend-lessons")
          .getBoundingClientRect();

        return {
          rightColumn: previewRect.left > lessonsRect.left,
          fitsViewport: previewRect.right <= window.innerWidth,
          boundedByViewport: previewRect.height <= window.innerHeight,
        };
      }),
    ).toEqual({
      rightColumn: true,
      fitsViewport: true,
      boundedByViewport: true,
    });
    await expect(lessons).toBeVisible();
    await preview.evaluate((element) => {
      const content = document.createElement("div");
      content.setAttribute("aria-hidden", "true");
      content.style.height = "1000px";
      element.append(content);
    });
    await preview.focus();
    await page.keyboard.press("PageDown");
    await expect
      .poll(() => preview.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
  });

  for (const width of [768, 390, 320]) {
    test(`stacks preview before lessons without horizontal page overflow at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/extend.html");

      const preview = page.getByRole("region", {
        name: "Live component preview",
      });
      const previewBox = await preview.boundingBox();
      const lessonsBox = await page.locator(".extend-lessons").boundingBox();

      await expect(preview).toHaveCSS("position", "static");
      expect(previewBox.y).toBeLessThan(lessonsBox.y);
      const documentWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(documentWidth).toBeLessThanOrEqual(width);
    });
  }

  for (const width of [1280, 390, 320]) {
    test(`has no automated WCAG 2.2 A/AA violations at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/extend.html");

      const results = await new AxeBuilder({ page })
        .withTags([
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22a",
          "wcag22aa",
        ])
        .analyze();

      const violations = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary
            ?.split("\n")
            .find((line) => line.includes("Element has")),
        })),
      }));

      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    });
  }
});
