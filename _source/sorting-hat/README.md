# The Sorting Hat

Static, original illustrated quiz. Open `dist/index.html` directly or run `npm start` for http://localhost:8075. Run `npm test` for behavior checks.

Five yes/no questions lead to a three-second thinking animation. No to question one always produces Muggle detected; otherwise each house has a 25% chance. Answers stay in memory only. No dependencies or external assets.

## Publishing
Create a public repository, upload this folder’s contents (including .github/workflows/deploy.yml), and enable Settings → Pages → GitHub Actions. The workflow publishes dist. Repository URL is still needed; no live deployment is claimed.

After the live URL is verified, add the prepared entry in dashboard-entry.json to Dashboard/dist/projects.js and redeploy the dashboard. It is deliberately not linked before the site exists.
