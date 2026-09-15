# Dumb Little Internet

A small, static directory of funny websites.

## Add a website

Edit `dist/projects.js`. Add an object with `name`, `emoji`, `url`, and optional `tagline` and `isNew`. Nothing else needs changing. Use a full HTTPS URL. Cards open in a new tab.

## Preview and test

Run `npm start` and visit http://localhost:8068. You can also open `dist/index.html` directly in a browser. Run `npm test` to check rendering and project data. No dependency installation is required.

## Publish

Upload this project to its own GitHub repository on `main`, then select GitHub Actions under Settings → Pages. The deployment workflow tests the dashboard and publishes `dist/`. Future changes on main deploy automatically.
