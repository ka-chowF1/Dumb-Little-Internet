# 67 Calculator

A frontend-only joke calculator: actual answers of **67** display **Error**; all other answers display **67**. Expressions use standard multiplication/division precedence and exact decimal comparisons.

## Run locally

Run `npm start`, then visit http://localhost:8067. Python 3 is required for the local static server. No dependency installation is needed.

## Test

Run `npm test` with Node.js 18 or newer.

## Controls

Use the on-screen keys or type numbers and arithmetic operators. Enter or `=` displays Error if the equation equals 67, otherwise 67. Typing after Error starts a fresh calculation. Escape clears everything, Delete clears the current entry, and Backspace deletes the last digit (or removes a pending operator). Percentage divides the current entry by 100. The sign key toggles the current entry's sign. Repeated operators replace the pending operator. Entries are limited to 20 characters; long expressions scroll horizontally.

## Files

- `dist/index.html`: interface and page metadata
- `dist/styles.css`: responsive design
- `dist/engine.js`: calculator input state
- `dist/script.js`: buttons, keyboard, display, optional WebMCP integration
- `tests/calculator.test.js`: behavior tests

## GitHub Pages deployment

Hosting choice: GitHub Pages. The workflow in `.github/workflows/deploy.yml` tests and checks the site, then publishes only `dist/` when `main` changes or the workflow is run manually.

1. Create/select the GitHub repository and push this project to `main`.
2. In repository Settings → Pages, set Source to **GitHub Actions**.
3. Run **Deploy calculator to GitHub Pages** from Actions if necessary.
4. Wait for the deployment to succeed and use its reported URL.
5. Verify the live page, calculator examples, mobile layout, and HTTPS.

No dependencies or custom domain are required. Assets use relative URLs so the site works under a repository subpath. Browser ES modules require HTTP/HTTPS; directly opening `index.html` via `file://` is not a supported preview. This is a browser loading restriction, not a backend dependency.

## Current status

Deployment files are prepared and local checks pass. GitHub connection/repository selection and source publication remain pending. The system Git executable currently fails because macOS Command Line Tools are missing. The earlier Sites registration is retained locally in `.openai/hosting.json` and excluded from the GitHub repository; it is not the selected deployment target.
