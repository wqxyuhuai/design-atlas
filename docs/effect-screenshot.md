# Effect Screenshot Reproduction

Use this when an effect needs stable visual comparison. The script starts a clean
headless Chrome/Edge instance through the Chrome DevTools Protocol, waits for the
React/WebGL preview to render, and writes a PNG into `artifacts/`.

## Default Infinite Canvas Capture

```bash
npm run screenshot:effect
```

Default output:

```text
artifacts/effect-screenshots/infinite-canvas.png
```

Default target:

```text
http://127.0.0.1:5173/workbench/media/infinite-canvas?tab=preview&renderer=infinite-canvas&tileCount=24&scale=1
```

The dev server must already be running on `127.0.0.1:5173`.

## Passing Arguments On Windows

Some npm flags can be swallowed by npm on Windows. Prefer either direct Node:

```bash
node scripts/screenshot-effect.mjs --output artifacts/effect-screenshots/infinite-canvas.png --wait 3500
```

Or add an extra `--` before script arguments:

```bash
npm run screenshot:effect -- -- --output artifacts/effect-screenshots/infinite-canvas.png --wait 3500
```

## Useful Variants

Capture the full viewport instead of only the preview stage:

```bash
node scripts/screenshot-effect.mjs --clip none --output artifacts/effect-screenshots/infinite-canvas-full.png
```

Capture another workbench effect:

```bash
node scripts/screenshot-effect.mjs --category media --slug curved-scroll-gallery --output artifacts/effect-screenshots/curved-scroll-gallery.png
```

Capture a custom URL:

```bash
node scripts/screenshot-effect.mjs --url "http://127.0.0.1:5173/workbench/media/infinite-canvas?tab=preview&renderer=infinite-canvas&tileCount=30&scale=1.1" --output artifacts/effect-screenshots/infinite-canvas-scale-1-1.png
```

## Notes

- `artifacts/` is ignored by git.
- Set `CHROME_PATH` if neither Chrome nor Edge is installed in the standard
  Windows locations.
- Use the same viewport, URL, wait time, and clip selector for before/after
  comparisons.
