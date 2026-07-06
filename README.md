# Design Atlas

Design Atlas is a local design effect library for collecting, inspecting, prompting, and gradually reusing web design effects. It is intentionally simple: effects are local TypeScript records, screenshots live in `public/effects`, and implemented effects can opt into live React previews and reusable code.

## Features

- Data-driven Workbench for browsing effects by category and type.
- URL-synced category and type filters, for example `/?category=backgrounds&type=grid-glow`.
- Detail routes such as `/workbench/backgrounds/grid-glow`.
- Visual-first cards that stay still by default and animate on hover.
- Reference, draft, and implemented effect statuses.
- Structured detail pages with source links, notes, use cases, prompt, reusable info, and parameters.
- Copy flows for Codex prompts and structured reference info.
- Lightweight scripts for scaffolding and verifying new effects.

## Folder Structure

```text
src/
  app/                  Router and app shell
  components/           Shared UI, gallery, layout, sidebar, workbench panels
  content/effects/      Implemented effect components and source notes
  content/inspiration/  Temporary inspiration references
  data/
    categories.ts       Fixed category definitions
    effects.ts          Unified effect registry export
    effects/            Category-specific effect records
  pages/                Route pages
  registry/             Compatibility re-exports for data modules
  types/effect.ts       Effect schema
  utils/                Filtering, copy, prompt, route, and parameter helpers

public/
  effects/              Suggested screenshot location by category
  fonts/
```

## Effect Data Schema

Each effect is a `DesignEffect` record. The core fields are:

```ts
type EffectCategory =
  | "backgrounds"
  | "text"
  | "navigation"
  | "media"
  | "components"
  | "layouts"
  | "interactions"
  | "tools";

type EffectStatus = "reference" | "implemented" | "draft";

type DesignEffect = {
  id?: string;
  slug: string;
  title: string;
  category: EffectCategory;
  type: string;
  status: EffectStatus;
  description: string;
  tags: string[];
  useCases: string[];
  sourceUrl?: string;
  screenshot?: string;
  note?: string;
  prompt: string;
  reusable?: {
    componentName?: string;
    componentPath?: string;
    demoPath?: string;
    codeType?: "react" | "css" | "svg" | "canvas" | "motion";
  };
  parameters?: EffectControl[];
};
```

Implemented effects can also provide `previewComponent`, `defaultProps`, `controls`, `codeFiles`, `notes`, and `source` for the live workbench and code tab.

## Add A New Effect

1. Generate the local scaffold:

```bash
npm run new-effect -- --category backgrounds --slug grid-glow --title "Grid Glow"
```

This creates:

```text
public/effects/backgrounds/grid-glow/
src/content/effects/backgrounds/grid-glow/
```

2. Save screenshots or reference assets under the matching public folder:

```text
public/effects/backgrounds/grid-glow/screenshot.jpg
```

3. Add the generated record to the matching category file, for example `src/data/effects/backgrounds.ts`:

```ts
{
  id: "grid-glow",
  slug: "grid-glow",
  title: "Grid Glow",
  category: "backgrounds",
  type: "Grid Glow",
  status: "reference",
  description: "A dark grid background with subtle glow and ambient depth.",
  tags: ["grid", "dark", "hero", "glow"],
  useCases: ["Hero background", "Section background", "Tech website"],
  sourceUrl: "https://example.com",
  screenshot: "/effects/backgrounds/grid-glow.jpg",
  note: "Good for low-brightness hero sections. Keep the glow restrained.",
  prompt: "Recreate a dark grid glow background with subtle ambient depth..."
}
```

4. The effect appears automatically in its category and type filter.
5. Open `/workbench/backgrounds/grid-glow` to inspect the detail page.
6. Use `Copy Prompt` for Codex or another AI tool.
7. If the effect later becomes reusable, change `status` to `implemented` and add `reusable`, `parameters`, and optional live preview/code fields.
8. Run the verification flow:

```bash
npm run verify-effect -- backgrounds/grid-glow
npm run lint
npm run build
```

See `VERIFYING.md` for the browser checklist.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run new-effect -- --category backgrounds --slug grid-glow --title "Grid Glow"
npm run verify-effect -- backgrounds/grid-glow
```

## Roadmap

- Add more reference records and local screenshots.
- Promote selected references into implemented reusable effects.
- Add lightweight search and tag filters.
- Prepare exportable component snippets for implemented effects.
- Keep the project local-first and open-source friendly before adding any backend.

## License Notice

Design Atlas can keep source links for inspiration, but do not copy third-party website code verbatim. Public versions should use self-made thumbnails, placeholders, or assets with clear reuse rights.
