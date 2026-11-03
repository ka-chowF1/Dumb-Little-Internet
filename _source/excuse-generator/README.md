# Excuse Generator

Four situations, 60 absurd explanations. A static website with no runtime AI or backend.

## Preview

Run `npm start` and open http://localhost:8069, or open `dist/index.html` directly. No package installation needed.

## Edit content

Add excuses or categories in `dist/excuses.js`. The dropdown is populated automatically. Changing categories does not generate an excuse; pressing Generate does. Immediate repeats are avoided per category, including after switching away and back. Single-excuse categories remain supported.

## Test and publish

Run `npm test`. The GitHub Pages workflow runs tests, then publishes `dist/` on pushes to main. Select GitHub Actions in repository Settings → Pages for the first deployment.
