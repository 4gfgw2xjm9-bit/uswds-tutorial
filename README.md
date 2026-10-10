# USWDS Tutorial

A tutorial project to learn about installing, compiling, and customizing with USWDS.

## Requirements

- Node v20
- Git
- Access to a terminal application
- A text editor
- A modern web browser

## Installation

1. Clone the tutorial repo, either in the terminal or with GitHub's `Use this template` button near the top of the page. **We recommend using the terminal and the command line.** If you choose to clone using the terminal, open a terminal window, navigate to the directory where you'd like to put the `uswds-tutorial` directory and run:

    ```bash
    git clone https://github.com/uswds/uswds-tutorial.git
    ```

    This will create a `uswds-tutorial` directory with the tutorial files inside. Navigate to this new directory:

    ```bash
    cd uswds-tutorial
    ```

1. Install the project dependencies:

    ```bash
    npm install
    ```

1. Start the tutorial server:

    ```bash
    npm start
    ```

1. Once the server is running, head to [http://localhost:8080/](http://localhost:8080/) and follow the directions on the page!

## Development checks

Run the build and browser checks before saving a checkpoint or opening a pull request:

```bash
npm run verify
```

This compiles USWDS Sass, builds the Eleventy site, and runs the Playwright checks for the extending tutorial's desktop and narrow-screen layouts, keyboard scrolling, horizontal overflow, and automated accessibility.
The compile task also checks that Sass produced a fresh CSS file, so a Sass error cannot pass as a successful build.

Install Playwright's Chromium browser once per machine:

```bash
npm run test:e2e:install
```

On Linux, if Chromium reports missing system libraries, install its operating-system dependencies with:

```bash
npx playwright install --with-deps chromium
```

The browser checks complement, but do not replace, manual accessibility review. For the `/extend.html` page, also:

- Navigate using only the keyboard; confirm focus stays visible and the live preview scrolls when focused.
- Check at 400% browser zoom and a 320 CSS-pixel viewport; confirm there is no loss of content or functionality.
- Test with a screen reader and browser combination, such as VoiceOver with Safari or NVDA with Firefox.

### Read-only USWDS references

When sibling checkouts are available, use `../uswds` for USWDS source and `../uswds-site` for Design System documentation source as read-only references. Do not make tutorial changes in those repositories. To record exactly which reference versions informed a review, run:

```bash
git -C ../uswds rev-parse HEAD
git -C ../uswds-site rev-parse HEAD
```

Include those commit IDs in the review notes or pull request when relevant. The checkouts do not update automatically; fetch updates deliberately and continue to leave the reference worktrees unchanged.
