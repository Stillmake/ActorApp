# ActorTerm Site

Static website for the ActorTerm macOS terminal.

## Local Development

```bash
npm install
npm run dev
```

The generated site is written to `dist/`, previewed at `http://127.0.0.1:8080/` by default.

## Build

```bash
npm run build
```

## Content

- `index.html` — landing page (hero, features, download band)
- `changelog.html` — release notes, driven by `_data/releases.json`
- `about.html` — about page
- `version.json` — published version feed used by the macOS app's update check
- `_data/site.js` — site-wide metadata
- `_sass/` — design system (dark terminal theme)

### Publishing a new app version

Prepend a new object to the `version.json` array when shipping. The app keeps
every entry newer than the running bundle and lists those `notes` in the popup.
The download button always opens the latest GitHub release page.

### Refreshing release notes

```bash
npm run fetch:releases
```

Pulls release data (tag, date, body) from `Stillmake/ActorApp` via the
GitHub CLI and writes it to `_data/releases.json`.
