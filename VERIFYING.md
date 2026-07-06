# Verifying Effects

Use this checklist before treating an effect as reusable Design Atlas inventory.

## Local Checks

Run the effect-specific check first:

```bash
npm run verify-effect -- backgrounds/beams
```

Then run the project checks:

```bash
npm run lint
npm run build
```

The verify script checks that the category file exists, the effect has a final folder at `src/content/effects/<category>/<slug>/`, that folder contains `meta.ts`, the slug is registered in source, and optional assets live under `public/effects/<category>/<slug>/`.

## Structure Checks

Final effects must follow:

```text
src/content/effects/<category>/<slug>/meta.ts
src/content/effects/<category>/<slug>/index.ts
public/effects/<category>/<slug>/
```

Do not ship final effects from `text-effects`, `image-lists`, `notion-inbox`, or other batch/legacy folders. Legacy URL aliases can stay in code for compatibility, but final source folders must use the normalized category names from `src/data/categories.ts`.

## Browser Checks

Open the workbench route:

```text
/workbench/<category>/<slug>?tab=preview
```

Confirm:

- The preview is not blank at desktop and mobile widths.
- Hover, pointer, or timed motion works without resizing the card or moving surrounding layout.
- Controls update the preview and URL query parameters.
- Color controls open the local color palette and preserve the current dark UI style.
- Copy Prompt returns enough source, style, and implementation context for Codex to rebuild the effect.
- The detail route loads directly from the side list and from cards.

## Reuse Checks

For `implemented` effects, also confirm:

- The reusable component path exists.
- The code tab matches the implementation being previewed.
- Props or controls have clear defaults and stable ranges.
- The component can be imported into another project without page-specific layout assumptions.
- Motion includes a reduced-noise fallback or remains subtle enough for product UI.

## Promotion Rule

Keep an effect as `reference` or `draft` until the browser checks pass. Mark it `implemented` only after the live preview, code snippet, and reusable metadata are accurate.
