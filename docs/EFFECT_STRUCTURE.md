# Effect Structure Rules

Design Atlas uses a category-first, one-effect-per-folder structure.

## Required Layout

Every effect must live here:

```text
src/content/effects/<category>/<slug>/
  meta.ts
  index.ts
  Component.tsx              # when implemented
  Component.css              # when needed
  code.ts                    # optional source-code bundle
  prompt.ts or prompt.md     # when not generated from meta
  notes.ts or notes.md       # when not generated from meta
  source.ts or source.md     # when not generated from meta

public/effects/<category>/<slug>/
  screenshot.jpg|webp        # optional but preferred
  poster.webp|demo.mp4       # media/video effects when needed
```

`<category>` must be one of the real app categories:

```text
backgrounds
text
navigation
media
video-browser
components
layouts
interactions
tools
```

Legacy folder names such as `text-effects`, `image-lists`, and batch folders such as `notion-inbox` are not valid final effect locations. They may exist only as temporary import working folders outside the final registry path.

## Registry Rule

`src/data/effects/<category>.ts` is only a category index. It should import effects from `src/content/effects/<category>/<slug>/` and export the category array.

Example:

```ts
import { galaxyEffect } from "../../content/effects/backgrounds/galaxy";
import { beamsEffect } from "../../content/effects/backgrounds/beams";
import type { DesignEffect } from "../../types/effect";

export const backgroundEffects: DesignEffect[] = [galaxyEffect, beamsEffect];
```

Do not put full effect definitions in `src/data/effects/<category>.ts`. Do not create generated mega-files for imported batches.

## Effect Folder Rule

Each effect folder owns its metadata and implementation:

- `meta.ts` exports exactly one `DesignEffect`.
- `index.ts` re-exports that effect from `meta.ts`.
- `meta.ts` must set `slug` to the folder name.
- `meta.ts` must set `category` to the parent category folder.
- `reusable.componentPath`, when present, must point to a file inside the same effect folder or to an explicitly shared adapter under `src/content/effects/_shared/`.

Shared adapters and helper factories belong under:

```text
src/content/effects/_shared/
```

Use `_shared` only for real shared code. Do not use it as a dumping ground for effect-specific implementation files.

## Adding Effects

Use:

```bash
npm run new-effect -- <category> <slug> "Title"
```

Then fill the generated `src/content/effects/<category>/<slug>/meta.ts`, add assets under `public/effects/<category>/<slug>/`, add the effect import to `src/data/effects/<category>.ts`, and run:

```bash
npm run verify-effect -- <category>/<slug>
npm run typecheck
npm run build
```
