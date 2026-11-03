# The Dumb Little Internet

A small collection of silly browser games, with a dashboard that links to them. Plain HTML, CSS and JavaScript. No build step, nothing to install.

## What's here

```
dist/                       the published site (served by GitHub Pages)
  index.html                the dashboard (home page)
  assets/                   styles, scripts, fonts and images shared by the site
  67-calculator/            each game is its own folder, e.g. /67-calculator/
  excuse-generator/
  rock-paper-scissors/
  wordle-for-dummies/
  fortune-cookie/
  iq-test/
  horoscope/
  sorting-hat/
  to-do-tabloid/
  dog-time-converter/
  laundry-label-decoder/
_source/<game>/             each game's README, package.json and tests (not published)
tests/site.test.cjs         checks that every page exists and every link resolves
```

All links are relative, so the site works from any address and from a folder on your computer.

## Preview it

Open `dist/index.html` in a browser. Most pages work straight from the file. Wordle and the 67 Calculator need a local server because browsers block their scripts when opened from disk. From this folder run `npm start` and visit http://localhost:8068.

## Test it

Run `npm test`. It needs Node 18 or newer and no dependencies.

## Add a game

1. Put the game's files in `dist/my-game/index.html`. Keep its source files in `_source/my-game/`.
2. Add a game card to `dist/index.html` by copying one `<section class="chapter ...">` block and changing the name, text and link.
3. Add the game to the footer list in `dist/index.html`.
4. Add a link back to the dashboard in the game page: `<a href="../index.html">`.
5. Add the folder name to the `games` list in `tests/site.test.cjs`.

## Publish

Push to `main`. The workflow in `.github/workflows/deploy.yml` runs the tests and publishes `dist/` to GitHub Pages.
