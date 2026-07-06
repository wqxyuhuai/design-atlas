# Design Atlas Effect Audit

## Summary

- Total effects: 35
- Excellent: 2
- Good: 33
- Needs Fix: 0
- Incomplete: 0
- Typecheck: Pass (`npm run typecheck`)
- Build: Pass (`npm run build`; Vite still reports a large chunk warning)

Audit scope covered the registered effect registry, Apple design rules in `apple/DESIGN.md`, preview routes, code routes, URL/query behavior, usage snippets, copy actions, prompts, notes, source code, and source/license fields.

Runtime evidence: a headless Chrome pass opened all 35 preview routes and all 35 code routes. Every preview route rendered a preview panel without runtime exceptions. Every code route exposed Usage with your settings, Copy Usage, Source Code, Copy Code, Integration Prompt, Copy Prompt, and Source sections.

## Effect Checklist

| Category | Effect | Preview | Controls | Usage | Source Code | Prompt | Notes | Source | Reusability | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| backgrounds | Beams | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| media | Card Swap | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| media | Curved Scroll Gallery | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Decrypted Text | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Dither | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Dot Field | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| media | Flowing Menu | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| components | Fluid Glass | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Galaxy | Pass | Pass | Pass | Pass | Pass | Pass | Fixed | Good | Fixed |
| interactions | Glare Hover | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| components | Glass Surface | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Gradient Blinds | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| navigation | Gradual Blur | Pass | Pass | Pass | Pass | Pass | Pass | Fixed | Good | Fixed |
| media | Image Trail | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| media | Infinite Canvas | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Letter Glitch | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Light Rays | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Liquid Typography Link | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Excellent | Pass |
| interactions | Magnet Lines | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| media | Orbit Gallery | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Pixel Blast | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Prism | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| backgrounds | Prismatic Burst | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Rotating Text | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| interactions | Shape Blur | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Shiny Text | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Shuffle | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| interactions | Splash Cursor | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| navigation | Staggered Menu | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| components | Strands | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Text Pressure | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Text Reveal | Pass | Pass | Pass | Pass | Pass | Pass | Pass | Excellent | Pass |
| text | Text Type | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | True Focus | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |
| text | Variable Proximity | Pass | Pass | Pass | Fixed | Fixed | Fixed | Fixed | Good | Fixed |

## Per-effect Notes

### Beams

- What works: WebGL beam preview renders, designer controls map to defaults, usage and query state are stable.
- Fixed: Source Code now includes the real adapter plus Beams TSX/CSS, with richer prompt, notes, source, and license warning.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Verify upstream license before using outside inspiration/internal prototypes.

### Card Swap

- What works: Media preview, timing controls, hover pause, Usage, Code, Prompt, and Source routes load correctly.
- Fixed: Added complete codeFiles and reuse documentation.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Extract a standalone CardSwap demo only if this becomes a production component.

### Curved Scroll Gallery

- What works: Embedded gallery preview loads and Code tab is available.
- Fixed: Adapter source, prompt, notes, source, and license text now describe the custom embedded renderer.
- Remaining issues: Implementation lives inside the shared NotionInboxPreview adapter.
- Reusability rating: Good.
- Recommended next step: Split into a standalone component only after confirming the desired gallery API.

### Decrypted Text

- What works: Text reveal preview, trigger controls, usage snippet, and code route all pass.
- Fixed: Added complete component source and fuller reuse prompt/notes/source text.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: License review before public redistribution.

### Dither

- What works: Background preview, color/animation/mouse controls, URL restore, and Usage all pass.
- Fixed: Added actual Dither TSX/CSS files and detailed metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Keep animation intensity conservative on mobile.

### Dot Field

- What works: Cursor-reactive field renders, controls sync, and code route passes.
- Fixed: Added actual DotField TSX/CSS and stronger Prompt/Notes/Source.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Confirm performance on dense mobile layouts before raising dot count.

### Flowing Menu

- What works: Navigation-like media preview and marquee controls load correctly.
- Fixed: Added FlowingMenu TSX/CSS and reuse metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Decide whether this belongs under Media or Navigation in a future taxonomy pass.

### Fluid Glass

- What works: Three.js glass preview renders and mode/material controls load.
- Fixed: Added FluidGlass source and complete reuse documentation.
- Remaining issues: Upstream license is not verified; GLB/material assumptions may need production review.
- Reusability rating: Good.
- Recommended next step: Validate asset requirements before extracting into another app.

### Galaxy

- What works: Standalone Galaxy component has full source, defaults, controls, notes, prompt, and usage.
- Fixed: License note now explicitly says license is not verified and should be treated as inspiration unless confirmed.
- Remaining issues: ReactBits license still needs verification.
- Reusability rating: Good.
- Recommended next step: Keep as reusable with attribution; verify license before broad redistribution.

### Glare Hover

- What works: Hover interaction preview, angle/opacity/duration controls, code and prompt route pass.
- Fixed: Added actual GlareHover TSX/CSS and stronger reuse metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Test keyboard/focus equivalent before production use.

### Glass Surface

- What works: SVG-filter glass preview and controls render correctly.
- Fixed: Added GlassSurface TSX/CSS plus complete source/license notes.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Confirm browser support for SVG filter/backdrop behavior.

### Gradient Blinds

- What works: Shader background preview and controls pass.
- Fixed: Added real GradientBlinds TSX/CSS and complete metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Keep blend/spotlight settings moderate on Apple-style product surfaces.

### Gradual Blur

- What works: Standalone navigation blur component has complete source, usage, controls, prompt, and notes.
- Fixed: License note now explicitly says license is not verified and should be treated as inspiration unless confirmed.
- Remaining issues: ReactBits license still needs verification.
- Reusability rating: Good.
- Recommended next step: Verify license before redistribution; otherwise safe as an internal reusable pattern.

### Image Trail

- What works: Pointer image trail route loads and Copy/Code/Prompt sections pass.
- Fixed: Added ImageTrail TSX/CSS and detailed reuse metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Validate touch fallback for mobile.

### Infinite Canvas

- What works: Custom canvas/gallery preview and code route pass.
- Fixed: Adapter source, prompt, notes, source, and license text now document the embedded renderer.
- Remaining issues: Implementation is still embedded in the shared preview adapter.
- Reusability rating: Good.
- Recommended next step: Extract only if a stable standalone canvas API is needed.

### Letter Glitch

- What works: Character-grid background preview, controls, usage, and prompt route pass.
- Fixed: Added LetterGlitch source and fuller metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Add a reduced-motion switch if used in a production hero.

### Light Rays

- What works: OGL ray shader preview and controls pass.
- Fixed: Added LightRays TSX/CSS and source/license documentation.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Test on low-power devices before increasing ray length or noise.

### Liquid Typography Link

- What works: Standalone component and CSS are complete; prompt, notes, source, and usage are specific enough to reuse directly.
- Fixed: No changes required in this pass.
- Remaining issues: None blocking.
- Reusability rating: Excellent.
- Recommended next step: Keep as the quality bar for future text interaction effects.

### Magnet Lines

- What works: Pointer interaction preview and grid controls pass.
- Fixed: Added MagnetLines TSX/CSS and complete reuse metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Confirm pointer behavior on touch screens.

### Orbit Gallery

- What works: Gallery preview route, controls, usage, and code route pass.
- Fixed: Adapter source and full reuse metadata now explain the embedded implementation.
- Remaining issues: Source/license reference is not verified.
- Reusability rating: Good.
- Recommended next step: Extract only after deciding final image API and layout props.

### Pixel Blast

- What works: Pixel shader background preview and controls pass.
- Fixed: Added PixelBlast TSX/CSS and detailed Prompt/Notes/Source.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Keep density and postprocessing conservative for mobile.

### Prism

- What works: OGL prism preview, animation mode controls, and code route pass.
- Fixed: Added Prism TSX/CSS and full metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Validate WebGL fallback expectations before production use.

### Prismatic Burst

- What works: Radial burst background preview and controls pass.
- Fixed: Added PrismaticBurst TSX/CSS and complete source/license text.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Keep intensity restrained to preserve Apple-style legibility.

### Rotating Text

- What works: Text rotation preview, split/stagger controls, usage, and prompt route pass.
- Fixed: Added RotatingText TSX/CSS and stronger metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Confirm screen-reader text behavior when extracted.

### Shape Blur

- What works: Pointer-reactive shader preview and controls pass.
- Fixed: Added ShapeBlur source and complete metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Validate GPU cost before using as a persistent page layer.

### Shiny Text

- What works: Shimmer text preview, controls, usage, and prompt route pass.
- Fixed: Added ShinyText TSX/CSS and richer metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Respect reduced motion for continuous shimmer.

### Shuffle

- What works: Scramble/shuffle preview and timing controls pass.
- Fixed: Added Shuffle TSX/CSS and complete reuse metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Confirm hover/loop defaults per page context.

### Splash Cursor

- What works: Fluid cursor preview and simulation controls pass.
- Fixed: Added SplashCursor source and complete metadata.
- Remaining issues: Upstream license is not verified; WebGL cost may be high.
- Reusability rating: Good.
- Recommended next step: Use only on focused interaction demos unless performance is profiled.

### Staggered Menu

- What works: Navigation preview route and menu controls pass.
- Fixed: Added StaggeredMenu TSX/CSS and detailed reuse metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Review accessibility and focus trapping before production navigation use.

### Strands

- What works: Strand field preview and visual controls pass.
- Fixed: Added Strands TSX/CSS and complete source/license metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Profile OGL usage before using as a persistent component.

### Text Pressure

- What works: Variable pressure text preview and font-axis controls pass.
- Fixed: Added TextPressure source and full reuse documentation.
- Remaining issues: Upstream license is not verified; font availability should be checked in host apps.
- Reusability rating: Good.
- Recommended next step: Document font fallback if reused outside this project.

### Text Reveal

- What works: Standalone original component has complete source, usage, controls, prompt, notes, and source/license fields.
- Fixed: No changes required in this pass.
- Remaining issues: None blocking.
- Reusability rating: Excellent.
- Recommended next step: Use as the baseline scaffold for future original text effects.

### Text Type

- What works: Typing preview, cursor controls, usage, and prompt route pass.
- Fixed: Added TextType TSX/CSS and complete metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Ensure typing intervals clean up when extracted.

### True Focus

- What works: Focus-box text preview and timing/blur controls pass.
- Fixed: Added TrueFocus TSX/CSS and richer Prompt/Notes/Source.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Confirm keyboard/manual focus behavior before production.

### Variable Proximity

- What works: Pointer proximity text preview and falloff controls pass.
- Fixed: Added VariableProximity TSX/CSS and complete metadata.
- Remaining issues: Upstream license is not verified.
- Reusability rating: Good.
- Recommended next step: Document variable font requirements for host projects.

## High-risk Issues Not Auto-fixed

- Upstream licenses for ReactBits, Tympanus, and portfolio-inspired references were not verified. Entries now say "License not verified. Use as inspiration only" rather than inventing a license.
- The Notion inbox batch still uses a shared `NotionInboxPreview` adapter. Splitting every imported effect into a standalone registry package would be a larger architecture change.
- The production build still emits a large chunk warning because many WebGL, Three.js, OGL, motion, and raw source assets are bundled together. Code-splitting the effect library is a separate performance project.
- Headless route checks confirm renderability and missing-section regressions, but they are not a substitute for human visual review on real mobile/desktop devices.

## How to Add Future Effects

- Add `previewComponent` and verify it renders in `/workbench/<category>/<slug>?tab=preview`.
- Fill `defaultProps` and make sure every visible `controls` key has a matching default.
- Keep `controls` designer-facing: hide adapter keys, callbacks, render props, and implementation internals.
- Add complete `codeFiles` with real TSX/CSS filenames and source, not only a demo wrapper.
- Write a specific `prompt` with goal, scenario, visual behavior, interaction, parameters, stack, usage, source, and license caution.
- Write `notes` covering use cases, visual traits, key parameters, page fit, reuse notes, and performance/interaction cautions.
- Fill `source`, `sourceUrl`, and `licenseNote`; for uncertain third-party references, write "License not verified. Use as inspiration only."
- Add `getUsageSnippet` when the default component import is not enough, especially for backgrounds or adapter-based effects.
- Run `npm run verify-effect -- <category>/<slug>`, then browser-check Preview/Code, then run `npm run typecheck` and `npm run build`.
