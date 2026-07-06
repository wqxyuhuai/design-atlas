# Deployment

## Local Build

```bash
npm install
npm run build
npm run preview
```

The production output is `dist`.

## GitHub Pages

For a repository named `design-atlas`, set the Vite base path while building:

```bash
$env:VITE_BASE_PATH="/design-atlas/"
npm run build
```

For a custom domain or root deployment, keep the base path as `/`:

```bash
$env:VITE_BASE_PATH="/"
npm run build
```

The included workflow at `.github/workflows/deploy.yml` builds on pushes to `main` and publishes `dist` to GitHub Pages. Enable Pages in the repository settings and set the source to GitHub Actions.

## Cloudflare Pages

Use these settings:

```text
Build command: npm run build
Output directory: dist
Root directory: /
```

If deploying to a Cloudflare Pages project with a custom domain, keep `VITE_BASE_PATH=/`. If deploying under a subpath, set `VITE_BASE_PATH` to that subpath before build.

## Notes

- `npm run build` runs `tsc -b` first, then `vite build`.
- The app is static and does not require a database, authentication, or server runtime.
- URL query parameters store workbench controls, so shared links preserve tuned effect state.
